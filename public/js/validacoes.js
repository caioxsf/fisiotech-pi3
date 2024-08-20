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

// tabela dinamica do cadastrar paciente //

// tabela com checkbox paciente

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
                    <td data-th="Data de Nascimento">${item.nascimento}</td>
                    <td data-th="CPF">${item.cpf}</td>
                    <td data-th="Endereço">${item.endereco}</td>
                    <td data-th="Bairro">${item.bairro}</td>
                    <td data-th="Sexo">${item.sexo}</td>
                    <td data-th="Cidade">${item.cidade}</td>
                    <td data-th="Estado">${item.estado}</td>
                    <td data-th="CEP">${item.cep}</td>
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
    var vnascimento = document.getElementById('nascimento');
    var vcpf = document.getElementById('cpf');
    var vendereco = document.getElementById('endereco');
    var vbairro = document.getElementById('bairro');
    var vsexo = document.getElementById('sexo');
    var vcidade = document.getElementById('cidade');
    var vestado = document.getElementById('estado');
    var vcep = document.getElementById('cep');

    
    let novoItem = {id: new Date().getTime(),
                    nome: vnome.value,
                    telefone: vtelefone.value,
                    email: vemail.value,
                    nascimento: vnascimento.value,
                    cpf: vcpf.value,
                    endereco: vendereco.value,
                    bairro: vbairro.value,
                    sexo: vsexo.value,
                    cidade: vcidade.value,
                    estado: vestado.value,
                    cep: vcep.value
                }
                    

        if(vnome.value && vtelefone.value && vemail.value && vnascimento.value && vcpf.value && vendereco.value && vbairro.value && vsexo.value && vcidade.value && vestado.value && vcep.value)
        {                
            dados.push(novoItem);
            montarTabela();
            vnome.value = '';
            vtelefone.value = '';
            vemail.value = '';
            vnascimento.value = '';
            vcpf.value = '';
            vendereco.value = '';
            vbairro.value = '';
            vsexo.value = 'Selecione uma opção';
            vcidade.value = '';
            vestado.value = 'Selecione uma opção';
            vcep.value = '';

            
            document.getElementById('nome').setAttribute('placeholder', '');
            document.getElementById('nome').style.border = "1px solid grey";

            document.getElementById('telefone').style.border = "1px solid grey";
            document.getElementById('telefone').setAttribute('placeholder', '');

            document.getElementById('email').style.border = "1px solid grey";
            document.getElementById('email').setAttribute('placeholder', '');

            document.getElementById('nascimento').style.border = "1px solid grey";

            document.getElementById('cpf').style.border = "1px solid grey";
            document.getElementById('cpf').setAttribute('placeholder', '');

            document.getElementById('endereco').style.border = "1px solid grey";
            document.getElementById('endereco').setAttribute('placeholder', '');

            document.getElementById('bairro').style.border = "1px solid grey";
            document.getElementById('bairro').setAttribute('placeholder', '');

            document.getElementById('sexo').style.border = "1px solid grey";

            document.getElementById('cidade').style.border = "1px solid grey";
            document.getElementById('cidade').setAttribute('placeholder', '');

            document.getElementById('estado').style.border = "1px solid grey";
            
            document.getElementById('cep').style.border = "1px solid grey";
            document.getElementById('cep').setAttribute('placeholder', '');
            
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
            if(vnascimento.value == "")
            {
                document.getElementById('nascimento').style.border = "1px solid red";
            }
            if(vcpf.value == "")
            {
                document.getElementById('cpf').style.border = "1px solid red";
                document.getElementById('cpf').setAttribute('placeholder', 'Digite o CPF corretamente!');
            }
            if(vendereco.value == "")
            {
                document.getElementById('endereco').style.border = "1px solid red";
                document.getElementById('endereco').setAttribute('placeholder', 'Digite o endereço corretamente!');
            }
            if(vbairro.value == "")
            {
                document.getElementById('bairro').style.border = "1px solid red";
                document.getElementById('bairro').setAttribute('placeholder', 'Digite o bairro corretamente!');
            }
            if(vsexo.value == "Selecione uma opção")
            {
                document.getElementById('sexo').style.border = "1px solid red";
            }
            if(vcidade.value == "")
            {
                document.getElementById('cidade').style.border = "1px solid red";
                document.getElementById('cidade').setAttribute('placeholder', 'Digite a cidade corretamente!');
            }
            if(vestado.value == "Selecione uma opção")
            {
                document.getElementById('estado').style.border = "1px solid red";
            }
            if(vcep.value == "")
            {
                document.getElementById('cep').style.border = "1px solid red";
                document.getElementById('cep').setAttribute('placeholder', 'Digite o CEP corretamente!');
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