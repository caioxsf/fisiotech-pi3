

function validarSenha(senha) {
    const regex = /^(?=.*[a-zA-Z]{5,})(?=.*\d)(?=.*[!@#%&*.]).{7,}$/;
    return regex.test(senha);
}


document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('.btn-add');
    btn.addEventListener('click', cadastrarConta)
    
    function cadastrarConta () {
        
       let usuario = document.getElementById('usuario');
       let senha = document.getElementById('senha');

       let op = validarSenha(senha.value);

       document.getElementById('msgErro').innerHTML = '';
       document.getElementById('msgUser').innerHTML = '';

       if(senha.value == '' || usuario.value == '') {
            document.getElementById('msgErro').innerHTML = 'Digite um usuario ou senha!';
            document.getElementById('msgUser').innerHTML = '';
            return false;
       }

       if(op == false && usuario.value) {
            document.getElementById('msgErro').innerHTML = 'A senha precisa ter pele menos 7 digitos, 1 caracter especial e um número!';
            document.getElementById('msgUser').innerHTML = '';
            return false;
       }
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
                    window.location.href = '/login'
                }
                else {
                    document.getElementById('msgUser').innerHTML = resposta.msg;
                    document.getElementById('msgErro').innerHTML = '';
                }
            })
            .catch (function(e) {
                console.error('erro no fatch' + e);
            })
       }
        
        
    }
})