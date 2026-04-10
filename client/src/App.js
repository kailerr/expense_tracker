import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);

  // form add + edit
  const [form, setForm] = useState({
    id: null,
    description: "",
    amount: "",
    category: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  // LOAD DATA
  const loadData = () => {
    fetch("http://localhost:8080/api/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ADD hoặc UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    // nếu đang edit → PUT
    if (isEditing) {
      fetch(`http://localhost:8080/api/expenses/${form.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description: form.description,
          amount: parseFloat(form.amount),
          category: form.category
        })
      })
        .then(res => res.json())
        .then(() => {
          loadData(); // reload list
          resetForm();
        });
    } else {
      // ADD → POST
      fetch("http://localhost:8080/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description: form.description,
          amount: parseFloat(form.amount),
          category: form.category
        })
      })
        .then(res => res.json())
        .then(() => {
          loadData();
          resetForm();
        });
    }
  };

  // DELETE
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "DELETE"
    }).then(() => loadData());
  };

  // CLICK EDIT
  const handleEdit = (expense) => {
    setForm({
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      category: expense.category
    });
    setIsEditing(true);
  };

  // RESET FORM
  const resetForm = () => {
    setForm({
      id: null,
      description: "",
      amount: "",
      category: ""
    });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="description"
        />
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="amount"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="category"
        />

        <button type="submit">
          {isEditing ? "Update" : "Add"}
        </button>

        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      {/* LIST */}
      {expenses.length === 0 ? (
        <p>No data yet</p>
      ) : (
        expenses.map(e => (
          <div key={e.id} style={{ marginBottom: "10px" }}>
            {e.description} - ${e.amount} ({e.category})

            {/* EDIT */}
            <button onClick={() => handleEdit(e)}>
              Edit
            </button>

            {/* DELETE */}
            <button onClick={() => handleDelete(e.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;