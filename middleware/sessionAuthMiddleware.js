const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    if(req.session && req.session.user) {
        try{
            const user = await User.findById(req.session.user._id);
            if(!user){
                req.session.destroy((error) => {
                    if (error) console.error('Error destroying session', error);
                    res.redirect('/login')
                });
            return;
            }
            req.user = user;
            return next();
        } catch(error){
            return res.redirect('/login')
        }

        
    } 

    return res.redirect('/login')
};

module.exports = authMiddleware;