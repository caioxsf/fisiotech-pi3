document.addEventListener('DOMContentLoaded', function() {


    document.getElementById('btn-ponto').addEventListener('click', cadastrar);

    function cadastrar () {
        
        let nome = document.getElementById('nome');
        let horaEntrada = document.getElementById('horaEntrada');
        let horaSaida = document.getElementById('horaSaida');
        let saidaAlmoco = document.getElementById('saidaAlmoco');
        let retornoAlmoco = document.getElementById('retornoAlmoco');
        let id = document.getElementById('id');


        if(nome && horaEntrada && horaSaida) {

            let obj = {
                nome: nome.value,
                horaEntrada: horaEntrada.value,
                horaSaida: horaSaida.value,
                saidaAlmoco: saidaAlmoco.value,
                retornoAlmoco: retornoAlmoco.value,
                id: id.value
            }

            let stringfyObj = JSON.stringify(obj);

            fetch('/administrador/ponto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: stringfyObj
            })
            .then (r => {
                return r.json();
            })
            .then(r => {
                if(r.ok){
                    alert(r.msg)
                    window.location.href = '/administrador/ponto';
                }
                else{
                    alert(r.msg)
                }
            })
            .catch (e =>{
                console.error(e);
            }) 
        }
    }

})