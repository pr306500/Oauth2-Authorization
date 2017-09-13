var User = require('../models/user.js');

exports.postUser = function(req,res){
console.log('postuser',req.body);
var user = new User({
  username:req.body.username,
  password:req.body.password

});

user.save(function(err){

console.log('errrrr',err,JSON.stringify(user));

if(err){

 res.send(err);

}

res.json(user);

})


};

exports.getUser = function(req,res){

User.find(function(err,users){
if(err){

res.send(users);

}

res.json(users);


});



}
