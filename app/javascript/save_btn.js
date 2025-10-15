import $ from "jquery";

$(document).ready(function() {
  const $genreForm = $('.add-anime-form');
  const $saveBtn = $genreForm.find('.save-btn');
  const $nestedContainer = $genreForm;

  function updateSaveButtonVisibility() {
    const nestedFields = $nestedContainer.find('.nested-fields');
    if (nestedFields.length > 0) {
      $saveBtn.show();
    } else {
      $saveBtn.hide();
    }
  }

  updateSaveButtonVisibility();

  $nestedContainer
    .on('cocoon:after-insert', updateSaveButtonVisibility)
    .on('cocoon:after-remove', updateSaveButtonVisibility);
});
