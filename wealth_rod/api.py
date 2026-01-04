from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

def get_data_in_btc(tickers, period="1y"):
    try:
        # Always include BTC-USD to calculate relative value
        all_tickers = list(set(tickers + ["BTC-USD"]))
        
        # Download data
        data = yf.download(all_tickers, period=period)["Close"]
        
        # Handle case where only one ticker is returned (Series vs DataFrame)
        if isinstance(data, pd.Series):
            data = data.to_frame()
            data.columns = all_tickers

        # Drop rows where BTC-USD is missing
        if "BTC-USD" not in data.columns:
            return None
            
        data = data.dropna(subset=["BTC-USD"])
        
        # Calculate value in BTC
        result = pd.DataFrame()
        btc_price = data["BTC-USD"]
        
        for ticker in tickers:
            if ticker in data.columns:
                # If ticker is BTC-USD, it's just 1.0
                if ticker == "BTC-USD":
                    result[ticker] = 1.0
                else:
                    result[ticker] = data[ticker] / btc_price
        
        # Reset index to make date a column
        result = result.reset_index()
        
        # Convert to list of dictionaries for JSON response
        # Format date as string
        output = []
        for _, row in result.iterrows():
            item = {"date": row["Date"].strftime("%Y-%m-%d")}
            for ticker in tickers:
                if ticker in row:
                    # Handle NaN values
                    val = row[ticker]
                    item[ticker] = val if pd.notna(val) else None
            output.append(item)
            
        return output
        
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

@app.route('/api/wealth-rod', methods=['GET'])
def wealth_rod():
    # Get tickers from query param, default to SPY, QQQ, DIA, GC=F
    tickers_param = request.args.get('tickers', 'SPY,QQQ,DIA,GC=F')
    tickers = [t.strip() for t in tickers_param.split(',')]
    
    period = request.args.get('period', '1y')
    
    data = get_data_in_btc(tickers, period)
    
    if data is None:
        return jsonify({"error": "Failed to fetch data"}), 500
        
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
