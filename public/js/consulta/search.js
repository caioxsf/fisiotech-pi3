document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnBuscar').addEventListener('click', buscar);

    function buscar() {
        let texto = document.getElementById('texto').value;
        let tipoBusca = "";

        if (document.querySelector("input[name='tipoBusca']:checked"))
            tipoBusca = document.querySelector("input[name='tipoBusca']:checked").value;

        let objetoBusca = {};
        if (texto != "" && (tipoBusca === 'nome' || tipoBusca === 'data')) {
            objetoBusca.texto = texto;
            objetoBusca.tipoBusca = tipoBusca;
        } else if (texto === "") {
            objetoBusca.texto = texto;
        } else {
            alert('Escolha o tipo da busca!');
            return;
        }

        fetch('/consulta/lista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objetoBusca),
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.consultas.length > 0) {
                    let html = "";

                    for (let c of r.consultas) {
                        html += `
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                  <h5 class="card-title"> ${c.nome_id} </h5>
                                  <p class="card-text"> ${c.data} ,  ${c.hora} </p>
                                </div>
                                <ul class="list-group list-group-flush">
                                  <li class="list-group-item"><i class="fa fa-phone" aria-hidden="true"></i>  ${c.telefone} </li>
                                  <li class="list-group-item"><i class="fa fa-envelope" aria-hidden="true"></i>  ${c.email} </li>
                                  <li class="list-group-item"><i class="fa fa-briefcase" aria-hidden="true"></i>  ${c.servico_id} </li>
                                  <li class="list-group-item"><i class="fa fa-search-minus" aria-hidden="true"></i>  ${c.obs} </li>
                                </ul>
                                <div class="card-body">
                                  <a href="/consulta/editar/ ${c.id} " class="card-link" style="background-color: transparent; border: none;"><i class="fas fa-edit" style="color: #74C0FC;"></i></a>
                                  <button type="button" class="btn-excluir" style="background-color: transparent; border: none; position: absolute; right: 10px;" data-id="${c.id}" data-nome="${c.nome_id}"><i class="fa-solid fa-trash" style="color: #f50a0a;"></i></button>
                                </div>
                            </div>
                        `;
                    }

                    document.querySelector('.container-lista').innerHTML = html;

                    // Ativar eventos nos botões dinâmicos
                    ativarEventosDialog();
                } else {
                    alert('Essa consulta não existe!');
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

        if(confirm(`Tem certeza que deseja excluir a consulta de ${nome}?`)) {
            let that = this;
            if(id) {
                fetch(`excluir/${id}`)
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
