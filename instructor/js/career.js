
document.addEventListener('DOMContentLoaded', function () {
  var generateAll = document.getElementById('generateAllRecommendations');
  if (generateAll) {
    generateAll.addEventListener('click', function () {
      Toastify({
        text: ' generating recommendations for whole class.',
        duration: 4000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: { background: '#344945' }
      }).showToast();
    });
  }
  var fakeTexts = [
    'Backend Software Engineer, Data Structures Specialist, or Competitive Programming tracks. Strong performance in algorithms and problem-solving LOs.',
    'Frontend/Full‑stack Developer with focus on UI/UX and application logic design. High achievement in programming and data modeling LOs.',
    'Database Administrator, Data Engineer, or BI Developer roles. Strengths in database design and analytical thinking LOs.',
    'Software Architect or Systems Engineer pathway with potential for technical leadership. Excellence across algorithms, data structures, and system design LOs.',
    'Machine Learning Engineer, Research Scientist. Strong outcomes in math and ML-related LOs; ideal for AI/ML roles.',
    'Security Analyst, Penetration Tester. Strong outcomes in security and networking LOs; recommended for cybersecurity roles.',
    'UX Researcher, Product Manager. High achievement in design and communication LOs; suitable for user-centered and leadership roles.'
  ];
  document.querySelectorAll('.generate-one').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-student-id');
      var name = this.getAttribute('data-student-name');
      var row = this.closest('tr');
      var cell = row ? row.querySelector('.recommended-careers-cell') : null;
      if (cell) {
        cell.textContent = fakeTexts[Math.floor(Math.random() * fakeTexts.length)];
      }
      Toastify({
        text: 'Generated recommendations for ' + name + ' (ID: ' + id + ') — static demo until backend is deployed.',
        duration: 3500,
        close: true,
        gravity: 'top',
        position: 'right',
        style: { background: '#344945' }
      }).showToast();
    });
  });
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

(function () {
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
