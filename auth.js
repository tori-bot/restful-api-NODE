function auth (req, res, next) {
    console.log('authenticating...');
    next();//pass control to next middleware function
}

module.exports = auth;