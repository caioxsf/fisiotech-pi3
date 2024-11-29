document.addEventListener('DOMContentLoaded', function () {
    const buscarNome = document.getElementById('nomeMedico');
    const buscarData = document.getElementById('dataInicio');
    
    const inputBusca = document.getElementById('inputBusca');
    const intervaloData = document.getElementById('intervaloData');

    buscarNome.addEventListener('change', () => {
        if (buscarNome.checked) {
            inputBusca.style.display = 'flex';
            intervaloData.style.display = 'none';
        }
    });

    buscarData.addEventListener('change', () => {
        if (buscarData.checked) {
            inputBusca.style.display = 'none';
            intervaloData.style.display = 'flex';
        }
    });
});


