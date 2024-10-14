document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('.btn-add');
    btn.addEventListener('click', cadastrarConta)
    


    function cadastrarConta () {
        // debugger
       let usuario = document.getElementById('usuario');
       let senha = document.getElementById('senha');
        
        if (usuario && senha) {
            let obj = {
              usuario: usuario.value,
              senha: senha.value
            };
        
            let stringObj = JSON.stringify(obj);

            fetch('/login/registro', {
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
            
        }
    }
})