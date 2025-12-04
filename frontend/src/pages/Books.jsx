import { useEffect, useState, useContext } from "react";
import bookApi from "../api/bookApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Books() {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  const load = () => {
    bookApi.getAll().then((res) => setBooks(res.data));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete this book?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6c63ff",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    background: "#ffffff",
    customClass: {
      popup: "rounded-4",
      confirmButton: "rounded-3",
      cancelButton: "rounded-3",
    }
  });

  if (!result.isConfirmed) return;

  try {
    await bookApi.delete(id);

    Swal.fire({
      title: "Deleted!",
      text: "The book was deleted successfully.",
      icon: "success",
      confirmButtonColor: "#6c63ff"
    });

    load();
  } catch (error) {
    if (error.response && error.response.status === 403) {

      Swal.fire({
        title: "Not Allowed",
        text: error.response.data.message,
        icon: "error",
        confirmButtonColor: "#6c63ff",
      });

    } else {
      Swal.fire({
        title: "Error",
        text: "Could not delete the book.",
        icon: "error",
        confirmButtonColor: "#6c63ff",
      });
    }
  }
};


  return (
    <div className="book-container">
      <h2>Library Books</h2>

      {books.map((b) => (
        <div className="book-card" key={b._id}>
          <div className="book-title">{b.title}</div>

          <div className="book-actions">
            {user && (
              <>
                <Link to={`/edit-book/${b._id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(b._id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
