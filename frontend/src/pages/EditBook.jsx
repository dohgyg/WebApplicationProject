import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookApi from "../api/bookApi";
import Swal from "sweetalert2";

export default function EditBook() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    availableCopies: 1,
  });

  useEffect(() => {
    bookApi.getById(id).then((res) => {
      const data = res.data;
      setForm({
        title: data.title || "",
        author: data.author || "",
        isbn: data.isbn || "",
        publishedYear: data.publishedYear || "",
        availableCopies: data.availableCopies || 1,
      });
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await bookApi.update(id, form);

      Swal.fire({
        title: "Updated!",
        text: "Book updated successfully.",
        icon: "success",
        confirmButtonColor: "#6c63ff"
      });

      nav("/books");

    } catch (error) {
      if (error.response && error.response.status === 403) {
        Swal.fire({
          title: "Not Allowed",
          text: "It's not your book. You are not the owner.",
          icon: "error",
          confirmButtonColor: "#6c63ff"
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Could not update book.",
          icon: "error",
          confirmButtonColor: "#6c63ff"
        });
      }
    }
  };

  return (
    <div className="form-card">
      <h2>Edit Book</h2>

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

        <button className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
