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
                
            } else if (tipoBusca == 'hora') {
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

        fetch('/administrador/relatorio/ponto/lista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objetoBusca),
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.ponto.length > 0) {
                    let html = "";

                    for (let p of r.ponto) {

                        html += `
                            <tr>
                                <td> ${p.nome_profissional} </td>
                                <td> ${p.hora_entrada} </td>
                                <td> ${p.hora_saida} </td>
                                <td> ${new Date(p.data).toLocaleDateString('pt-BR')} </td>
                            </tr>
                        `;
                    }

                    document.querySelector('#tabela > tbody').innerHTML = html;

                } else {
                    alert('O registro desse ponto não existe!');
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

});
