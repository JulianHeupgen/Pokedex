
function showStats(labels, values) {

    document.getElementById('pokemonInfos-content').innerHTML = '';
    document.getElementById('pokemonInfos-content').innerHTML += 
    `<div>
        <canvas id="myChart"></canvas>
    </div>`;
    
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'polarArea',
        data: {
        labels: labels,
        datasets: [{
        data: values,
        borderWidth: 1
        }]
        },
        options: {
        scales: {
        x: {
            display: false
        },    
        y: {
            display: false,
            beginAtZero: true
        }
            }
                }
                    });                                                              
}

