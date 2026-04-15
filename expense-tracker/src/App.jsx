import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0f0f0f;
    --card: #161616;
    --border: #252525;
    --border-focus: #3a3a3a;
    --text: #f0f0f0;
    --text-muted: #666;
    --text-sub: #999;
    --red: #e05555;
    --accent: #f0f0f0;
  }

  body { font-family: 'Inter', sans-serif; }

  .root {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  /* AUTH */
  .auth-card {
    width: 360px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 40px 36px;
    animation: fadeUp 0.3s ease;
  }
  .auth-logo {
    width: 32px;
    height: 32px;
    background: var(--text);
    border-radius: 6px;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .auth-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 6px;
  }
  .auth-sub {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 28px;
  }
  .field-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-sub);
    margin-bottom: 6px;
    letter-spacing: 0.02em;
  }
  .field-wrap { margin-bottom: 16px; }
  .auth-input {
    width: 100%;
    background: #1c1c1c;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.15s;
  }
  .auth-input::placeholder { color: #3d3d3d; }
  .auth-input:focus { border-color: var(--border-focus); }
  .auth-btn {
    width: 100%;
    background: var(--text);
    color: #0f0f0f;
    border: none;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 12px;
    cursor: pointer;
    margin-top: 4px;
    margin-bottom: 20px;
    transition: opacity 0.15s;
  }
  .auth-btn:hover { opacity: 0.88; }
  .auth-toggle {
    font-size: 13px;
    color: var(--text-muted);
    text-align: center;
  }
  .auth-toggle span {
    color: var(--text-sub);
    cursor: pointer;
    margin-left: 4px;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .auth-toggle span:hover { color: var(--text); }

  /* DASHBOARD LAYOUT */
  .dashboard-layout {
    width: 980px;
    display: flex;
    gap: 16px;
    animation: fadeUp 0.3s ease;
  }

  .sidebar {
    width: 260px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 22px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
  }

  .brand-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: var(--text);
    color: #0f0f0f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 15px;
  }

  .brand-text h2 {
    font-size: 15px;
    color: var(--text);
    font-weight: 600;
  }

  .brand-text p {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .side-section {
    border-top: 1px solid var(--border);
    padding-top: 16px;
  }

  .side-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  .side-stat {
    margin-bottom: 14px;
  }

  .side-stat-title {
    font-size: 12px;
    color: var(--text-sub);
    margin-bottom: 4px;
  }

  .side-stat-value {
    font-size: 22px;
    color: var(--text);
    font-weight: 300;
    letter-spacing: -0.03em;
  }

  .side-card {
    background: #1b1b1b;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px;
  }

  .side-user {
    font-size: 13px;
    color: var(--text);
    word-break: break-word;
  }

  .side-note {
    margin-top: 8px;
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .sidebar-footer {
    border-top: 1px solid var(--border);
    padding-top: 16px;
    margin-top: 18px;
  }

  .sidebar-footer p {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  /* TRACKER */
  .tracker-wrap {
    flex: 1;
    min-width: 0;
  }
  .tracker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .tracker-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
  }
  .tracker-email {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 2px;
  }
  .logout-btn {
    background: none;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-muted);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    padding: 7px 14px;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .logout-btn:hover { border-color: var(--border-focus); color: var(--text); }

  /* Total */
  .total-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px 24px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .total-label {
    font-size: 13px;
    color: var(--text-muted);
  }
  .total-count {
    font-size: 12px;
    color: #3a3a3a;
    margin-top: 2px;
  }
  .total-amount {
    font-size: 28px;
    font-weight: 300;
    color: var(--text);
    letter-spacing: -0.5px;
  }

  /* Add Row */
  .add-row {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .add-input {
    flex: 1;
    background: #1c1c1c;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    padding: 10px 12px;
    outline: none;
    transition: border-color 0.15s;
  }
  .add-input::placeholder { color: #3d3d3d; }
  .add-input:focus { border-color: var(--border-focus); }
  .add-input-amt { flex: 0 0 100px; }
  .add-btn {
    background: var(--text);
    border: none;
    border-radius: 6px;
    color: #0f0f0f;
    font-size: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.15s;
    flex-shrink: 0;
    font-weight: 300;
    line-height: 1;
  }
  .add-btn:hover { opacity: 0.85; }

  /* List */
  .list-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  .list-empty {
    padding: 32px;
    text-align: center;
    font-size: 13px;
    color: #333;
  }
  .expense-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
    transition: background 0.1s;
    animation: slideIn 0.2s ease;
  }
  .expense-item:last-child { border-bottom: none; }
  .expense-item:hover { background: #1c1c1c; }
  .expense-name {
    font-size: 14px;
    color: var(--text);
    font-weight: 400;
  }
  .expense-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .expense-amount {
    font-size: 14px;
    color: var(--text-sub);
    font-variant-numeric: tabular-nums;
  }
  .del-btn {
    background: none;
    border: none;
    color: #333;
    font-size: 18px;
    cursor: pointer;
    padding: 2px 4px;
    line-height: 1;
    transition: color 0.15s;
    display: flex;
    align-items: center;
  }
  .del-btn:hover { color: var(--red); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @media (max-width: 900px) {
    .dashboard-layout {
      width: 100%;
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
    }

    .tracker-wrap {
      width: 100%;
    }
  }
`;

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <style>{styles}</style>
      <div className="root">
        {!user ? (
          <Auth onLogin={setUser} />
        ) : (
          <ExpenseTracker user={user} onLogout={() => setUser(null)} />
        )}
      </div>
    </>
  );
}

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) return;
    onLogin({ email });
  };

  return (
    <div className="auth-card">
      <div className="auth-logo">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 5h12M2 8h8M2 11h10" stroke="#0f0f0f" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h1 className="auth-title">{isLogin ? "Welcome back" : "Create account"}</h1>
      <p className="auth-sub">{isLogin ? "Sign in to your account" : "Start tracking your expenses"}</p>

      <div className="field-wrap">
        <label className="field-label">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="auth-input"
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />
      </div>
      <div className="field-wrap">
        <label className="field-label">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="auth-input"
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />
      </div>

      <button onClick={handleSubmit} className="auth-btn">
        {isLogin ? "Sign in" : "Create account"}
      </button>

      <p className="auth-toggle">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Sign in"}
        </span>
      </p>
    </div>
  );
}

function ExpenseTracker({ user, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (!title || !amount || isNaN(parseFloat(amount))) return;
    setExpenses([...expenses, { id: Date.now(), title, amount: parseFloat(amount) }]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = id => setExpenses(expenses.filter(e => e.id !== id));
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const highest = expenses.length ? Math.max(...expenses.map(e => e.amount)) : 0;
  const average = expenses.length ? total / expenses.length : 0;

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="brand">
            <div className="brand-icon">ET</div>
            <div className="brand-text">
              <h2>Expense Tracker</h2>
              <p>Dashboard overview</p>
            </div>
          </div>

          <div className="side-section">
            <p className="side-label">Overview</p>

            <div className="side-stat">
              <p className="side-stat-title">Total Spent</p>
              <p className="side-stat-value">${total.toFixed(2)}</p>
            </div>

            <div className="side-stat">
              <p className="side-stat-title">Entries</p>
              <p className="side-stat-value">{expenses.length}</p>
            </div>

            <div className="side-stat">
              <p className="side-stat-title">Average Expense</p>
              <p className="side-stat-value">${average.toFixed(2)}</p>
            </div>

            <div className="side-stat">
              <p className="side-stat-title">Highest Expense</p>
              <p className="side-stat-value">${highest.toFixed(2)}</p>
            </div>
          </div>

          <div className="side-section">
            <p className="side-label">Account</p>
            <div className="side-card">
              <p className="side-user">{user.email}</p>
              <p className="side-note">
                Track, review, and manage your daily spending in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <p>Keep your spending simple, visible, and organized.</p>
        </div>
      </aside>

      <div className="tracker-wrap">
        <div className="tracker-header">
          <div>
            <p className="tracker-title">Expenses</p>
            <p className="tracker-email">{user.email}</p>
          </div>
          <button onClick={onLogout} className="logout-btn">Sign out</button>
        </div>

        <div className="total-card">
          <div>
            <p className="total-label">Total spent</p>
            <p className="total-count">
              {expenses.length} {expenses.length === 1 ? "item" : "items"}
            </p>
          </div>
          <span className="total-amount">${total.toFixed(2)}</span>
        </div>

        <div className="add-row">
          <input
            type="text"
            placeholder="Expense name"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="add-input"
            onKeyDown={e => e.key === "Enter" && addExpense()}
          />
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="add-input add-input-amt"
            onKeyDown={e => e.key === "Enter" && addExpense()}
          />
          <button onClick={addExpense} className="add-btn">+</button>
        </div>

        <div className="list-card">
          {expenses.length === 0
            ? <p className="list-empty">No expenses added yet</p>
            : expenses.map(exp => (
              <div key={exp.id} className="expense-item">
                <span className="expense-name">{exp.title}</span>
                <div className="expense-right">
                  <span className="expense-amount">${exp.amount.toFixed(2)}</span>
                  <button onClick={() => deleteExpense(exp.id)} className="del-btn">×</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}