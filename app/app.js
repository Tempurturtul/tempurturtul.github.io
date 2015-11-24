$(document).ready(function() {
  // On email form submit...
  $('#email-form').on('submit', function() {
    sendEmail();
    return false;  // Prevent form from reloading page.
  });

  function sendEmail() {
    var name = $('#name').val().toString() || "Anon";
    var email = $('#email').val().toString() || "Anon@anon.com";
    var message = $('#message').val().toString();

    // POST mandrill API call.
    $.ajax({
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'fBENb5Z2RPSpqs-mTRa_VA',  // Expires after 2000 emails.
        'message': {
          "text": message,
          "subject": "Portfolio Feedback",
          "from_email": email,
          "from_name": name,
          "to": [
            {
              "email": "tempurturtul@gmail.com",
              "name": "Tempurturtul",
              "type": "to"
            }
          ]
        }
      },
      method: 'POST',
      success: success,
      error: err
    });

    // On success...
    function success(data, status, jqxhr) {
      // Check if the message was sent.
      if (data[0].status === "sent") {
        // Notify user.
        toastr.success('Message sent.');
        // Clear form.
        $("#email-form").find("input, textarea").val("");
      } else {
        // Notify user.
        toastr.error('Message not sent. ' + data[0].reject_reason);
      }
    }

    // On failure...
    function err(jqxhr, status, error) {
      // Notify user.
      toastr.error('Message not sent. ' + error);
    }
  }
});
