var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contractParams = require("./contractABI_Address");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Added below code is for sending signed transaction..!!
const Web3 = require('web3'); 
var Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

console.log("print1: " + contractParams.STOCK_ORACLE_ABI);
console.log("print2: " + contractParams.STOCK_ORACLE_ADDRESS);

var TestContract = new web3.eth.Contract(contractParams.STOCK_ORACLE_ABI, contractParams.STOCK_ORACLE_ADDRESS);
// var Test = TestContract.at(contractParams.STOCK_ORACLE_ADDRESS);

// Account used as "from" address for sending the transaction
var account = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1";
var privateKey = new Buffer.from("4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d", "hex");

//  Creating the raw transaction
var rawTx = {
  nonce: web3.utils.toHex(17),
  gas: "0x470000",
  to: contractParams.STOCK_ORACLE_ADDRESS,
  value: '0x00',
  data: TestContract.methods.setStock(web3.utils.fromAscii("Lab4"), 18, 214).encodeABI()
}

var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();

// sending signed transaction
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), {from : account})
.on('receipt', console.log);


module.exports = app;
