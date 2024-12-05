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
            window.location.href = '/consulta/lista'
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

                        const datadata = new Date(c.data); 
                        const dia = String(datadata.getDate()).padStart(2, '0'); 
                        const mes = String(datadata.getMonth() + 1).padStart(2, '0');
                        const ano = datadata.getFullYear();
                        c.data = `${dia}/${mes}/${ano}`;

                        html += `
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                  <h5 class="card-title"> ${c.nome_id} </h5>
                                  <p class="card-text"> ${c.data},  ${c.hora} </p>
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

                            <table id="tabela" hidden>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Data</th>
                                        <th>Horario</th>
                                        <th>Telefone</th>
                                        <th>Email</th>
                                        <th>Serviço</th>
                                        <th>Observação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        <tr>
                                            <td> ${c.nome_id} </td>
                                            <td> ${c.data} </td>
                                            <td> ${c.hora} </td>
                                            <td> ${c.telefone} </td>
                                            <td> ${c.email} </td>
                                            <td> ${c.servico_id} </td>
                                            <td> ${c.obs} </td>
                                        </tr>
                                    
                                    
                                </tbody>
                            </table>
                        `;
                    }

                    document.querySelector('.container-lista').innerHTML = html;

                    // Ativar eventos nos botões dinâmicos
                    ativarEventosDialog();
                } else {
                    alert('Essa consulta não existe!');
                    window.location.href = '/consulta/lista'
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
