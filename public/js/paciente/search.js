document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnBuscar').addEventListener('click', buscar);

    function buscar() {
        debugger;
        let texto = document.getElementById('texto').value;
        let tipoBusca = "";

        if (document.querySelector("input[name='tipoBusca']:checked"))
            tipoBusca = document.querySelector("input[name='tipoBusca']:checked").value;

        let objetoBusca = {};
        if (texto != "" && (tipoBusca === 'nome' || tipoBusca === 'cpf')) {
            objetoBusca.texto = texto;
            objetoBusca.tipoBusca = tipoBusca;
        } else if (texto === "") {
            objetoBusca.texto = texto;
        } else {
            alert('Escolha o tipo da busca!');
            return;
        }

        fetch('/paciente/lista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objetoBusca),
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.pacientes.length > 0) {
                    let html = "";

                    for (let p of r.pacientes) {
                        html += `
                        <div class="card-modal" id="search-aqui">
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title"> ${p.nome} </h5>
                                    <p class="card-text " style="text-align: center;"><i class="fa fa-id-card" aria-hidden="true"></i>  ${p.id}  /  ${p.cpf} </p>
                                </div>
                                <button class="abrir" data-dialog="dialog-${p.id}">Ver mais..</button>
                            </div>

                            <dialog class="texto" id="dialog-${p.id}">
                                <div class="card" style="width: 18rem;">
                                    <img src="/img/paciente/fotosemperfil.png" class="card-img-top card-img-perfil">
                                    <div class="card-body">
                                        <h5 class="card-title"> ${p.nome} </h5>
                                        <p class="card-text"> ${p.endereco}, ${p.bairro}, ${p.cidade} (${p.estado_id}), ${p.cep} </p>
                                        <p class="card-text"><i class="fa fa-id-card" aria-hidden="true"></i>  ${p.id} </p>
                                        <div class="rolagem-y-card">
                                            <p class="card-text"><i class="fa fa-phone" aria-hidden="true"></i>  ${p.telefone} </p>
                                            <p class="card-text"><i class="fa fa-envelope" aria-hidden="true"></i>  ${p.email} </p>   
                                            <p class="card-text"><i class="fa fa-calendar" aria-hidden="true"></i>  ${p.nascimento}</p> 
                                            <p class="card-text"><i class="fa fa-id-card" aria-hidden="true"></i>  ${p.cpf}</p> 
                                            <p class="card-text"><i class="fa fa-user" aria-hidden="true"></i>  ${p.sexo_id}</p> 
                                        </div>
                                    </div>
                                </div>
                                <a href="/paciente/editar/${p.id}" class="btn-editar" style="margin-top: 20px;"><i class="fas fa-edit" style="color: #74C0FC;"></i></a>
                                <button type="button" class="btn-excluir" data-id="${p.id}" data-nome="${p.nome}" style="margin-top: 20px; background-color: transparent; border: none;"><i class="fa-solid fa-trash" style="color: #f50a0a;"></i></button>
                                <button class="fechar" data-dialog="dialog-${p.id}"><i class="fa-solid fa-xmark fa-xl" style="color: #ff0000;"></i></button>
                            </dialog>
                        </div>
                        `;
                    }

                    document.querySelector('.modal-container').innerHTML = html;

                  
                    ativarEventosDialog();
                } else {
                    alert('Esse paciente não existe!');
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    function ativarEventosDialog() {
      
        const buttons = document.querySelectorAll('.abrir');
        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                const dialogId = button.getAttribute('data-dialog');
                const dialog = document.getElementById(dialogId);
                if (dialog) dialog.showModal();
            });
        });

      
        const buttonsF = document.querySelectorAll('.fechar');
        buttonsF.forEach(function (button) {
            button.addEventListener('click', function () {
                const dialogId = button.getAttribute('data-dialog');
                const dialog = document.getElementById(dialogId);
                if (dialog) dialog.close();
            });
        });
    }
});

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
  }