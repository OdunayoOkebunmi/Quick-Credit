const url = 'https://quick-credit-odunayo.herokuapp.com/api/v1/auth/signin';
const loginForm = document.getElementById('login-form');
const email = document.getElementById('user-email');
const password = document.getElementById('user-password');
const popup = document.querySelector('.popup');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(response => {
      if (response.error) {

        showError(response.error);
        password.value = '';
      }
      if (response.data) {
        location.href = '#user-loan-popup';
        setTimeout(() => {
          if (response.data.email.endsWith('quickcredit.com')) {
            location.href = 'admin-loan-applications.html';
          }
          else {
            location.href = 'user-dashboard.html'
          }
        }, 3000);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userDetails', JSON.stringify(response.data));
        localStorage.setItem('loggedIn', true);
      }
    })
    .catch((error) => {
      const message = 'Error in connecting, Please check your internet connection and try again'
      showError(message);
    })

})

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
