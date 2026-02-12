
document.addEventListener('DOMContentLoaded', function() {
  // LO-CS231-1 Chart
  const ctx1 = document.getElementById('chart-lo-cs231-1');
  if (ctx1) {
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Achievement', 'Benchmark'],
        datasets: [{
          label: 'LO-CS231-1',
          data: [82, 75],
          backgroundColor: ['#28a745', '#ffc107'],
          borderColor: ['#1e7e34', '#e0a800'],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.x + '%';
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          y: { display: false }
        }
      }
    });
  }

  // LO-CS231-2 Chart
  const ctx2 = document.getElementById('chart-lo-cs231-2');
  if (ctx2) {
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Achievement', 'Benchmark'],
        datasets: [{
          label: 'LO-CS231-2',
          data: [68, 80],
          backgroundColor: ['#dc3545', '#ffc107'],
          borderColor: ['#c82333', '#e0a800'],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.x + '%';
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          y: { display: false }
        }
      }
    });
  }

  // LO-CS231-3 Chart
  const ctx3 = document.getElementById('chart-lo-cs231-3');
  if (ctx3) {
    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['Achievement', 'Benchmark'],
        datasets: [{
          label: 'LO-CS231-3',
          data: [64, 70],
          backgroundColor: ['#dc3545', '#ffc107'],
          borderColor: ['#c82333', '#e0a800'],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.x + '%';
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          y: { display: false }
        }
      }
    });
  }

  // LO-CS101-1 Chart
  const ctx4 = document.getElementById('chart-lo-cs101-1');
  if (ctx4) {
    new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: ['Achievement', 'Benchmark'],
        datasets: [{
          label: 'LO-CS101-1',
          data: [79, 70],
          backgroundColor: ['#28a745', '#ffc107'],
          borderColor: ['#1e7e34', '#e0a800'],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.x + '%';
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          y: { display: false }
        }
      }
    });
  }
});

function generateAIInsights() {
  const loadingEl = document.getElementById('aiLoading');
  const contentEl = document.getElementById('aiInsightsContent');
  
  // Show loading
  loadingEl.classList.add('show');
  contentEl.classList.remove('show');

  // Simulate API call delay (static demo)
  setTimeout(function() {
    loadingEl.classList.remove('show');
    contentEl.classList.add('show');

    Toastify({
      text: 'AI insights generated successfully! (Static demo data)',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: { background: '#344945' }
    }).showToast();
  }, 2000);
}

function handleLogout() {
  Toastify({
    text: 'Logging out...',
    duration: 2000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();

  setTimeout(function () {
    window.location.href = '../login.html';
  }, 1200);
}


