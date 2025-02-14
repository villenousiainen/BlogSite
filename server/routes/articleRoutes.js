const express = require('express');
const { createArticle, getArticles, getArticle, updateArticle, deleteArticle } = require('../../controllers/articleController');
const authMiddleware = require('../../middleware/sessionAuthMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createArticle); // Only authors can create articles
router.get('/', getArticles); // Everyone can see articles
router.get('/article/:id', getArticle); // Everyone can see a single article
router.put('/:id', authMiddleware, updateArticle); // Only article authors can update
router.delete('/:id', authMiddleware, deleteArticle); // Only article authors can delete
router.get('/create-new-article', authMiddleware)

module.exports = router;