[![Build Status](https://travis-ci.com/OdunayoOkebunmi/Quick-Credit.svg?branch=develop)](https://travis-ci.com/OdunayoOkebunmi/Quick-Credit)
[![Coverage Status](https://coveralls.io/repos/github/OdunayoOkebunmi/Quick-Credit/badge.svg?branch=develop&service=github)](https://coveralls.io/github/OdunayoOkebunmi/Quick-Credit?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8bda4c876e9f0454cd65/maintainability)](https://codeclimate.com/github/OdunayoOkebunmi/Quick-Credit/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 
# Quick-Credit

> Quick Credit is an online lending platform that provides short term soft loans to individuals.

## Pivotal Tracker Stories
https://www.pivotaltracker.com/n/projects/2327029

## UI hosted on gh pages
https://odunayookebunmi.github.io/Quick-Credit/UI/index.html

## Server side hosted on Heroku
https://quick-credit-backend.herokuapp.com/

## API Documentation
https://quick-credit-odunayo.herokuapp.com/api-docs

## Table of Content
 * [Getting Started](#getting-started)

* [Prerequisites for installation](#prerequisites-for-installation)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [API End Points Test Using Postman](#api-end-points-test-using-postman)

 * [Linting Style](#linting-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)


## Getting Started

### Prerequisites for installation
1. Node js
2. Express
3. Git

### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/OdunayoOkebunmi/Quick-Credit
```
2. Install dependencies 
```
e.g npm install.
```
3. Start the application by running the dev-start script.

```
e.g npm run dev-start
```

4. Install postman to test all endpoints on port 3000.

### Test
run test using ```npm test```.

### API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>User signup</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/login</td>  <td>User signin</td></tr>

<tr><td>POST</td> <td>/api/v1/loans</td>  <td>Apply for loan</td></tr>

<tr><td>POST</td> <td>/api/v1/loans/:id/repayment</td>  <td>Post Loan Repayment Transaction</td></tr>

<tr><td>PATCH</td> <td>/api/v1/users/:email/verify</td>  <td>Verify User Status</td></tr>

<tr><td>PATCH</td> <td>/api/v1/loans/:id</td>  <td>Approve or Reject Loans</td></tr>

<tr><td>GET</td> <td>/api/v1/loans/:id/repayments</td>  <td>Get loan repayment records</td></tr>

<tr><td>GET</td> <td>/api/v1/loans</td>  <td>Get all loan appplications</td></tr>

<tr><td>GET</td> <td>/api/v1/loans?status=approved&repaid=false</td>  <td>Get all approved but not repaid loans</td></tr>

<tr><td>GET</td> <td>/api/v1/loans?status=approved&repaid=true</td>  <td>Get all approved and repaid loans</td></tr>

<tr><td>GET</td> <td>/api/v1/loans/:id</td>  <td>Specific Loans</td></tr>

 
</table>

### Linting Style
* ESLint with Airbnb style guide. 

## Features

 ### Admin
 * Admin can mark a client as verified after confirming the client’s work or home 
   address. 
 * Admin can view all loan applications. 
 * Admin can view a specific loan application. 
 * Admin can view current loans (not fully repaid). 
 * Admin can view all repaid loans. 
 * Admin can approve or reject a client’s loan application. 
 * Admin can post loan repayment transactions in favour of a client. 

 ### Users
 * A user can signup
 * A user can sign in to his/her account
 * A user can apply for a loan
 * A user can view all loan repayment history
 

## Built With
* NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.

* html5: It is used for structuring the frontend.

* css: It is used for styling the frontend.

* Vannila Javascript: It is used for scripting the client side.


## License
This project is licensed under the MIT license - see the LICENSE.md file for details.
