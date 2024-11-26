document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelectorAll('.btn-add');
    for(let i=0;i<btn.length;i++) {
        if(btn[i].dataset.alteracao == 'true')
            btn[i].addEventListener('click', atualizarPaciente);
        else
            btn[i].addEventListener('click', cadastrarPaciente);
    }
    

    var inputImg = document.getElementById("pacienteImagem");

    inputImg.addEventListener("change", exibirPrevia);

    function exibirPrevia(e) {
        
        let imagem = document.getElementById("pacienteImagem").files[0];
    
        //validando extensão
        let ext = imagem.type.split("/").pop();
        if(ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
            let imgPrevia = document.getElementById("imgPrevia");
            let objImg = URL.createObjectURL(imagem);
            imgPrevia.setAttribute("src", objImg);
            document.getElementById("previaImagem").style.display = 'block';
        }
        else{
            alert("A extensão da imagem é inválida!");
            document.getElementById("pacienteImagem").value = "";
        }
    
    }

    
    function cadastrarPaciente () {
        
        let nome = document.getElementById('nome');
        let telefone = document.getElementById('telefone');
        let email = document.getElementById('email');
        let nascimento = document.getElementById('nascimento');
        let cpf = document.getElementById('cpf');
        let endereco = document.getElementById('endereco');
        let bairro = document.getElementById('bairro');
        let sexo = document.getElementById('sexo');
        let cidade = document.getElementById('cidade');
        let estado = document.getElementById('estado');
        let cep = document.getElementById('cep');
        let pacienteImagem = document.getElementById('pacienteImagem').files[0];
        
        if (nome.value != "" && telefone.value != "" && email.value != "" && nascimento.value != "" && cpf.value != "" && endereco.value != "" &&
            bairro.value != "" && sexo.value != "" && cidade.value != "" && estado.value != "" && cep.value != "") {
        
            var data = new FormData();
            data.append("nome", nome.value);
            data.append("telefone", telefone.value);
            data.append("email", email.value);
            data.append("nascimento", nascimento.value);
            data.append("cpf", cpf.value);
            data.append("endereco", endereco.value);
            data.append("bairro", bairro.value);
            data.append("sexo", sexo.value);
            data.append("cidade", cidade.value);
            data.append("estado", estado.value);
            data.append("cep", cep.value);
            data.append("imagem", pacienteImagem)

            fetch('/paciente', {
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

    function atualizarPaciente () {
        
        let id = document.getElementById('id');
        let nome = document.getElementById('nome');
        let telefone = document.getElementById('telefone');
        let email = document.getElementById('email');
        let nascimento = document.getElementById('nascimento');
        let cpf = document.getElementById('cpf');
        let endereco = document.getElementById('endereco');
        let bairro = document.getElementById('bairro');
        let sexo = document.getElementById('sexo');
        let cidade = document.getElementById('cidade');
        let estado = document.getElementById('estado');
        let cep = document.getElementById('cep');
        let pacienteImagem = document.getElementById('pacienteImagem').files[0];
        
        if (nome.value != "" && telefone.value != "" && email.value != "" && nascimento.value != "" && cpf.value != "" && endereco.value != "" &&
            bairro.value != "" && sexo.value != "" && cidade.value != "" && estado.value != "" && cep.value != "" ) {
        
            var data = new FormData();
            data.append("id", id.value);
            data.append("nome", nome.value);
            data.append("telefone", telefone.value);
            data.append("email", email.value);
            data.append("nascimento", nascimento.value);
            data.append("cpf", cpf.value);
            data.append("endereco", endereco.value);
            data.append("bairro", bairro.value);
            data.append("sexo", sexo.value);
            data.append("cidade", cidade.value);
            data.append("estado", estado.value);
            data.append("cep", cep.value);
            data.append("imagem", pacienteImagem)

            fetch('/paciente/editar', {
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
    

});