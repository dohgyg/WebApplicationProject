import { useState } from "react";
import bookApi from "../api/bookApi";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    availableCopies: 1,
  });

  const submit = async (e) => {
    e.preventDefault();
    await bookApi.create(form);
    nav("/books");
  };

  return (
    <div className="form-card">
      <h2>Add New Book</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Book Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <input
          placeholder="ISBN (optional)"
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
        />

        <input
          placeholder="Published Year"
          type="number"
          value={form.publishedYear}
          onChange={(e) => setForm({ ...form, publishedYear: e.target.value })}
        />

        <input
          placeholder="Available Copies"
          type="number"
          value={form.availableCopies}
          onChange={(e) =>
            setForm({ ...form, availableCopies: Number(e.target.value) })
          }
        />

        <button className="btn-primary">Add Book</button>
      </form>
    </div>
  );
}
