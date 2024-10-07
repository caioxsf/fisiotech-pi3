document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelectorAll('.btn-add');
    for(let i=0;i<btn.length;i++) {
        if(btn[i].dataset.alteracao == 'true')
            btn[i].addEventListener('click', atualizarPaciente);
        else
            btn[i].addEventListener('click', cadastrarPaciente);
    }
    
    
    function cadastrarPaciente () {
        // debugger
        let nome = document.getElementById('nome');
        let telefone = document.getElementById('telefone');
        let email = document.getElementById('email');
        let nascimento = document.getElementById('nascimento');
        let cpf = document.getElementById('cpf');
        let endereco = document.getElementById('endereco');
        let bairro = document.getElementById('bairro');
        let sexo = document.getElementById('sexo');
        let cidade = document.getElementById('cidade');
        let estado = document.getElementById('estado');
        let cep = document.getElementById('cep');
        
        if (nome && telefone && email && nascimento && cpf && endereco && bairro && sexo && cidade && estado && cep) {
            let obj = {
                nome: nome.value,
                telefone: telefone.value,
                email: email.value,
                nascimento: nascimento.value,
                cpf: cpf.value,
                endereco: endereco.value,
                bairro: bairro.value,
                sexo: sexo.value,
                cidade: cidade.value,
                estado: estado.value,
                cep: cep.value
            };
        
            let stringObj = JSON.stringify(obj);

            fetch('/paciente', {
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
                console.error('erro no fatch' + e);
            })
            // location.reload();
        }
    }

    function atualizarPaciente () {
        
        let id = document.getElementById('id');
        let nome = document.getElementById('nome');
        let telefone = document.getElementById('telefone');
        let email = document.getElementById('email');
        let nascimento = document.getElementById('nascimento');
        let cpf = document.getElementById('cpf');
        let endereco = document.getElementById('endereco');
        let bairro = document.getElementById('bairro');
        let sexo = document.getElementById('sexo');
        let cidade = document.getElementById('cidade');
        let estado = document.getElementById('estado');
        let cep = document.getElementById('cep');
        
        if (nome && telefone && email && nascimento && cpf && endereco && bairro && sexo && cidade && estado && cep) {
            let obj = {
                id: id.value,
                nome: nome.value,
                telefone: telefone.value,
                email: email.value,
                nascimento: nascimento.value,
                cpf: cpf.value,
                endereco: endereco.value,
                bairro: bairro.value,
                sexo: sexo.value,
                cidade: cidade.value,
                estado: estado.value,
                cep: cep.value
            }
        
            let stringObj = JSON.stringify(obj);

            fetch('/paciente/editar', {
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
                console.error('erro no fatch' + e);
            })
            // location.reload();
        }
    }
    

});