document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('.btn-addEditar');
    btn.addEventListener('click', editarServico)
    


    function editarServico () {
        // debugger
      
        let id = document.getElementById('id');
       let servico = document.getElementById('servico');
       let desc = document.getElementById('desc');
        
        if (servico) {
            let obj = {
                id: id.value,
                servico: servico.value,
                desc: desc.value
            };
        
            let stringObj = JSON.stringify(obj);

            fetch('/administrador/servicos/editar', {
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