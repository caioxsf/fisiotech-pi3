function validarDataInicio30DiasAntes(event) {
   
    const dataAtual = new Date(); 
    const anoAtual = dataAtual.getFullYear(); 
    const dataInicio = new Date(event.target.value); 


    if (isNaN(dataInicio)) {
        alert("Data inválida. Por favor, insira uma data válida.");
        event.target.value = ""; 
        return;
    }

   
    if (dataInicio.getFullYear() !== anoAtual) {
        alert(`A data deve estar no ano de ${anoAtual}.`);
        event.target.value = ""; 
        return;
    }

 
    const dataLimite = new Date();
    dataLimite.setDate(dataAtual.getDate() - 30);

  
    if (dataInicio < dataLimite || dataInicio > dataAtual) {
        alert("A data deve estar dentro dos últimos 30 dias.");
        event.target.value = ""; 
        return;
    }
}

function validarDataFim(event) {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = event.target.value;

    if (!dataInicio || !dataFim) {
        return; 
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    const anoAtual = new Date().getFullYear();
    const anoFim = fim.getFullYear();
    const mesFim = fim.getMonth();
    const diaFim = fim.getDate();

    const diaInicio = inicio.getDate();
    const mesInicio = inicio.getMonth();

   
    if (anoFim < anoAtual || (anoFim === anoAtual && mesFim < mesInicio) || (anoFim === anoAtual && mesFim === mesInicio && diaFim < diaInicio)) {
        alert('A data de termino deve ser maior ou igual à data de início.');
        event.target.value = ""; 
        return;
    }


    if (anoFim > anoAtual + 1) {
        alert('A data de termino não pode ser superior ao próximo ano.');
        event.target.value = ""; 
        return;
    }
}
