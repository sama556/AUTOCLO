
function openEditAssessmentModal(assessmentId, courseId, sectionId, type, title, date, maxGrade, weight) {
  document.getElementById('editAssessmentId').value = assessmentId;
  document.getElementById('editAssessmentCourseId').value = courseId;
  document.getElementById('editAssessmentSectionId').value = sectionId;
  document.getElementById('editAssessmentType').value = type;
  document.getElementById('editAssessmentTitle').value = title;
  document.getElementById('editAssessmentDate').value = date;
  document.getElementById('editAssessmentMaxGrade').value = maxGrade;
  document.getElementById('editAssessmentWeight').value = weight;
}

function saveNewAssessment() {
  const form = document.getElementById('addAssessmentForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  Toastify({
    text: 'Assessment added successfully! ',
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();

  const modal = bootstrap.Modal.getInstance(document.getElementById('addAssessmentModal'));
  modal.hide();
  form.reset();
}

function saveEditAssessment() {
  const form = document.getElementById('editAssessmentForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  Toastify({
    text: 'Assessment updated successfully!',
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();

  const modal = bootstrap.Modal.getInstance(document.getElementById('editAssessmentModal'));
  modal.hide();
}

function filterLos() {
  const searchTerm = document.getElementById('loSearchInput').value.toLowerCase().trim();
  const loItems = document.querySelectorAll('#linkLosModal .lo-link-item');
  const loGroups = document.querySelectorAll('#linkLosModal .lo-group');
  const noLosFound = document.getElementById('noLosFound');
  let visibleCount = 0;

  loItems.forEach(item => {
    const checkbox = item.querySelector('.lo-checkbox');
    const loId = checkbox.value.toLowerCase();
    const loTitle = checkbox.getAttribute('data-lo-title').toLowerCase();
    const label = item.querySelector('label').textContent.toLowerCase();

    if (searchTerm === '' || loId.includes(searchTerm) || loTitle.includes(searchTerm) || label.includes(searchTerm)) {
      item.style.display = '';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  // Hide/show groups based on visible items
  loGroups.forEach(group => {
    const visibleItems = group.querySelectorAll('.lo-link-item:not([style*="display: none"])');
    if (visibleItems.length === 0) {
      group.style.display = 'none';
    } else {
      group.style.display = '';
    }
  });

  // Show/hide empty state
  if (visibleCount === 0 && searchTerm !== '') {
    noLosFound.style.display = '';
  } else {
    noLosFound.style.display = 'none';
  }

  updateSelectedCount();
}

function clearSearch() {
  document.getElementById('loSearchInput').value = '';
  filterLos();
}

function updateSelectedCount() {
  const modalEl = document.getElementById('linkLosModal');
  const checkedBoxes = modalEl.querySelectorAll('.lo-checkbox:checked');
  const countEl = document.getElementById('selectedLosCount');
  if (countEl) {
    countEl.textContent = checkedBoxes.length;
  }
}

function saveLinkedLos() {
  const modalEl = document.getElementById('linkLosModal');
  const checkedBoxes = modalEl.querySelectorAll('.lo-checkbox:checked');
  
  if (checkedBoxes.length === 0) {
    Toastify({
      text: 'Please select at least one learning outcome.',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: { background: '#d32f2f' }
    }).showToast();
    return;
  }

  const links = [];
  checkedBoxes.forEach(checkbox => {
    const loId = checkbox.value;
    const loItem = checkbox.closest('.lo-link-item');
    const coverageInput = loItem.querySelector('.lo-coverage');
    const coverage = coverageInput ? coverageInput.value : '';
    links.push({ loId, coverage });
  });

  Toastify({
    text: 'Learning outcomes linked successfully! (Static demo)',
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();

  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
}

function deleteAssessment(assessmentId) {
  if (confirm('Are you sure you want to delete this Assessment? This action cannot be undone.')) {
    Toastify({
      text: 'Assessment deleted successfully! ',
      duration: 3000,
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

// Initialize event listeners for LO modal
(function() {
  const modalEl = document.getElementById('linkLosModal');
  if (modalEl) {
    // Update count when checkboxes change
    modalEl.addEventListener('change', function(e) {
      if (e.target.classList.contains('lo-checkbox')) {
        updateSelectedCount();
      }
    });

    // Reset search and count when modal is shown
    modalEl.addEventListener('shown.bs.modal', function() {
      clearSearch();
      updateSelectedCount();
    });
  }
})();


