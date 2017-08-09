$(document).ready(function main() {
  $('#face-detect-results').hide();

  $('#file-upload-form').submit(function(evt) {
    // Retrieve DOM file element from selector.
    const form = $(this);
    const file = $('#file-input')[0].files[0];
    if (!file) {
      $('#error-message').text('Please select a file.');
      return evt.preventDefault();
    }
    $('#error-message').text('');

    // Create HTML FormData structure.
    const formData = new FormData(form);
    const fileTag = 'file-0';
    formData.append(fileTag, file);;

    // Disable input form while request is in flight.
    form.find('input').prop('disabled', true);

    // Submit image to backend.
    $.ajax({
      url: '/__bs__/post',
      type: 'POST',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data, textStatus, jqXHR) {
        data = data || {};
        console.log('Received server response:', data);

        if (data.preview) {
          $('#face-detect-results-preview').attr('src', data.preview);
          $('#face-detect-results').show();
        } else {
          $('#face-detect-results').hide();
        }

        // Re-enable input form.
        form.find('input').prop('disabled', false);
      },
    });

    evt.preventDefault();
  });
});
