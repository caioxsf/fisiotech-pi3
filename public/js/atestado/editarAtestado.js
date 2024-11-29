document.addEventListener('DOMContentLoaded', function () {

    let btn = document.getElementById('btn-atestado');
    btn.addEventListener('click', atualizar); 


    function atualizar () {
       
        let id = document.getElementById('id');
        let nomeMedico = document.getElementById('nomeMedico');
        let selEspecialidade = document.getElementById('selEspecialidade');
        let dataInicio = document.getElementById('dataInicio');
        let dataTermino = document.getElementById('dataTermino');
        let fotoAtestado = document.getElementById('fotoAtestado').files[0];

        if (nomeMedico.value != "" && selEspecialidade.value != '0') {

            var data = new FormData();
            data.append('id', id.value);
            data.append('nome', nomeMedico.value);
            data.append('especialidade', selEspecialidade.value);
            data.append('dataI', dataInicio.value);
            data.append('dataT', dataTermino.value);
            data.append('imagem', fotoAtestado);

            fetch(`/administrador/relatorio/atestado/editar/`, {
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
            .catch(error => {
                console.error("Erro na operação:", error);
                
            });
        }
    }

})