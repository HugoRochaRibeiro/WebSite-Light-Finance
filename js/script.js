document.getElementById('input').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Extrair meses e gastos
        const months = jsonData.slice(1).map(row => row[0]); // Extrair meses
        const expenses = jsonData.slice(1).map(row => row[1]); // Extrair gastos

        // Criar gráfico
        createChart(months, expenses);
    };

    reader.readAsArrayBuffer(file);
}

function createChart(labels, data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gastos por Mês',
                data: data,
                backgroundColor: 'rgba(79, 156, 249, 0.2)',
                borderColor: 'rgba(79, 156, 249, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
