const cep = document.querySelector('#cep');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');

cep.addEventListener('focusout', async () => {

    try {
        const somenteNumeros = /^[0-9]+$/;
        const cepValido = /^[0-9]{8}$/;

        if (!somenteNumeros.test(cep.value) || !cepValido.test(cep.value)) {
            throw new Error('CEP inválido. Digite somente 8 números!.');
        }

        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

        const responseCep = await response.json();
        if (responseCep.erro) {
            throw new Error('CEP não encontrado.');
        }

        if (responseCep.uf == 'AC')
            responseCep.uf = 1;
        if (responseCep.uf == 'AL')
            responseCep.uf = 2;
        if (responseCep.uf == 'AP')
            responseCep.uf = 3;
        if (responseCep.uf == 'AM')
            responseCep.uf = 4;
        if (responseCep.uf == 'BA')
            responseCep.uf = 5;
        if (responseCep.uf == 'CE')
            responseCep.uf = 6;
        if (responseCep.uf == 'DF')
            responseCep.uf = 7;
        if (responseCep.uf == 'ES')
            responseCep.uf = 8;
        if (responseCep.uf == 'GO')
            responseCep.uf = 9;
        if (responseCep.uf == 'MA')
            responseCep.uf = 10;
        if (responseCep.uf == 'MT')
            responseCep.uf = 11;
        if (responseCep.uf == 'MS')
            responseCep.uf = 12;
        if (responseCep.uf == 'MG')
            responseCep.uf = 13;
        if (responseCep.uf == 'PA')
            responseCep.uf = 14;
        if (responseCep.uf == 'PB')
            responseCep.uf = 15;
        if (responseCep.uf == 'PE')
            responseCep.uf = 16;
        if (responseCep.uf == 'PI')
            responseCep.uf = 17;
        if (responseCep.uf == 'PR')
            responseCep.uf = 18;
        if (responseCep.uf == 'RJ')
            responseCep.uf = 19;
        if (responseCep.uf == 'RN')
            responseCep.uf = 20;
        if (responseCep.uf == 'RS')
            responseCep.uf = 21;
        if (responseCep.uf == 'RO')
            responseCep.uf = 22;
        if (responseCep.uf == 'RR')
            responseCep.uf = 23;
        if (responseCep.uf == 'SC')
            responseCep.uf = 24;
        if (responseCep.uf == 'SP')
            responseCep.uf = 25;
        if (responseCep.uf == 'SE')
            responseCep.uf = 26;
        if (responseCep.uf == 'TO')
            responseCep.uf = 27;

        

        endereco.value = responseCep.logradouro || '';
        bairro.value = responseCep.bairro || '';
        cidade.value = responseCep.localidade || '';
        estado.value = responseCep.uf || '';



    } catch (error) {
        console.error('Erro:', error.message || error);
        alert(error.message || 'Ocorreu um erro ao buscar o CEP.');
    }



});
