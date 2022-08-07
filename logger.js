function log (req, res, next) {
    console.log('logging...');
    next();//pass control to next middleware function
}
module.exports = log;