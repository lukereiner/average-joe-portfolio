const express = require('express');
const yahooFinance = require('yahoo-finance2');

const app = express();
const port = 3001;

app.get('/api/stockPrices', async (req, res) => {
    try {
        /* const stockPriceData = await yahooFinance.quote({
            symbols: ['AAPL'], 
        }); */

        // res.json(stockPriceData);

        res.json({message: "hello from express!"})
    } catch(error) {
        console.error("Error fetching data", error);

        res.status(500).json({error: "Failed to fetch stock prices"});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
