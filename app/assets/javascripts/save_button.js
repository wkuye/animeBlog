$(document).ready(function() {
  const $genreForm = $('.add-anime-form');
  const $saveBtn = $genreForm.find('.save-btn');
  const $nestedContainer = $genreForm;// select the container

  function updateSaveButtonVisibility() {
    const nestedFields = $nestedContainer.find('.nested-fields');
    if (nestedFields.length > 0) {
      $saveBtn.show();
    } else {
      $saveBtn.hide();
    }
  }

  // Initialize on page load
  updateSaveButtonVisibility();

  // Listen on the container for Cocoon events
  $nestedContainer
    .on('cocoon:after-insert', function() {
      updateSaveButtonVisibility();
    })
    .on('cocoon:after-remove', function() {
      updateSaveButtonVisibility();
    });
});
