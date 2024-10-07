function validarDataConsulta() {
    var data = event.target.value;
    var arr = data.split("-");
    var op = true;

    var dataAtual = new Date();
    var diaAtual = dataAtual.getDate();
    var mesAtual = dataAtual.getMonth() + 1; 
    var anoAtual = dataAtual.getFullYear();


    var ano = parseInt(arr[0]);
    var mes = parseInt(arr[1]);
    var dia = parseInt(arr[2]);

    if (!ano || !mes || !dia)
    {
        event.target.style.border = "1px solid red";
        event.target.value = "";
        op = false;
    }
    else
    {
        if (ano < anoAtual)
        {
            event.target.style.border = "1px solid red";
            event.target.value = "";
            op = false;
        }
        else if (ano === anoAtual)
        {
            if (mes < mesAtual)
            {
                event.target.style.border = "1px solid red";
                event.target.value = "";
                op = false;
            } else if (mes === mesAtual)
            {
                if (dia < diaAtual)
                {
                    event.target.style.border = "1px solid red";
                    event.target.value = "";
                    op = false;
                }
            }
        }
    }
    if (op === true) {
        event.target.style.border = "1px solid green";
    }
}


function validarHoraConsulta ()
{
    var hora = event.target.value;
    var horaArr = hora.replace(":","");

    console.log(horaArr);
    if(horaArr >= 800 && horaArr <= 1700)
        event.target.style.border= "1px solid green";
    else
    {
        event.target.style.border= "1px solid red";
        event.target.value = "";
    }
        
}


var dados = [];

