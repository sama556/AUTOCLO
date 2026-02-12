
function calculateTotal(studentId) {
  const inputs = document.querySelectorAll(`.grade-input[data-student-id="${studentId}"]`);
  let total = 0;
  inputs.forEach(input => {
    const value = parseFloat(input.value) || 0;
    total += value;
  });
  const totalEl = document.querySelector(`.total-grade[data-student-id="${studentId}"]`);
  if (totalEl) {
    totalEl.textContent = total;
  }
}

// Update total when grade input changes
document.addEventListener('DOMContentLoaded', function() {
  const gradeInputs = document.querySelectorAll('.grade-input');
  gradeInputs.forEach(input => {
    input.addEventListener('input', function() {
      const studentId = this.getAttribute('data-student-id');
      calculateTotal(studentId);
    });

    // Handle Enter key to move to next input
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const inputs = Array.from(document.querySelectorAll('.grade-input'));
        const currentIndex = inputs.indexOf(this);
        if (currentIndex < inputs.length - 1) {
          inputs[currentIndex + 1].focus();
        }
      }
    });
  });
});

function saveStudentGrades(studentId) {
  const inputs = document.querySelectorAll(`.grade-input[data-student-id="${studentId}"]`);
  const grades = [];
  
  inputs.forEach(input => {
    const value = input.value.trim();
    if (value !== '') {
      grades.push({
        studentId: input.getAttribute('data-student-id'),
        assessmentId: input.getAttribute('data-assessment-id'),
        gradeId: input.getAttribute('data-grade-id'),
        actualGrade: parseFloat(value)
      });
    }
  });

  if (grades.length === 0) {
    Toastify({
      text: 'No grades to save for this student.',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: { background: '#d32f2f' }
    }).showToast();
    return;
  }

  Toastify({
    text: `Grades saved successfully for student ${studentId}! `,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();
}

function saveAllGrades() {
  const allInputs = document.querySelectorAll('.grade-input');
  const allGrades = [];
  const students = new Set();

  allInputs.forEach(input => {
    const value = input.value.trim();
    if (value !== '') {
      const studentId = input.getAttribute('data-student-id');
      students.add(studentId);
      allGrades.push({
        studentId: studentId,
        assessmentId: input.getAttribute('data-assessment-id'),
        gradeId: input.getAttribute('data-grade-id'),
        actualGrade: parseFloat(value)
      });
    }
  });

  if (allGrades.length === 0) {
    Toastify({
      text: 'No grades to save.',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: { background: '#d32f2f' }
    }).showToast();
    return;
  }

  Toastify({
    text: `All grades saved successfully for ${students.size} student(s)! `,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();
}

function resetAllGrades() {
  if (confirm('Are you sure you want to reset all changes? This will restore original values.')) {
    
    Toastify({
      text: 'Grades reset to original values. ',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: { background: '#344945' }
    }).showToast();
  }
}

function loadGradesTable() {
  const courseId = document.getElementById('courseSelector').value;
  const sectionId = document.getElementById('sectionSelector').value;
  
  if (courseId && sectionId) {
    Toastify({
      text: `Loading grades for ${courseId} - ${sectionId}... `,
      duration: 2000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: { background: '#344945' }
    }).showToast();
  }
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

