const Article = require('../models/Article');
const User = require('../models/User');

/**
 * 
 * all
 */


// Create new article (only for authors)
exports.createArticle = async (req, res) => {
    try {
        if (req.user.role !== 'author') {
            return res.status(403).json({ error: 'Permission denied' });
        }

        const { title, content } = req.body;
        const article = new Article({
            title,
            content,
            author: req.user.userId
        });
        
        await article.save();
        res.status(201).json({ message: 'Article created successfully!', article });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all articles (readers and authors)
exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single article (readers and authors)
exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', 'username');
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an article (only for the author who created it)
exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        if (article.author.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: "You're not authorized to edit this article" });
        }

        article.title = req.body.title || article.title;
        article.content = req.body.content || article.content;

        await article.save();
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an article (only for the author who created it)
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        if (article.author.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: "You're not authorized to delete this article" });
        }

        await article.remove();
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};