import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from 'react-icons/fa';
import "./index.css";

const BooksList = ({ searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5004/search?query=${searchQuery}`);
        setBooks(data);
      } catch (error) {
        setError("Failed to load books. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery]);


  const onEditBook = (book) => {
    navigate("/add", { state: { bookData: book } });
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:5004/${id}`);
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      } catch (error) {
        alert("Error deleting book. Please try again.");
      }
    }
  };



  if (loading) return <p className="loading-text">Loading books...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="main-container">
      <div className="book-list-container">
        {books.length === 0 ? (
          <p className="no-books">No books available.</p>
        ) : (
          <ul className="book-list">
            {books.map((book) => (
              <li key={book._id} className="book-item">
                <div className="book-details">
                  <div className="book-image">
                    <img
                      src={book.imageUrl}
                      alt="Book"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>

                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="book-price">
                    <strong>Price:</strong> ${book.price}
                  </p>
                  <p className="book-date">
                    <strong>Added On:</strong>{" "}
                    {new Date(book.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="book-actions">
                  <button
                    onClick={() => onEditBook(book)}
                    className="edit-button"
                  >
                    <FaEdit/>Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="delete-button"
                  >
                    <FaTrash/> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BooksList;
