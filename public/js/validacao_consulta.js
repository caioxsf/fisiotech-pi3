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

function montarTabela(){
    let tbody = document.querySelector('#tb-body');
    let html = '';
    /* DATA ATTRIBUTES (ou atributo de dados) data- */
    if(dados == '')
    {
        document.getElementById('grid').style.display = 'none';
        document.getElementById('btnExcluirSelecionados').style.display = 'none';
    }
        
    else
    {
        document.getElementById('btnExcluirSelecionados').style.display = 'block';
        document.getElementById('grid').style.display = 'block';

    
        for (let item of dados)
        {
            
            html+=`<tr>
                    <td data-th="Selecionar" style="margin-top: 20px;"><input style="cursor: pointer;" type="checkbox" data-id="${item.id}" /></td>
                    <td data-th="Nome">${item.nome}</td>
                    <td data-th="Telefone">${item.telefone}</td>
                    <td data-th="Email">${item.email}</td>
                    <td data-th="Serviço">${item.servico}</td>
                    <td data-th="Data">${item.data}</td>
                    <td data-th="Hora">${item.hora}</td>
                    <td data-th="Obs">${item.obs}</td>
                    <td data-th="Excluir"><a class="btnExcluir" style="cursor: pointer;" onclick="excluirItem(${item.id}) ">&#9746;</a></td>
                </tr>
                `
        }
    }
    
    tbody.innerHTML = html;
}

function adicionarItem()
{
    var vnome = document.getElementById('nome');
    var vtelefone = document.getElementById('telefone');
    var vemail = document.getElementById('email');
    var vservico = document.getElementById('servico');
    var vdata = document.getElementById('data');
    var vhora = document.getElementById('hora');
    var vobs = document.getElementById('obs');


    let novoItem = {id: new Date().getTime(),
                    nome: vnome.value,
                    telefone: vtelefone.value,
                    email: vemail.value,
                    servico: vservico.value,
                    data: vdata.value,
                    hora: vhora.value,
                    obs: vobs.value
                }
                    

        if(vnome.value && vtelefone.value && vemail.value && vservico.value && vdata.value && vhora.value && vobs.value)
        {                
            dados.push(novoItem);
            montarTabela();
            vnome.value = '';
            vtelefone.value = '';
            vemail.value = '';
            vservico.value = 'Selecione uma opção';
            vdata.value = '';
            vhora.value = '';
            vobs.value = '';
            
            document.getElementById('nome').setAttribute('placeholder', '');
            document.getElementById('nome').style.border = "1px solid grey";

            document.getElementById('telefone').style.border = "1px solid grey";
            document.getElementById('telefone').setAttribute('placeholder', '');

            document.getElementById('email').style.border = "1px solid grey";
            document.getElementById('email').setAttribute('placeholder', '');

            document.getElementById('servico').style.border = "1px solid grey";

            document.getElementById('data').style.border = "1px solid grey";
            
            document.getElementById('hora').style.border = "1px solid grey";
            
            document.getElementById('obs').style.border = "1px solid grey";
        }
        else
        {
            if(vnome.value == "")
            {
                document.getElementById('nome').style.border = "1px solid red";
                document.getElementById('nome').setAttribute('placeholder', 'Digite o nome corretamente!');
            }
            if(vtelefone.value == "")
            {
                document.getElementById('telefone').style.border = "1px solid red";
                document.getElementById('telefone').setAttribute('placeholder', 'Digite o telefone corretamente!');
            }
            if(vemail.value == "")
            {
                document.getElementById('email').style.border = "1px solid red";
                document.getElementById('email').setAttribute('placeholder', 'Digite o email corretamente!');
            }
            if(vservico.value == "Selecione uma opção")
            {
                document.getElementById('servico').style.border = "1px solid red";
            }
            if(vdata.value == "")
            {
                document.getElementById('data').style.border = "1px solid red";
            }
            if(vhora.value == "")
            {
                document.getElementById('hora').style.border = "1px solid red";
            }
            if(vobs.value == "")
            {
                document.getElementById('obs').style.border = "1px solid red";
            }
        }
}

function excluirItem(idDel){
    let listaAux = []
    for (let i=0; i<dados.length;i++){
        if(dados[i].id != idDel)
            listaAux.push(dados[i]);
    }
    dados = listaAux;
    montarTabela();
}

function excluirSelecionados(){
    // vai pegar os chackbox que tem o data attribute associado
   let listaCheckbox=document.querySelectorAll('[data-id]');
   if (listaCheckbox.length>0){
        for (let ch of listaCheckbox){
            if (ch.checked ==true)
                excluirItem(ch.dataset.id); // o valor associado a ele com a propriedade data-id 
        } 
    }
    else
       alert('Não há itens para serem excluídos!!'); 
}

function selecionaTodos(){
    let listaCheckbox=document.querySelectorAll('[data-id]');
    let ckPai = document.querySelector('#ckTodos');
    for (let ch of listaCheckbox){
      ch.checked = ckPai.checked;
    }
  }



  document.addEventListener('DOMContentLoaded',
       function(){
          montarTabela();

          let btnAdd = document.querySelector('#btn-add');
          btnAdd.addEventListener('click',adicionarItem,false);
          

          let btnSelec = document.querySelector('#btnExcluirSelecionados');
          btnSelec.addEventListener('click',excluirSelecionados,false);

          let ckPai = document.querySelector('#ckTodos');
          ckPai.addEventListener('click',selecionaTodos,false); 

       }
,false);