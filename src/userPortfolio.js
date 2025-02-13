const data = require("./lists.json");
const {
  yahooFinance,
  initialInvestment,
  firm,
  fundType,
  riskFundWeights,
  riskAllocationWeights,
} = require("./userInput");
yahooFinance.suppressNotices(["ripHistorical"]);

// FUND LIST
let largeCapFund = data.FUNDS[firm]["US Stock"]["Large Cap"][fundType];
let smallCapFund = data.FUNDS[firm]["US Stock"]["Small Cap"][fundType];
let internationalFund =
  data.FUNDS[firm]["International Stock"]["Total International Market"][
    fundType
  ];
let bondFund = data.FUNDS[firm]["Bond"]["Total US Market"][fundType];

const fundsArray = [largeCapFund, smallCapFund, internationalFund, bondFund];

// ASSET ALLOCATION
let stockAllocation =
  riskAllocationWeights["US Stock"] +
  riskAllocationWeights["International Stock"];
let bondAllocation = riskAllocationWeights["Bond"];
let cashAllocation = riskAllocationWeights["Cash"];

const portAllocation = () => {
  return [
    `Stock: $${initialInvestment * stockAllocation} (${(stockAllocation * 100).toFixed(0)}%)`,
    `Bond: $${initialInvestment * bondAllocation} (${(bondAllocation * 100).toFixed(0)}%)`,
    `Cash: $${initialInvestment * cashAllocation} (${(cashAllocation * 100).toFixed(0)}%)`,
  ];
};

// FUND BREAKDOWN
let largeCapAmt =
  initialInvestment * riskFundWeights["US Stock"]["US Large Cap"];
let smallCapAmt =
  initialInvestment * riskFundWeights["US Stock"]["US Small Cap"];
let internationalAmt =
  initialInvestment *
  riskFundWeights["International Stock"]["Total International Market"];
let bondAmt =
  initialInvestment * riskFundWeights["Bond"]["Total US Bond Market"];
let cashAmt = initialInvestment * riskFundWeights["Cash"]["CASH"];

const portFunds = () => {
  return [
    `US Large Cap Stock (${largeCapFund}): $${largeCapAmt}`,
    `US Small Cap Stock (${smallCapFund}): $${smallCapAmt}`,
    `International Stock (${internationalFund}): $${internationalAmt}`,
    `Bond (${bondFund}): $${bondAmt}`,
    `Cash: $${cashAmt}`,
  ];
};

// PORTFOLIO HISTORIC PERFORMANCE
const today = new Date();
const currDate = `${
  today.getMonth() + 1
}/${today.getDate()}/${today.getFullYear()}`;
const currentYear = new Date().getFullYear();
const periodYTD = new Date(currentYear, 0, 1);
const periodOneYear = `${today.getMonth() + 1}/${today.getDate()}/${
  today.getFullYear() - 1
}`;
const periodFiveYears = `${today.getMonth() + 1}/${today.getDate()}/${
  today.getFullYear() - 5
}`;
const periodTenYears = `${today.getMonth() + 1}/${today.getDate()}/${
  today.getFullYear() - 10
}`;

const periodList = {
  ytd: { period1: periodYTD, period2: currDate },
  "1y": { period1: periodOneYear, period2: currDate },
  "5y": { period1: periodFiveYears, period2: today },
  "10y": { period1: periodTenYears, period2: today },
  max: { period1: "1900-01-01", period2: today },
};

