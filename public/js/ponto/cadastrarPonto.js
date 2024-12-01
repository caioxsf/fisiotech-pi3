document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('btn-ponto').addEventListener('click', cadastrar);

    function cadastrar () {
        
        let nome = document.getElementById('nome');
        let horaEntrada = document.getElementById('horaEntrada');
        let horaSaida = document.getElementById('horaSaida');
        let id = document.getElementById('id');

        if(nome && horaEntrada && horaSaida) {

            let obj = {
                nome: nome.value,
                horaEntrada: horaEntrada.value,
                horaSaida: horaSaida.value,
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