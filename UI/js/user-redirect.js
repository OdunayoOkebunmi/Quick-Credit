// validate registration form
const formValidationSignUp = (redirectTo) => {
  if (true) {
    location.href = redirectTo;
    return false;
  }
};

const formValidationSignIn = () => {
  if (true) {
    const email = document.getElementById('user-email').value;

    if (email.endsWith('quickcredit.com')) {
      location.href = 'admin-dashboard.html';
    }
    else {
      location.href = 'user-dashboard.html'
    }
    return false;
  }
};

