document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.abrir');
    const buttonsF = document.querySelectorAll('.fechar');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {

            const dialogId = button.getAttribute('data-dialog');
            const dialog = document.getElementById(dialogId); 
            dialog.showModal(); 
        });
    });

    buttonsF.forEach(function(button) {
        button.addEventListener('click', function() {
            
            const dialogId = button.getAttribute('data-dialog');
            const dialog = document.getElementById(dialogId); 
            dialog.close(); 
        });
    });
});
