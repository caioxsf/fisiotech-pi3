// Os comentários estão sendo referidos as validações do consulta.html. Foram usadas as mesmas funções para o paciente.html e index.html(contato).

// validarNomes() usado para fazer a verificação do campo Nome completo, Cidade e Bairro.
function validarNomes ()
{
    var nome = event.target.value;
    var arr = nome.split(" ");

    if(arr[1])
    {
        event.target.style.border= "1px solid green";

        return true;
    }
    else
    {
        event.target.style.border = "1px solid red";
        event.target.setAttribute('placeholder', 'Digite o campo corretamente!');
        event.target.value = "";
    }   
}

function validarBairro ()
{
    var nome = event.target.value;
    var arr = nome.split(" ");

    if(arr)
    {
        event.target.style.border= "1px solid green";

        return true;
    }
    else
    {
        event.target.style.border = "1px solid red";
        event.target.setAttribute('placeholder', 'Digite o campo corretamente!');
        event.target.value = "";
    }   
}


// mascara() usado para fazer a verificação do campo Telefone, CPF e CEP.
function mascara(m,t,e){
    var cursor = t.selectionStart;
    var texto = t.value;
    texto = texto.replace(/\D/g,'');
    var l = texto.length;
    var lm = m.length;
    if(window.event) {                  
       id = e.keyCode;
    } else if(e.which){                 
       id = e.which;
    }
    cursorfixo=false;
    if(cursor < l)cursorfixo=true;
    var livre = false;
    if(id == 16 || id == 19 || (id >= 33 && id <= 40))livre = true;
    ii=0;
    mm=0;
    if(!livre){
       if(id!=8){
          t.value="";
          j=0;
          for(i=0;i<lm;i++){
             if(m.substr(i,1)=="#"){
                t.value+=texto.substr(j,1);
                j++;
             }else if(m.substr(i,1)!="#"){
                      t.value+=m.substr(i,1);
                    }
                    if(id!=8 && !cursorfixo)cursor++;
                    if((j)==l+1)
                        break;    
          } 	
       }
    }
    if(cursorfixo && !livre)cursor--;
      t.setSelectionRange(cursor, cursor);

    var l = texto.length;
    if (j > l)
    {
        event.target.style.border = "1px solid red";
        event.target.setAttribute('placeholder', 'Digite o campo corretamente!');
        event.target.value = "";
    }
    else
    {
        t.style.border = "1px solid green";
    }
  }

  function validaCPFVerdadeiro(event) {
    
    let cpf = event.target.value;
    let op = false;

    var Soma = 0;
    var Resto;

    // Remover caracteres não numéricos
    var strCPF = String(cpf).replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (strCPF.length !== 11) {
        event.target.style.border = "1px solid red";
        event.target.setAttribute('placeholder', 'Digite um CPF verdadeiro!');
        alert('Digite um CPF verdadeiro!');
        event.target.value = "";
        return false;
    }

    // Verificar se o CPF é uma sequência de números repetidos
    if (['00000000000', '11111111111', '22222222222', '33333333333', '44444444444',
        '55555555555', '66666666666', '77777777777', '88888888888', '99999999999']
        .indexOf(strCPF) !== -1) {
        event.target.style.border = "1px solid red";
        event.target.setAttribute('placeholder', 'Digite um CPF verdadeiro!');
        alert('Digite um CPF verdadeiro!');
        event.target.value = "";
        return false;
    }

    // Cálculo do primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        Soma += parseInt(strCPF.charAt(i)) * (10 - i);
    }

    Resto = (Soma * 10) % 11;
    if (Resto === 10 || Resto === 11) {
        Resto = 0;
    }

    if (Resto !== parseInt(strCPF.charAt(9))) {
        event.target.style.border = "1px solid red";
        event.target.setAttribute('placeholder', 'Digite um CPF verdadeiro!');
        alert('Digite um CPF verdadeiro!');
        event.target.value = "";
        return false;
    }

    // Cálculo do segundo dígito verificador
    Soma = 0;
    for (let i = 0; i < 10; i++) {
        Soma += parseInt(strCPF.charAt(i)) * (11 - i);
    }

    Resto = (Soma * 10) % 11;
    if (Resto === 10 || Resto === 11) {
        Resto = 0;
    }

    if (Resto !== parseInt(strCPF.charAt(10))) {
        event.target.style.border = "1px solid red";
        event.target.setAttribute('placeholder', 'Digite um CPF verdadeiro!');
        alert('Digite um CPF verdadeiro!');
        event.target.value = "";
        return false;
    }

    // Se passar por todas as validações
    event.target.style.border = "1px solid green";
    return true;
}


// validarEmail() usado para fazer a verificação do campo Email.
function validarEmail ()
{
    var email = event.target.value;
    var regEx = new RegExp(/^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/); 

    var validacaoEmail = regEx.test(email);

    if(validacaoEmail)
        event.target.style.border= "1px solid green";
    else
    {
        event.target.style.border = "1px solid red";
        event.target.setAttribute('placeholder', 'Digite o campo corretamente!');
        event.target.value = "";
    }   
}

// validarData() usado para fazer a verificação do campo Data de nascimento.
function validarData ()
{
    var data = event.target.value;
    var arr = data.split("-");
    var op=true;

    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth();
    var ano = dataAtual.getFullYear();
    var anoAntigo = ano - 105;

    if(arr[0] == '')
    {
        event.target.style.border = "1px solid red";
        op=false;
    }
    else
    {
        if(arr[0] > ano || arr[0] < anoAntigo)
        {
            event.target.style.border = "1px solid red";
            event.target.value = "";
            op = false;
        }
        else
        {
            if(arr[0] == ano)
            {
                if(arr[2] > dia)
                {
                    if(arr[1] > mes)
                    {
                        event.target.style.border= "1px solid red";
                        event.target.value = "";
                        op = false;
                    }
                }
            }
        }
    }
    if(op == true)
        event.target.style.border= "1px solid green";
    
}


//validarCidade() usado para fazer a verificação do campo Cidade
function validarCidade ()
{
    var cidade = event.target.value;

    if(cidade)
        event.target.style.border= "1px solid green";
    else
    {
        event.target.style.border= "1px solid red";
        event.target.setAttribute('placeholder', 'Digite o campo corretamente!');
        event.target.value = "";
    }
        
}

// borda(select) usado para fazer a verificação do campo Sexo e Estado.
function borda (select)
{
    var opSelecionada = select.value;

    if(opSelecionada != "Selecione uma opção")
        select.style.border= "1px solid green";
    else
        select.style.border= "1px solid red";
}

// paciente.html
function validarHora ()
{
    var hora = event.target.value;
    
    var horaArr = hora.split(":");

    if(horaArr[0] && horaArr[1])
        event.target.style.border= "1px solid green";
    else
    {
        event.target.style.border= "1px solid red";
        event.target.value = "";
    }
        
}