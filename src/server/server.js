const express = require("express");
const yahooFinance = require("yahoo-finance2").default;
yahooFinance.suppressNotices(["yahooSurvey"]);
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

// DYNAMIC SYMBOLS
app.get("/api/stockPrices", async (req, res) => {
  try {
    // Extract symbols from the query parameters
    const symbols = req.query.symbols
      ? req.query.symbols.split(",")
      : ["AAPL", "NVDA", "F", "NFLX"];

    if (!symbols.length) {
      return res.status(400).json({ error: "No symbols provided" });
    }

    // Fetch data for multiple symbols
    const stockQuotes = await yahooFinance.quote(symbols);

    // Extract relevant data from the response
    const stockPrices = stockQuotes.map((quote) => ({
      symbol: quote.symbol,
      price: quote.regularMarketPrice.toFixed(2),
    }));

    // Return the stock prices as JSON
    res.json(stockPrices);
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ error: "Failed to fetch stock prices" });
  }
});

// New route for fetching historical stock prices
app.get("/api/stockPrices/historical", async (req, res) => {
  try {
    // Extract symbols from the query parameters
    const symbols = req.query.symbols
      ? req.query.symbols.split(",")
      : ["AAPL", "NVDA", "F", "NFLX"];

    if (!symbols.length) {
      return res.status(400).json({ error: "No symbols provided" });
    }

    // Fetch chart data for each symbol - Switched from .historical() to .chart() 7/22/25
    const stockDataPromises = symbols.map((symbol) =>
      yahooFinance.chart(symbol, {
        period1: "1900-01-01",
        interval: "1mo",
      })
    );
    const stockData = await Promise.all(stockDataPromises);

    res.json(stockData);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Failed to fetch stock data." });
  }
});

app.get("/api/stockPrices/insights", async (req, res) => {
  try {
    // Extract symbols from the query parameters
    const symbols = req.query.symbols
      ? req.query.symbols.split(",")
      : ["AAPL", "NVDA", "F", "NFLX"];

    if (!symbols.length) {
      return res.status(400).json({ error: "No symbols provided" });
    }

    // Fetch chart data for each symbol
    const stockDataPromises = symbols.map((symbol) =>
      yahooFinance.quote(symbol)
    );
    const stockData = await Promise.all(stockDataPromises);

    res.json(stockData);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Failed to fetch stock data." });
  }
});

// Start the server
/* app.listen(port, process.env.VITE_SERVER_IP, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 */
app.listen(port, () => {
  console.log(`Server running at netlify: ${port}`);
});