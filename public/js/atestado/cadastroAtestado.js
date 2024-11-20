document.addEventListener('DOMContentLoaded', function () {

    let btn = document.getElementById('btn-atestado');
    btn.addEventListener('click', cadastrar); 


    function cadastrar () {
        
        let nomeMedico = document.getElementById('nomeMedico');
        let selEspecialidade = document.getElementById('selEspecialidade');
        let dataInicio = document.getElementById('dataInicio');
        let dataTermino = document.getElementById('dataTermino');
        let fotoAtestado = document.getElementById('fotoAtestado').files[0];

        if (nomeMedico.value != "" && selEspecialidade.value != '0' && fotoAtestado != null) {

            var data = new FormData();
            data.append('nome', nomeMedico.value);
            data.append('especialidade', selEspecialidade.value);
            data.append('dataI', dataInicio.value);
            data.append('dataT', dataTermino.value);
            data.append('imagem', fotoAtestado);

            fetch('administrador/atestado', {
                method: 'POST',
                body: data
            })
            .then(r => {
                return r.json();
            })
            .then(r => {
                if(r.ok) {
                    alert(r.msg);
                }
                else {
                    alert(r.msg);
                }
            })
            .catch (e =>{
                console.log(e);
            }) 
        }
    }

})