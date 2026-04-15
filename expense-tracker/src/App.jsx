import React, { useState } from "react";
import Auth from "./components/Auth";
import ExpenseTracker from "./components/ExpenseTracker";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
      {!user ? (
        <Auth onLogin={setUser} />
      ) : (
        <ExpenseTracker user={user} onLogout={() => setUser(null)} />
      )}
    </div>
  );
}