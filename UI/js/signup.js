const url = 'https://quick-credit-odunayo.herokuapp.com/api/v1/auth/signup';
const signupForm = document.getElementById('sign-up-form');
const firstName = document.getElementById('new-user-fname');
const lastName = document.getElementById('new-user-lname');
const email = document.getElementById('new-user-email');
const address = document.getElementById('new-user-address');
const password = document.getElementById('new-user-password');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      address: address.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(response => {
      if (response.error) {
        showError(response.error);
      }
      if (response.data) {
        location.href = '#user-loan-popup';
        setTimeout(() => {
          window.location = 'login.html'
        }, 5000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userDetails', JSON.stringify(response.data));
        localStorage.setItem('loggedIn', true);
      }

    })
    .catch((error) => {
      console.warn(error);
      const message = 'Error in connecting, Please check your internet connection and try again'
      showError(message);
    });

});

const showError = (error) => {
  const errorDiv = document.createElement('div');
  const container = document.querySelector('.form-container');
  const heading = document.querySelector('.heading-secondary');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  container.insertBefore(errorDiv, heading);

  setTimeout((clearError) => {
    document.querySelector('.alert').remove();
  }, 5000);
}