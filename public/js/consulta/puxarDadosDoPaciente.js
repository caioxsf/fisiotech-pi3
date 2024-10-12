async function preencherDadosPaciente() {
    let pacienteId = document.getElementById("nomepacientes").value;

    try {
        let response = await fetch(`/paciente/dados/${pacienteId}`);
        if (response.ok) {
            let dados = await response.json();
            document.getElementById("telefone").value = dados.telefone;
            document.getElementById("email").value = dados.email;
        } else {
            console.error("Erro ao buscar dados do paciente");
        }
    } catch (error) {
        console.error("Erro de rede: ", error);
    }
}