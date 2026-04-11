import { useEffect, useState } from "react";

function App() 
{
  // store all expenses
  const [expenses, setExpenses] = useState([]);

  // form data (used for add and edit)
  const [form, setForm] = useState
  ({
    id: null,
    description: "",
    amount: "",
    category: ""
  });

  // check if we are editing
  const [isEditing, setIsEditing] = useState(false);

  // get data from backend
  const loadData = () => 
  {
    fetch("http://localhost:8080/api/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data));
  };

  // run once when page loads
  useEffect(() => 
  {
      loadData();
  }, []);

  // update form when user types
  const handleChange = (e) => 
    {
      setForm(
        {
          ...form,
          [e.target.name]: e.target.value
        });
    };

  // handle submit (add or update)
  const handleSubmit = (e) => 
  {
    e.preventDefault();

    // if editing → update
    if (isEditing) 
    {
      fetch(`http://localhost:8080/api/expenses/${form.id}`, 
      {
        method: "PUT",
        headers: 
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
        {
          description: form.description,
          amount: parseFloat(form.amount),
          category: form.category
        })
      })

      .then(res => res.json())
      .then(() => {
        loadData();   // reload data
        resetForm();  // clear form
      });

    } 
    else 
    {
      // add new expense
      fetch("http://localhost:8080/api/expenses", 
      {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
        {
          description: form.description,
          amount: parseFloat(form.amount),
          category: form.category
        })
      })
        .then(res => res.json())
        .then(() => 
        {
          loadData();
          resetForm();
        });
    }
  };

  // delete an expense
  const handleDelete = (id) => 
  {
    fetch(`http://localhost:8080/api/expenses/${id}`, 
    {
      method: "DELETE"
    })
    .then(() => loadData());
  };

  // click edit -> fill form with data
  const handleEdit = (expense) => 
  {
    setForm(
    {
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      category: expense.category
    });
    setIsEditing(true);
  };

  // reset form
  const resetForm = () => 
  {
    setForm(
    {
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

      {/* form */}
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

        {/* cancel edit */}
        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      {/* list */}
      {expenses.length === 0 ? (
        <p>No data yet</p>
      ) : (
        expenses.map(e => (
          <div key={e.id} style={{ marginBottom: "10px" }}>
            {e.description} - ${e.amount} ({e.category})

            {/* edit button */}
            <button onClick={() => handleEdit(e)}>
              Edit
            </button>

            {/* delete button */}
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