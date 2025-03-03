import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import "./index.css";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="header">
      <h1 onClick={() => navigate("/")} className="logo">📚 Bookstore</h1>
      <div className="add-search">
      
      <form onSubmit={handleSearch} >
        <div className="search-forms">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-inputs"
        />
        <button type="submit" className="search-buttons"> <FaSearch /></button>
        </div>
      </form>
      <Link to="/add"> <button className="add-button">➕ Add Book</button></Link>
      </div>
    </header>
  );
};

export default Header;
