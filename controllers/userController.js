const User = require('../models/User');



exports.renderRegisterForm = (req, res) => {
    const errors = req.session.errors || [];
    delete req.session.errors;

    return res.render('register', {errors})
}

// Register new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new User({ username, email, password, role});
        await user.save();
        req.session.user = user;
        return res.redirect('/')
    } catch (error) {
        const errors = [];
        for(let field in error.errors){
            errors.push(error.errors[field].message);
        }

        req.session.errors = errors;
        return res.redirect('/register');
    }
};

exports.renderLoginForm =  (req, res) => {
    const errors = req.session.errors || [];

    
    delete req.session.errors;
    return res.render('login', {errors})

}


// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        //authenticate the user
        if (!user || !(await user.comparePassword(password))) {
            req.session.errors = ['Credentials do not match our records.']
            return res.redirect('/login');
        }
        
        req.session.user = user;
        return res.redirect('/');
    } catch (error) {
        req.session.errors = [error.message];
        return res.redirect('/login');
        
    }
};

exports.logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send('Failed to log out');
        }
    });
    
    return res.redirect('/login');
}

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        return res.render('profile', {user});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};