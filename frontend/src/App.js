import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Header onSearch={setSearchQuery} />
      <Routes>
        <Route path="/" element={<BooksList searchQuery={searchQuery} />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </Router>
  );
};

export default App;
