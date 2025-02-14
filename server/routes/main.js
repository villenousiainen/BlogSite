const express = require('express');
const router = express.Router();

const Article = require('../../models/Article'); // Import the Article model

// Route to display all posts (articles)
router.get('/', async (req, res) => {
    try {
        // Fetch all articles from the database
        const articles = await Article.find().populate('author', 'username').exec();
        
        const locals = {
            title: "NodeJs Newssite",
            description: "Simple newssite created with NodeJS, Express, and MongoDb",
            posts: articles, // Pass the fetched articles to the view
            user: req.session.user || null
        };

        // Render the index view with dynamic data
        res.render('index', locals);
    } catch (error) {
        // Handle any error that occurs during the query
        console.error(error);
        res.status(500).send("Error retrieving posts from the database.");
    }
});

// Route to display the "About" page
router.get('/about', (req, res) => {
    locals = {
        user: req.session.user
    };
    res.render('about', locals);
});

router.get('/contact', (req, res) => {
    locals = {
        user: req.session.user
    };
    res.render('contact', locals);
});



module.exports = router;