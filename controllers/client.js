var Client = require('../models/client');

exports.postClients = function(req,res){

console.log('******','posclient user',JSON.stringify(req.user));
  var client = new Client({

  name:req.body.name,
  id:req.body.id,
  secret:req.body.secret,
  userId:req.user._id

 });

client.save(function(err){
if(!err){

res.json(client);

}


})

};
