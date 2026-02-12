
function downloadReport(name, format) {
  Toastify({
    text: ' downloading ' + name + ' as ' + format + '.',
    duration: 3500,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();
}

function regenerateToast(name) {
  Toastify({
    text: ' regenerating report "' + name + '" using latest analytics and Gemini text.',
    duration: 4000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('generateReportForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var scope = document.getElementById('reportScope');
      var format = document.getElementById('reportFormat');
      var scopeText = scope ? scope.options[scope.selectedIndex].text : '';
      var formatVal = format ? format.value : '';
      Toastify({
        text: ' generate report (' + formatVal + ') with Gemini and return download link. Scope: ' + scopeText,
        duration: 4500,
        close: true,
        gravity: 'top',
        position: 'right',
        style: { background: '#344945' }
      }).showToast();
    });
  }
});

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


