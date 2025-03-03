# Book Management App

A web application built with Node.js, Express, and MongoDB to manage a collection of books. The app allows users to view, add, edit, and delete books, with features such as search functionality and displaying book details.

## Features

- Add new books with title, author, price, and image URL.
- Edit book details.
- Delete books.
- Search for books by title or author.
- Filter books based on the creation date.

## Tech Stack

- **Frontend**: React.js for UI and JavaScript for functionality
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS

Endpoints
GET /: Fetch all books.
POST /: Add a new book.
PUT /:id: Update a book.
DELETE /:id: Delete a book.
GET /search: Search for books by title, author, or date.
