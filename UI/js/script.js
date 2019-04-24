//listen for submit

document.getElementById('loan-form').addEventListener('submit', function (e) {
  //hide results
  document.getElementById('results').style.display = 'none';
  //show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calaculateResults, 2000);

  e.preventDefault();

});


//calculate results

function calaculateResults(e) {

  console.log('calculating...')
  //Ui vars
  const amount = document.getElementById('amount');
  const interest = 0.05;
  const tenor = document.getElementById('tenor');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest) * principal;
  const calculatedPayments = parseInt(tenor.value);

  //compute monthly payment
  const monthly = (principal + calculatedInterest) / calculatedPayments;

  if (isFinite(monthly)) {

    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    //show results
    document.getElementById('results').style.display = 'block';

    //hide spiner
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }

}

function showError(error) {

  //show results
  document.getElementById('results').style.display = 'none';

  //hide spiner
  document.getElementById('loading').style.display = 'none';


  //create div
  const errorDiv = document.createElement('div');

  //get elements

  const card = document.querySelector('.card');
  const heading = document.querySelector('.loan-calc-heading');

  //add class
  errorDiv.className = 'alert alert-danger';

  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3secs

  setTimeout((clearError) => {
    document.querySelector('.alert').remove();
  }, 2000);

}