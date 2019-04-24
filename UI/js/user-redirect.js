//LOGIN REDIRECT FOR USER OR ADMIN
const submitButton = document.getElementById('submit-btn')
submitButton.addEventListener('click', function () {
  const value = getValue();
  if (value === 'User') location.href = "user-dashboard.html";
  if (value === 'Admin') location.href = "admin-dashboard.html";
})

//get select value
function getValue() {
  const selectInput = document.getElementById('user-role-login');
  const selectInputValue = selectInput.value;
  return selectInputValue;
}
