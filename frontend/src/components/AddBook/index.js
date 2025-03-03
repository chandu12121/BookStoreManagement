import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const AddBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookToEdit = location.state?.bookData || null;

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookToEdit) {
      setBook({
        title: bookToEdit.title,
        author: bookToEdit.author,
        price: bookToEdit.price,
        imageUrl: bookToEdit.imageUrl || "",
        _id: bookToEdit._id,
      });
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookData = { ...book };

      if (book._id) {
        await axios.put(`http://localhost:5004/${book._id}`, bookData);
        alert("Book updated successfully!");
      } else {
        await axios.post("http://localhost:5004/", bookData);
        alert("Book added successfully!");
      }
      navigate("/");
    } catch (error) {
      alert("Failed to save book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mg-container">
      <div className="add-book-container">
        <h2 className="title">{book._id ? "Edit Book" : "Add Book"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
          <input type="text" name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
          <input type="number" name="price" value={book.price} onChange={handleChange} placeholder="Price" required />
          <input type="text" name="imageUrl" value={book.imageUrl} onChange={handleChange} placeholder="Image URL" required />
          {book.imageUrl && (
            <img src={book.imageUrl} alt="Book Preview" className="image-preview" onError={(e) => (e.target.style.display = "none")} />
          )}

          <button type="submit" className="add-button" disabled={loading}>
            {loading ? "Saving..." : book._id ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
