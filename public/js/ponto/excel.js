document.addEventListener('DOMContentLoaded', function () {


    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel)

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelas"));
       
        XLSX.writeFile(wb, "ponto.xlsx");
    }
    
})