document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('.btn-add');
    btn.addEventListener('click', cadastrarServico)
    


    function cadastrarServico () {
        // debugger
      
       let servico = document.getElementById('servico');
        
        if (servico) {
            let obj = {
              servico: servico.value
            };
        
            let stringObj = JSON.stringify(obj);

            fetch('/administrador/servicos', {
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
                    window.location.href = '/administrador/servicos'
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