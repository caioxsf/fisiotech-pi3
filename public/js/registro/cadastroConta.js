

function validarSenha (senha) {

    let arraySenha = senha.split('');
    let alfabeto = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    let numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let caracterEspecial = ['!', '@', '#', '%', '&', '*'];

    let alfabetoCount = 0;
    let numerosCount = 0
    let caracterEspecialCount = 0;
    
    for(let i=0;i<senha.length;i++) {
        
        for(let alfa=0;alfa<alfabeto.length;alfa++) {
            if(arraySenha[i] == alfabeto[alfa]) {
                alfabetoCount++;
            }
        }

        for(let num=0;num<numeros.length;i++) {
            if(arraySenha[i] == numeros[num]) {
                numerosCount++;
            }
        }

        for(let caract=0;caract<caracterEspecial.length;i++) {
            if(arraySenha[i] == caracterEspecial[caract]) {
                caracterEspecialCount++;
            }
        }
        
    }

    if(alfabetoCount >= 5 && numerosCount >= 1 && caracterEspecial >= 1) {
        return true;
    }

    return false;

}


document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('.btn-add');
    btn.addEventListener('click', cadastrarConta)
    
    function cadastrarConta () {
        
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