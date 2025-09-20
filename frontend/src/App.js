import React, { useState, useEffect, useRef } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const inputRef = useRef(null);
  const API_URL = "http://localhost:8000/todos";

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch(() => alert("Gagal mengambil data dari server"))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, done: false }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setTitle("");
      inputRef.current.focus();
    } catch {
      alert("Gagal menambahkan todo");
    }
  };

  const toggleTodo = async (id, done) => {
    const todo = todos.find((t) => t.id === id);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: todo.title, done }),
      });
      const updated = await res.json();
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch {
      alert("Gagal memperbarui todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((t) => t.id !== id));
    } catch {
      alert("Gagal menghapus todo");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "notdone") return !todo.done;
    return true;
  });

  const total = todos.length;
  const selesai = todos.filter((t) => t.done).length;
  const belum = total - selesai;
  const progress = total > 0 ? Math.round((selesai / total) * 100) : 0;

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">📋 Todo App</h1>
        <button
          className="mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>

      <form onSubmit={addTodo} className="d-flex mb-4">
        <input
          ref={inputRef}
          type="text"
          autoFocus
          className="form-control me-2"
          placeholder="Tulis todo baru..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary">Tambah</button>
      </form>

      <div className="d-flex justify-content-center mb-3">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Semua
        </button>
        <button
          className={`filter-btn ${filter === "notdone" ? "active" : ""}`}
          onClick={() => setFilter("notdone")}
        >
          Belum
        </button>
        <button
          className={`filter-btn ${filter === "done" ? "active" : ""}`}
          onClick={() => setFilter("done")}
        >
          Selesai
        </button>
      </div>

      <p className="text-center text-muted mb-1">
        🔹 Total: {total} | ⏳ Belum: {belum} | ✅ Selesai: {selesai}
      </p>

      <div className="progress mb-4" style={{ height: "22px" }}>
        <div
          className={`progress-bar progress-bar-striped progress-bar-animated ${
            progress === 100 ? "bg-success" : "bg-info"
          }`}
          role="progressbar"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
      {progress === 100 && (
        <p className="text-center text-success fw-bold">
          🎉 Semua tugas selesai!
        </p>
      )}

      {loading ? (
        <p className="text-center">⏳ Memuat data...</p>
      ) : filteredTodos.length === 0 ? (
        <p className="text-center text-muted">Tidak ada todo sesuai filter</p>
      ) : (
        <ul className="list-group shadow-sm">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
