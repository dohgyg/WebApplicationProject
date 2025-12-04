const express = require('express');
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Public: xem tất cả sách
router.get('/', getBooks);
router.get('/:id', getBookById);

// Protected: chỉ user login mới được thêm/sửa/xóa
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);

// only user who created that book can delete the book and admin
router.delete('/:id', protect, deleteBook);

module.exports = router;
