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

// Tùy bạn: xóa chỉ admin
router.delete('/:id', protect, admin, deleteBook);

module.exports = router;
