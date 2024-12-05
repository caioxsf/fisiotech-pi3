document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('btnBuscar').addEventListener('click', buscar);
    document.getElementById('btnBuscarDatas').addEventListener('click', buscar);


    function buscar() {
        
        let texto = document.getElementById('texto').value;
        let inicio = document.getElementById('inicio').value;
        let fim = document.getElementById('fim').value
        let tipoBusca = "";

        if (document.querySelector("input[name='tipoBusca']:checked"))
            tipoBusca = document.querySelector("input[name='tipoBusca']:checked").value;

        let objetoBusca = {};
        if (texto != "" || inicio != "") {

            if(tipoBusca == 'nome') {
                objetoBusca.texto = texto;
                objetoBusca.tipoBusca = tipoBusca;
            } else if (tipoBusca == 'data') {
                objetoBusca.tipoBusca = tipoBusca;
                objetoBusca.inicio = inicio;
                objetoBusca.fim = fim;
            } 

        } else if (texto === "") {
            objetoBusca.texto = texto;
        } else {
            alert('Escolha o tipo da busca!');
            return;
        }

        fetch('/administrador/relatorio/atestado/lista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objetoBusca),
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.atestados.length > 0) {
                    let html = "";

                    for (let c of r.atestados) {
                        html += `
                                <tr>
                                    <td data-label="Nome médico"> ${c.nome_medico} </td>
                                    <td data-label="Esp. médica"> ${c.especialidade_medica} </td>
                                    <td data-label="Dt. Inicio"> ${new Date(c.data_inicio).toLocaleDateString('pt-BR')} </td>
                                    <td data-label="Dt. Term."> ${new Date(c.data_termino).toLocaleDateString('pt-BR') }</td>
                                    <td style="text-align: center;">
                                        <a href=" ${c.foto_atestado} " download='Atestado' style="margin-right: 15px;"><i class="fas fa-file-download fa-lg "style="font-size: 25px;" ></i></a>
                                        <img src="${c.foto_atestado}" alt="Foto Atestado" width="100">

                                        <button type="button" class="btn-excluir" data-id=" ${c.id} " data-nome=" ${c.nome_medico} " style="border: none; background-color: transparent; margin-left: 10px; ">
                                            <i class="fas fa-trash" style="color: #d72323;"></i>
                                        </button>
                                        <a href="/administrador/relatorio/atestado/editar/${c.id}"><i class="fas fa-edit" style="color: #74C0FC;"></i></a>
                                    </td>
                                </tr>
                        `;
                    }

                    document.querySelector('#tabela > tbody').innerHTML = html;

                    ativarEventosDialog();
                } else {
                    alert('Esse atestado não existe!');
                    window.location.href = '/administrador/relatorio/atestado'
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    function ativarEventosDialog() {
        let btnExcluir = document.querySelectorAll('.btn-excluir');
        for (let btn of btnExcluir) {
            btn.addEventListener('click', excluir);
        }
    }

    function excluir () {
        
        let id = this.dataset.id;
        let nome = this.dataset.nome;

        if(confirm(`Tem certeza que deseja excluir o atestado de ${nome}?`)) {
            let that = this;
            if(id) {
                fetch(`/administrador/relatorio/atestado/excluir/${id}`)
                .then(response => {
                    return response.json();
                })
                .then(body => {
                    alert(body.msg);
                    if(body.ok) {
                        that.parentElement.parentElement.remove();
                    }
                })
                .catch (e => {
                    console.error(e);
                })
            }
            else {
                alert('id nao encontrado');
            }
        }
    }
});
