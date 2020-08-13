(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function(form) {
        // submit event listener
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false || submit('isValid') === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
          
          if (form.checkValidity() === true) {
            submit(); // import { submit } from 'assets/js/localStorage.js';
          }
        }, false);

        // change event listener
        document.getElementById('inputIDNumber').addEventListener('change', function() {
          if (submit('isValid') === true) {
            document.getElementById('inputIDNumber').setCustomValidity("");
          } else if (submit('isValid') === false) {
            document.getElementById('inputIDNumber').setCustomValidity("ID Number is not unique");
          }
        })
      });
    }, false);
})();