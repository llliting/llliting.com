import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, X, TrendingUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WealthRodApp: React.FC = () => {
    const navigate = useNavigate();
    const [tickers, setTickers] = useState<string[]>(['SPY', 'QQQ', 'DIA', 'GC=F']);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState('');

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
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
    }, [tickers]);

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
                {/* Header with Back Button */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/projects/wealth-rod')}
                        className="text-secondary/60 hover:text-accent transition-colors text-sm flex items-center gap-2 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Description
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold font-serif tracking-tight">
                        The Wealth Rod
                    </h1>
                </div>

                {/* Main Content: Sidebar + Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar - Search & Tickers */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#1a120b]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#3d2b1f]">
                            <h2 className="text-lg font-semibold mb-4">Add Tickers</h2>

                            {/* Search Form */}
                            <form onSubmit={handleAddTicker} className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        placeholder="e.g., NVDA, MSFT"
                                        className="w-full bg-[#2c1f16] border border-[#3d2b1f] rounded-lg py-3 px-4 pl-10 text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-secondary/30"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/40 w-4 h-4" />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-3 bg-accent text-[#0f0a06] rounded-lg py-2 px-4 font-semibold text-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                                    disabled={!searchInput}
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Add Ticker
                                </button>
                            </form>

                            {/* Active Tickers List */}
                            <div>
                                <h3 className="text-sm font-semibold mb-3 text-secondary/80">Active Tickers</h3>
                                <div className="space-y-2">
                                    {tickers.map((ticker, index) => (
                                        <div
                                            key={ticker}
                                            className="flex items-center justify-between bg-[#2c1f16] px-3 py-2 rounded-lg border border-[#3d2b1f] group hover:border-accent/30 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: colors[index % colors.length] }}
                                                />
                                                <span className="text-sm font-medium">{ticker}</span>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveTicker(ticker)}
                                                className="text-secondary/40 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-[#1a120b]/30 backdrop-blur-sm rounded-xl p-4 border border-[#3d2b1f]/50">
                            <p className="text-xs text-secondary/60 leading-relaxed">
                                All values are denominated in Bitcoin (BTC). Data provided by Yahoo Finance.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Chart */}
                    <div className="lg:col-span-3">
                        <div className="bg-[#1a120b]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#3d2b1f] h-[600px] relative">
                            {loading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                                </div>
                            ) : error ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 gap-2">
                                    <p>{error}</p>
                                    <p className="text-sm text-secondary/60">Run: python3 wealth_rod/api.py</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WealthRodApp;
