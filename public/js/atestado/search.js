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
                        <table class="table table-hover table-responsive">
                <thead>
                    <tr>
                        <th>Nome médico</th>
                        <th>Especialidade médica</th>
                        <th>Data início do afastamento</th>
                        <th>Data término do afastamento</th>
                        <th style="text-align: center;">Foto atestado</th>
                    </tr>
                </thead>
                <tbody>
                    
                        <tr>
                            <td> ${c.nome_medico} </td>
                            <td> ${c.especialidade_medica} </td>
                            <td> ${new Date(c.data_inicio).toLocaleDateString('pt-BR')} </td>
                            <td> ${new Date(c.data_termino).toLocaleDateString('pt-BR') }</td>
                            <td style="text-align: center;">
                                <a href=" ${c.foto_atestado} " download='Atestado' style="margin-right: 15px;"><i class="fas fa-file-download fa-lg "style="font-size: 25px;" ></i></a>
                                <img src=" ${c.foto_atestado} " alt="Foto Atestado" width="100">

                                <button type="button" class="btn-excluir" data-id=" ${c.id} " data-nome=" ${c.nome_medico} " style="border: none; background-color: transparent; margin-left: 10px; ">
                                    <i class="fas fa-trash" style="color: #d72323;"></i>
                                  </button>
                            </td>
                        </tr>
                   
                   
                </tbody>
            </table>
                        `;
                    }

                    document.querySelector('.table').innerHTML = html;

                    ativarEventosDialog();
                } else {
                    alert('Esse atestado não existe!');
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
