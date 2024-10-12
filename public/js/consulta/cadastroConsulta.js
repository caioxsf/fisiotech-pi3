
document.addEventListener('DOMContentLoaded', function(){

    let btn = document.querySelectorAll('.btn-add');
    
    for(let i=0;i<btn.length;i++) {
        if(btn[i].dataset.alteracao == 'true')
            btn[i].addEventListener('click', atualizarConsulta);
        else
            btn[i].addEventListener('click', cadastrarConsulta);
    }

    function cadastrarConsulta () {
        
        let nome = document.getElementById('nomepacientes');

        let telefone = document.getElementById('telefone');
        let email = document.getElementById('email');
        let servico = document.getElementById('servico');
        let data = document.getElementById('data');
        let hora = document.getElementById('hora');
        let obs = document.getElementById('obs');

        if(nome && telefone && email && servico && data && hora && obs) {
            let obj = {
                nome: nome.value,
                telefone: telefone.value,
                email: email.value,
                servico: servico.value,
                data: data.value,
                hora: hora.value,
                obs: obs.value
            }

            let stringObj = JSON.stringify(obj);

            fetch('/consulta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: stringObj
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(resposta) {
                if(resposta.ok) {
                    alert(resposta.msg);
                    

                }
                else {
                    alert(resposta.msg);
                }
            })
            .catch (function(e) {
                console.error('erro no fatch: ' + e);
            })
        }
    }

    function atualizarConsulta () {
        
        let id = document.getElementById('id');
        let nome = document.getElementById('nome');
        let telefone = document.getElementById('telefone');
        let email = document.getElementById('email');
        let servico = document.getElementById('servico');
        let data = document.getElementById('data');
        let hora = document.getElementById('hora');
        let obs = document.getElementById('obs');

        if(nome && telefone && email && servico && data && hora && obs) {
            let obj = {
                id: id.value,
                nome: nome.value,
                telefone: telefone.value,
                email: email.value,
                servico: servico.value,
                data: data.value,
                hora: hora.value,
                obs: obs.value
            }

            let stringObj = JSON.stringify(obj);

            fetch('/consulta/editar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: stringObj
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(resposta) {
                if(resposta.ok) {
                    alert(resposta.msg);
                
                }
                else {
                    alert(resposta.msg);
                }
            })
            .catch (function(e) {
                console.error('erro no fatch: ' + e);
            })
            
        }
    }

});