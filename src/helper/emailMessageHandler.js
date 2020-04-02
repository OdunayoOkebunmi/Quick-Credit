/**
 * @class MessageHandler
 *
 * @description Handles all the messages sent to client
 *
 * @exports MessageHandler
 */

class MessageHandler {
  /**
  * @method signupMessage
  *
  * @description sends an email notification to user on signup
  *
  * @param {object} data - The email address, subject & body
  *
  * @returns {object} - The email address, subject & body
  */

  static signupMessage(data) {
    const { email } = data;
    const subject = 'Welcome to Quick Credit';
    const body = `<div style="line-height:2; font-family: 'Courier New', Courier, monospace">
    <img
      src="https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif"
      alt=""
      style="width:100%;text-align: center"
    />
    <br>
    <br>
     Hello <em style="text-transform: capitalize">${data.firstName} </em>, 
     <br>
        <h4>Let's get started with Quick Credit</h4>
        Whether you're looking for capital to start up your business or loans to build your dream home,
        we've created <span style="font-weight:bold">Quick Credit</span> to provide you with that and save time.

        <br>
        Ready to get started? 
        <br>
        <span> Click <a href="#" style="background-color:#b23242; width: 50px; height: 30px;text-decoration: none;padding: 10px 15px;color: #fff">Here!</a> to go straight to your dashboard</span>
        </p>
  </div>`;

    return { subject, email, body };
  }

  /**
  * @method loanApprovalMessage
  *
  * @description sends an email notification to the specified email upon loan approval or rejection
  *
  * @param {object} data - The email address, subject & body
  *
  * @returns {object} - The email address, subject & body
  */

  static loanApprovalMessage(data, email) {
    const subject = 'Quick Credit: Loan Status';
    const body = `<style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    td,
    th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #dddddd;
    }
  </style>
  <div
    style="line-height:1.6; font-family: 'Courier New', Courier, monospace; "
  >
    Hello
    <br />
    Your loan application has been ${data.status} by Admin.
    <br />
    <table>
      <tr>
        <td>Loan ID</td>
        <td>${data.id}</td>
      </tr>
      <tr>
        <td>Loan Amount</td>
        <td>${data.amount}</td>
      </tr>
      <tr>
        <td>Tenor</td>
        <td>${data.tenor}</td>
      </tr>
      <tr>
        <td>Payment Installment</td>
        <td>${data.paymentInstallment}</td>
      </tr>
    </table>

    Log in to your dashboard to view more
  </div>
    `;
    return { subject, body, email };
  }
}

export default MessageHandler;
