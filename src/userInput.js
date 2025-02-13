//import yahooFinance from "yahoo-finance2";
const data = require('./lists.json');

const yahooFinance = require('yahoo-finance2').default;
yahooFinance.suppressNotices(['yahooSurvey']);

const aaplPrice = async () => {
    let stockQuote = await yahooFinance.quote('AAPL');
    let stockPrice = stockQuote.regularMarketPrice;
    console.log(stockPrice);
    //return stockPrice;
};

// USER DETAILS
let currentAge = 25;
let retirementAge = 50;
let currentYear = new Date().getFullYear();
let retirementYear = currentYear + (retirementAge - currentAge);
let yearsLeft = retirementYear - currentYear;

// MONEY
let initialInvestment = 10000;
let monthlyDeposit = 500;

// RISK PROFILE
let riskProfile = 'Aggressive';
let riskFundWeights = data.WEIGHT[riskProfile];
let riskAllocationWeights = data.RISK[riskProfile];

// FIRM SELECTION
let firm = 'Fidelity';

// FUND TYPE
let fundType = 'Mutual Fund';

// EXPORTS
exports.yahooFinance = yahooFinance;
exports.initialInvestment = initialInvestment;
exports.firm = firm;
exports.fundType = fundType;
exports.riskFundWeights = riskFundWeights;
exports.riskAllocationWeights = riskAllocationWeights;