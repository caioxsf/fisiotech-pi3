document.addEventListener('DOMContentLoaded', function () {

   
    function adicionarListenersExclusao() {
        let btnExcluir = document.querySelectorAll('.btn-excluirConta');
        for (let btn of btnExcluir) {
            btn.addEventListener('click', excluir);
        }
    }

    
    function excluir() {
        let id = this.dataset.id;
        let nome = this.dataset.nome;

        if (confirm(`Tem certeza que deseja apagar a conta de ${nome}?`)) {
            let that = this;
            if (id) {
                fetch(`/administrador/relatorio/usuarios/excluir/${id}`)
                    .then(response => response.json())
                    .then(body => {
                        alert(body.msg);
                        if (body.ok) {
                            
                            that.parentElement.parentElement.remove();
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            } else {
                alert('ID não encontrado');
            }
        }
    }

   
    function buscar() {
        let texto = document.getElementById('texto').value;
        let tipoBusca = "";

        if (document.querySelector("input[name='tipoBusca']:checked")) {
            tipoBusca = document.querySelector("input[name='tipoBusca']:checked").value;
        }

        let objetoBusca = {};
        if (texto !== "" && (tipoBusca === 'user' || tipoBusca === 'perfilUser')) {
            objetoBusca.texto = texto;
            objetoBusca.tipoBusca = tipoBusca;

        } else if (texto === "") {
            objetoBusca.texto = texto;

        } else {
            alert('Escolha o tipo da busca!');
            return;
        }

        fetch('/administrador/relatorio/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objetoBusca),
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.user && r.user.length > 0) {
                    let html = "";

                    for (let u of r.user) {
                        let acoes = "";

                        if (u.perfil_id !== 'Sistema') {
                            acoes = `
                                <td data-label="Ações" class="tbodyusuarios" style="text-align: end;">
                                    <a href="/administrador/relatorio/usuarios/editar/${u.id}" class="btn-editar" style="border: none; background-color: transparent;">
                                        <i class="fas fa-edit" style="color: #74C0FC;"></i>
                                    </a>
                                    <button type="button" class="btn-excluirConta" data-id="${u.id}" data-nome="${u.login}" style="border: none; background-color: transparent;">
                                        <i class="fas fa-trash" style="color: #d72323;"></i>
                                    </button>
                                </td>`;
                        }

                        html += `
                            <tr>
                                <td data-label="Usuário" class="tbodyusuarios">${u.login}</td>
                                <td data-label="Perfil" class="tbodyusuarios">${u.perfil_id}</td>
                                ${acoes}
                            </tr>
                            `;
                            
                    }

                    document.querySelector('#tabelausers > tbody').innerHTML = html;

                    
                    adicionarListenersExclusao();
                } else {
                    alert('Nenhum usuário encontrado!');
                }
            })
            .catch((e) => {
                console.error('Erro na busca:', e);
                alert('Ocorreu um erro ao buscar os dados.');
            });
    }

    
    document.getElementById('btnBuscar').addEventListener('click', buscar);

    
    adicionarListenersExclusao();
});
