
function addBenchmarkRow(containerId) {
  const container = document.getElementById(containerId);
  const template = document.getElementById('benchmarkRowTemplate');
  const clone = template.content.cloneNode(true);
  container.appendChild(clone);
}

function removeBenchmarkRow(button) {
  button.closest('.benchmark-row').remove();
}

function openEditLoModal(loId, courseId, loTitle, loDescription) {
  document.getElementById('editLoId').value = loId;
  document.getElementById('editLoCourseId').value = courseId;
  document.getElementById('editLoTitle').value = loTitle;
  document.getElementById('editLoDescription').value = loDescription;

  const benchmarksContainer = document.getElementById('editLoBenchmarksContainer');
  benchmarksContainer.innerHTML = '';

  // Always try to load existing benchmarks for this LO
  const presetRoot = document.getElementById('presetBenchmarks');
  const presets = presetRoot.querySelectorAll('.benchmark-row[data-lo-id=\"' + loId + '\"]');
  if (presets.length > 0) {
    presets.forEach(preset => {
      const clone = preset.cloneNode(true);
      benchmarksContainer.appendChild(clone);
    });
  } else {
    // If no benchmarks found, start with a single empty benchmark row
    addBenchmarkRow('editLoBenchmarksContainer');
  }
}

function saveNewLo() {
  const form = document.getElementById('addLoForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  Toastify({
    text: 'Learning Outcome added successfully!',
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();

  const modal = bootstrap.Modal.getInstance(document.getElementById('addLoModal'));
  modal.hide();
  form.reset();
  document.getElementById('addLoBenchmarksContainer').innerHTML = '';
}

function saveEditLo() {
  const form = document.getElementById('editLoForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  Toastify({
    text: 'Learning Outcome updated successfully! )',
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background: '#344945' }
  }).showToast();

  const modal = bootstrap.Modal.getInstance(document.getElementById('editLoModal'));
  modal.hide();
}

function deleteLo(loId) {
  if (confirm('Are you sure you want to delete this Learning Outcome? This action cannot be undone.')) {
    Toastify({
      text: 'Learning Outcome deleted successfully! ',
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
