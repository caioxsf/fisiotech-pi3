
document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelectorAll('.btn-addConta');
    for(let btns of btn) {
        btns.addEventListener('click', atualizarAdm)
    }
    
    function atualizarAdm () {
        
        let id = document.getElementById('id');
        let usuario = document.getElementById('usuario');
        let senha = document.getElementById('senha');
        let perfil = document.getElementById('perfil');
        
        if (usuario && senha) {
            let obj = {
                id: id.value,
                usuario: usuario.value,
                senha: senha.value,
                perfil: perfil.value
            };
        
            let stringObj = JSON.stringify(obj);

            fetch(`/administrador/relatorio/usuarios/editar`, {
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
                    window.location.href = '/administrador/relatorio/usuarios';
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