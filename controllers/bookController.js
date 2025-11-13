const Book = require('../models/Book');

// GET /api/books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json(books);
  } catch (error) {
    console.error('Get books error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.json(book);
  } catch (error) {
    console.error('Get book by id error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/books
const createBook = async (req, res) => {
  try {
    const { title, author, isbn, publishedYear, availableCopies } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      publishedYear,
      availableCopies,
      createdBy: req.user._id
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error('Create book error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/books/:id
const updateBook = async (req, res) => {
  try {
    const { title, author, isbn, publishedYear, availableCopies } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.isbn = isbn ?? book.isbn;
    book.publishedYear = publishedYear ?? book.publishedYear;
    book.availableCopies =
      availableCopies !== undefined ? availableCopies : book.availableCopies;

    const updatedBook = await book.save();

    return res.json(updatedBook);
  } catch (error) {
    console.error('Update book error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};