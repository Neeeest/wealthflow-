import { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Bitcoin, Image, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Dati di esempio per il portfolio
  const portfolioData = [
    { month: 'Gen', value: 45000 },
    { month: 'Feb', value: 52000 },
    { month: 'Mar', value: 48000 },
    { month: 'Apr', value: 61000 },
    { month: 'Mag', value: 65000 },
    { month: 'Giu', value: 72000 },
  ];

  const assetDistribution = [
    { name: 'Risparmi', value: 30000, color: '#3b82f6' },
    { name: 'Azioni', value: 25000, color: '#10b981' },
    { name: 'Crypto', value: 12000, color: '#f59e0b' },
    { name: 'NFT', value: 5000, color: '#8b5cf6' },
  ];

  const transactions = [
    { id: 1, type: 'income', description: 'Stipendio', amount: 3500, date: '01/12/2025' },
    { id: 2, type: 'expense', description: 'Affitto', amount: -800, date: '02/12/2025' },
    { id: 3, type: 'income', description: 'Dividendi azioni', amount: 250, date: '03/12/2025' },
    { id: 4, type: 'expense', description: 'Spesa alimentare', amount: -320, date: '04/12/2025' },
    { id: 5, type: 'income', description: 'Vendita NFT', amount: 1200, date: '05/12/2025' },
  ];

  const totalAssets = assetDistribution.reduce((sum, asset) => sum + asset.value, 0);
  const monthlyIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));
  const netIncome = monthlyIncome - monthlyExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wallet className="h-8 w-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">WealthFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Aggiungi Transazione
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards Statistiche */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Patrimonio Totale"
            value={`€${totalAssets.toLocaleString()}`}
            change="+12.5%"
            icon={<DollarSign className="h-6 w-6" />}
            positive={true}
          />
          <StatCard
            title="Entrate Mensili"
            value={`€${monthlyIncome.toLocaleString()}`}
            change="+8.2%"
            icon={<TrendingUp className="h-6 w-6" />}
            positive={true}
          />
          <StatCard
            title="Uscite Mensili"
            value={`€${monthlyExpenses.toLocaleString()}`}
            change="-3.1%"
            icon={<TrendingDown className="h-6 w-6" />}
            positive={true}
          />
          <StatCard
            title="Bilancio Netto"
            value={`€${netIncome.toLocaleString()}`}
            change="+15.7%"
            icon={<PieChart className="h-6 w-6" />}
            positive={netIncome > 0}
          />
        </div>

        {/* Grafici */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Grafico Andamento Portfolio */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Andamento Portfolio</h2>
              <div className="flex space-x-2">
                {['week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      selectedPeriod === period
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {period === 'week' ? 'Settimana' : period === 'month' ? 'Mese' : 'Anno'}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Distribuzione Asset */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-6">Distribuzione Asset</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={assetDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {assetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px' }}
                />
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {assetDistribution.map((asset) => (
                <div key={asset.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                    <span className="text-sm text-slate-300">{asset.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">€{asset.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assets Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AssetCard
            title="Risparmi"
            value="€30,000"
            change="+5.2%"
            icon={<DollarSign className="h-8 w-8" />}
            color="blue"
          />
          <AssetCard
            title="Azioni"
            value="€25,000"
            change="+12.8%"
            icon={<TrendingUp className="h-8 w-8" />}
            color="green"
          />
          <AssetCard
            title="Crypto"
            value="€12,000"
            change="-3.4%"
            icon={<Bitcoin className="h-8 w-8" />}
            color="orange"
          />
          <AssetCard
            title="NFT"
            value="€5,000"
            change="+24.1%"
            icon={<Image className="h-8 w-8" />}
            color="purple"
          />
        </div>

        {/* Transazioni Recenti */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-6">Transazioni Recenti</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="h-5 w-5 text-green-400" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-sm text-slate-400">{transaction.date}</p>
                  </div>
                </div>
                <span className={`text-lg font-semibold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : ''}€{Math.abs(transaction.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, change, icon, positive }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-400">{icon}</div>
        <span className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-slate-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function AssetCard({ title, value, change, icon, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 text-white hover:scale-105 transition-transform cursor-pointer`}>
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">
          {change}
        </span>
      </div>
      <h3 className="text-sm opacity-90 mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default App;
