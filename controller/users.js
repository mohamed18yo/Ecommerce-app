var User = require('../model/user')

exports.getLogin=(req, res, next)=>{
    res.render('login', { title: 'Login | eCommerce Template' });

}
exports.getRegister=(req, res, next)=>{
    res.render('register', { title: 'Register | eCommerce Template' });

}
exports.getforgotpass =(req, res, next)=>{
    res.render('forgot-password', { title: 'Forgot-Password | eCommerce Template' });

}



exports.register=(req, res, next)=>{
// res.send(req.body)
User.create(req.body).then(function(result){
    res.redirect('/users/login')
})
}

exports.forgotpass=(req, res, next)=>{

}