module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isAuth = true;
    next();
  } else {
    res.locals.isAuth = false;
    next();
  }
};
