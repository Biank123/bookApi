const express = require('express');
const router = express.Router();
const {
    getFilteredBooks
} = require('../controllers/bookController');


// Ruta para obtener libros filtrados
router.get('/', getFilteredBooks);

module.exports = router;
