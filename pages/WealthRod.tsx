import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, X, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WealthRod: React.FC = () => {
    const navigate = useNavigate();
    const [tickers, setTickers] = useState<string[]>(['SPY', 'QQQ', 'DIA', 'GC=F']);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState('');

    const [showGraph, setShowGraph] = useState(false);

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        if (!showGraph) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const tickerString = tickers.join(',');
                const response = await fetch(`http://localhost:5000/api/wealth-rod?tickers=${tickerString}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError('Error fetching data. Make sure the Python backend is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tickers, showGraph]);

    const handleAddTicker = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput && !tickers.includes(searchInput.toUpperCase())) {
            setTickers([...tickers, searchInput.toUpperCase()]);
            setSearchInput('');
        }
    };

    const handleRemoveTicker = (tickerToRemove: string) => {
        setTickers(tickers.filter(t => t !== tickerToRemove));
    };

    return (
        <div className="min-h-screen bg-[#0f0a06] text-primary p-8 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif tracking-tight">
                        The Wealth Rod
                    </h1>
                    <p className="text-xl text-secondary/60 max-w-2xl mx-auto mb-8">
                        An Alternative Lens: Evaluating Value Beyond the State Standard
                    </p>
                </div>

                {!showGraph ? (
                    <div className="max-w-3xl mx-auto space-y-6 text-lg text-secondary/80 leading-relaxed">
                        <p>
                            In a world of fiat currency, prices are often distorted by inflation and monetary policy. The "Wealth Rod" offers a different perspective by measuring the value of assets against Bitcoin—the hardest, most scarce asset known to humanity.
                        </p>
                        <p>
                            By denominating stocks, commodities, and indices in Bitcoin terms, we strip away the noise of devaluing currencies and reveal the true performance of these assets. This lens exposes whether an asset is truly gaining value or merely keeping pace with the printing press.
                        </p>
                        <p>
                            Click the button below to explore the live data and see for yourself how the world's major assets perform when measured against the digital gold standard.
                        </p>

                        <div className="flex justify-center pt-8">
                            <button
                                onClick={() => navigate('/wealth-rod/app')}
                                className="bg-accent text-[#0f0a06] px-8 py-3 rounded-full font-bold text-lg hover:bg-accent/90 transition-all transform hover:scale-105 flex items-center gap-2"
                            >
                                <TrendingUp className="w-5 h-5" />
                                Launch Wealth Rod
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={() => setShowGraph(false)}
                                className="text-secondary/40 hover:text-accent transition-colors text-sm flex items-center gap-1"
                            >
                                ← Back to Description
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto mb-12">
                            <form onSubmit={handleAddTicker} className="relative">
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Add ticker (e.g., NVDA, MSFT)..."
                                    className="w-full bg-[#1a120b] border border-[#3d2b1f] rounded-full py-4 px-6 pl-12 text-lg focus:outline-none focus:border-accent/50 transition-colors placeholder:text-secondary/30"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary/40 w-5 h-5" />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent text-[#0f0a06] rounded-full p-2 hover:bg-accent/90 transition-colors"
                                    disabled={!searchInput}
                                >
                                    <TrendingUp className="w-5 h-5" />
                                </button>
                            </form>

                            {/* Active Tickers */}
                            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                {tickers.map((ticker) => (
                                    <div
                                        key={ticker}
                                        className="flex items-center gap-2 bg-[#2c1f16] px-3 py-1 rounded-full text-sm border border-[#3d2b1f]"
                                    >
                                        <span>{ticker}</span>
                                        <button
                                            onClick={() => handleRemoveTicker(ticker)}
                                            className="text-secondary/40 hover:text-red-400 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-[#1a120b]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#3d2b1f] h-[600px] relative">
                            {loading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                                </div>
                            ) : error ? (
                                <div className="absolute inset-0 flex items-center justify-center text-red-400">
                                    {error}
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#3d2b1f" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#8c7b70"
                                            tick={{ fill: '#8c7b70' }}
                                            tickFormatter={(value) => {
                                                const date = new Date(value);
                                                return `${date.getMonth() + 1}/${date.getDate()}`;
                                            }}
                                        />
                                        <YAxis
                                            stroke="#8c7b70"
                                            tick={{ fill: '#8c7b70' }}
                                            domain={['auto', 'auto']}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1a120b', borderColor: '#3d2b1f', color: '#e6dccf' }}
                                            itemStyle={{ color: '#e6dccf' }}
                                        />
                                        <Legend />
                                        {tickers.map((ticker, index) => (
                                            <Line
                                                key={ticker}
                                                type="monotone"
                                                dataKey={ticker}
                                                stroke={colors[index % colors.length]}
                                                strokeWidth={2}
                                                dot={false}
                                                activeDot={{ r: 6 }}
                                            />
                                        ))}
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        <div className="mt-6 text-center text-sm text-secondary/40">
                            * All values are denominated in Bitcoin (BTC). Data provided by Yahoo Finance.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WealthRod;
