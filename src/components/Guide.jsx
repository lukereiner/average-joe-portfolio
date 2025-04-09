import React from "react";
import { Link } from "react-router-dom";
import "./Guide.css";

const Guide = () => {
  return (
    <div>
      <div className="guideCSS">
        <div className="guideAge">
          <h2>Age</h2>
          <h3>Current Age #️⃣</h3>
          <p>Your current age</p>
          <h3>Retire Age 👴</h3>
          <p>The age you want to retire at</p>
        </div>
        <div className="guideFunding">
          <h2>Funding</h2>
          <h3>Initial Deposit 💰</h3>
          <p>Amount you'll invest on day 1 (all at once)</p>
          <h3>Monthly Deposit 💵</h3>
          <p>Amount you will deposit to invest each month</p>
          <h3>Firm 🏦</h3>
          <p>
            To make the portfolio structure simple, there are three firms
            (Schwab, Fidelity, & Vanguard) where you may have an account, or
            would typically choose from those family of funds. These three offer
            the lowest fees
          </p>
          <h3>Account 🔒</h3>
          <p>
            Investment account type (401k, IRA, Brokerage) to show yearly
            deposit maximums
          </p>
        </div>
        <div className="guideRisk">
          <h2>Risk</h2>
          <h3>Risk tolerance ⚠️</h3>
          <p>
            <strong>Conservative</strong> being the least risky, or safest, option. This will
            result in lower potential returns</p>
            <p>
                <strong>Aggressive</strong> being the most risky,
            which has potential for the highest returns</p>
            <p>
                Move the slider and
            read the description to set what your risk profile is as an
            investor
          </p>
        </div>
        <div className="guidePortfolio">
          <h2>Generated Portfolio</h2>
          <h3>Investment Funds 💼</h3>
          <p>
            Your portfolio will consist of large, small, and international
            companies, and depending on risk profile, bonds and cash
          </p>
          <p>
            Investing in large, small, and international stock will be the
            primary drivers for growth, while bonds and cash are typically used
            for hedging against stock market drops, or for safety
          </p>
          <p>
            Each fund has a ticker in parentheses, along with how much you'd
            allocate your initial and monthly deposits towards. <strong>The ticker is what you would search when buying shares</strong>
          </p>
          <h3>Average Return 📈</h3>
          <p>
            Historic average return based on the firm (Schwab, Fidelity, &
            Vanguard) and risk profile
          </p>
          <h3>Estimated Value 💸</h3>
          <p>
            The final value of your portfolio at retirement, based on historical
            returns and your risk profile
          </p>
          <p>
            This number accounts for fund fees and yearly inflation of 3%
          </p>
          <p>
            At retirement age, your portfolio value will be larger, but the estimated
            value shows your purchasing power in today's dollars
          </p>
        </div>
        <div className="guideDisclaimer">
        🛑 Currently, this tool doesn't take into consideration tapering off
            into safer investments in later years or dividend reinvestment 🛑
        </div>
      </div>
      <Link to="/age">
        <div className="button" id="buttonGuide">
          <div className="startButtonLabel">Get Started</div>
        </div>
      </Link>
    </div>
  );
};

export default Guide;