// YTD RETURNS
const largeCapReturnYTD = async () => {
  let returnData = await yahooFinance.historical(
    largeCapFund,
    periodList["ytd"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const smallCapReturnYTD = async () => {
  let returnData = await yahooFinance.historical(
    smallCapFund,
    periodList["ytd"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const internationalReturnYTD = async () => {
  let returnData = await yahooFinance.historical(
    internationalFund,
    periodList["ytd"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const bondReturnYTD = async () => {
  let returnData = await yahooFinance.historical(bondFund, periodList["ytd"]);
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

// YTD PORTFOLIO RETURN
const portReturnYTD = async () => {
  const largeCapReturn = await largeCapReturnYTD();
  const smallCapReturn = await smallCapReturnYTD();
  const internationalReturn = await internationalReturnYTD();
  const bondReturn = await bondReturnYTD();
  const portReturnCalc = ((largeCapReturn * riskFundWeights["US Stock"]["US Large Cap"]) + (smallCapReturn * riskFundWeights["US Stock"]["US Small Cap"]) + (internationalReturn * riskFundWeights["International Stock"]["Total International Market"]) + (bondReturn * riskFundWeights["Bond"]["Total US Bond Market"])).toFixed(2);
  //console.log(largeCapReturn, smallCapReturn, internationalReturn, bondReturn);
  return portReturnCalc;
};

// 1Y RETURNS
const largeCapReturn1Y = async () => {
  let returnData = await yahooFinance.historical(
    largeCapFund,
    periodList["1y"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const smallCapReturn1Y = async () => {
  let returnData = await yahooFinance.historical(
    smallCapFund,
    periodList["1y"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const internationalReturn1Y = async () => {
  let returnData = await yahooFinance.historical(
    internationalFund,
    periodList["1y"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const bondReturn1Y = async () => {
  let returnData = await yahooFinance.historical(bondFund, periodList["1y"]);
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

// 1Y PORTFOLIO RETURN
const portReturn1Y = async () => {
  const largeCapReturn = await largeCapReturn1Y();
  const smallCapReturn = await smallCapReturn1Y();
  const internationalReturn = await internationalReturn1Y();
  const bondReturn = await bondReturn1Y();
  const portReturnCalc = ((largeCapReturn * riskFundWeights["US Stock"]["US Large Cap"]) + (smallCapReturn * riskFundWeights["US Stock"]["US Small Cap"]) + (internationalReturn * riskFundWeights["International Stock"]["Total International Market"]) + (bondReturn * riskFundWeights["Bond"]["Total US Bond Market"])).toFixed(2);
  //console.log(largeCapReturn, smallCapReturn, internationalReturn, bondReturn);
  return portReturnCalc;
};

// 5Y RETURNS
const largeCapReturn5Y = async () => {
  let returnData = await yahooFinance.historical(
    largeCapFund,
    periodList["5y"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const smallCapReturn5Y = async () => {
  let returnData = await yahooFinance.historical(
    smallCapFund,
    periodList["5y"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const internationalReturn5Y = async () => {
  let returnData = await yahooFinance.historical(
    internationalFund,
    periodList["5y"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const bondReturn5Y = async () => {
  let returnData = await yahooFinance.historical(bondFund, periodList["5y"]);
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

// 5Y PORTFOLIO RETURN
const portReturn5Y = async () => {
  const largeCapReturn = await largeCapReturn5Y();
  const smallCapReturn = await smallCapReturn5Y();
  const internationalReturn = await internationalReturn5Y();
  const bondReturn = await bondReturn5Y();
  const portReturnCalc = ((largeCapReturn * riskFundWeights["US Stock"]["US Large Cap"]) + (smallCapReturn * riskFundWeights["US Stock"]["US Small Cap"]) + (internationalReturn * riskFundWeights["International Stock"]["Total International Market"]) + (bondReturn * riskFundWeights["Bond"]["Total US Bond Market"])).toFixed(2);
  //console.log(largeCapReturn, smallCapReturn, internationalReturn, bondReturn);
  return portReturnCalc;
};

// 10Y RETURNS
const largeCapReturn10Y = async () => {
  let returnData = await yahooFinance.historical(
    largeCapFund,
    periodList["10y"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const smallCapReturn10Y = async () => {
  let returnData = await yahooFinance.historical(
    smallCapFund,
    periodList["10y"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const internationalReturn10Y = async () => {
  let returnData = await yahooFinance.historical(
    internationalFund,
    periodList["10y"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const bondReturn10Y = async () => {
  let returnData = await yahooFinance.historical(bondFund, periodList["10y"]);
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

// 10Y PORTFOLIO RETURN
const portReturn10Y = async () => {
  const largeCapReturn = await largeCapReturn10Y();
  const smallCapReturn = await smallCapReturn10Y();
  const internationalReturn = await internationalReturn10Y();
  const bondReturn = await bondReturn10Y();
  const portReturnCalc = ((largeCapReturn * riskFundWeights["US Stock"]["US Large Cap"]) + (smallCapReturn * riskFundWeights["US Stock"]["US Small Cap"]) + (internationalReturn * riskFundWeights["International Stock"]["Total International Market"]) + (bondReturn * riskFundWeights["Bond"]["Total US Bond Market"])).toFixed(2);
  //console.log(largeCapReturn, smallCapReturn, internationalReturn, bondReturn);
  return portReturnCalc;
};

// MAX RETURNS
const largeCapReturnMAX = async () => {
  let returnData = await yahooFinance.historical(
    largeCapFund,
    periodList["max"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const smallCapReturnMAX = async () => {
  let returnData = await yahooFinance.historical(
    smallCapFund,
    periodList["max"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const internationalReturnMAX = async () => {
  let returnData = await yahooFinance.historical(
    internationalFund,
    periodList["max"]
  );
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

const bondReturnMAX = async () => {
  let returnData = await yahooFinance.historical(bondFund, periodList["max"]);
  let returnBegin = returnData[0]["open"].toFixed(2);
  let returnEnd = returnData[returnData.length - 1]["adjClose"].toFixed(2);
  let returnPercentage = (
    ((returnEnd - returnBegin) / returnBegin) *
    100
  ).toFixed(2);
  return returnPercentage;
};

// MAX PORTFOLIO RETURN
const portReturnMAX = async () => {
  const largeCapReturn = await largeCapReturnMAX();
  const smallCapReturn = await smallCapReturnMAX();
  const internationalReturn = await internationalReturnMAX();
  const bondReturn = await bondReturnMAX();
  const portReturnCalc = ((largeCapReturn * riskFundWeights["US Stock"]["US Large Cap"]) + (smallCapReturn * riskFundWeights["US Stock"]["US Small Cap"]) + (internationalReturn * riskFundWeights["International Stock"]["Total International Market"]) + (bondReturn * riskFundWeights["Bond"]["Total US Bond Market"])).toFixed(2);
  //console.log(largeCapReturn, smallCapReturn, internationalReturn, bondReturn);
  return portReturnCalc;
};


// PROGRAM
(async () => {
  try {
    console.log(portAllocation());
    console.log(portFunds());
    console.log('Generating report...');
    const printPortReturnYTD = await portReturnYTD();
    const printPortReturn1Y = await portReturn1Y();
    const printPortReturn5Y = await portReturn5Y();
    const printPortReturn10Y = await portReturn10Y();
    const printPortReturnMAX = await portReturnMAX();
    console.log('YTD Return:', printPortReturnYTD);
    console.log('1Y Return:', printPortReturn1Y);
    console.log('5Y Return:', printPortReturn5Y);
    console.log('10Y Return:', printPortReturn10Y);
    console.log('MAX Return:', printPortReturnMAX);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
