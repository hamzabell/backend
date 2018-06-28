/**
 * MembersController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create : function(req,res){
        var name = req.body.name;
        var password = req.body.password;
        var email = req.body.email;
        var number = req.body.number;
        Members.findOne({name:name}).then(function(user){
            if(user){
                return res.send({
                    success : false,
                    message : "username already exists!"
                })
            }else{
                Members.create({name:name, password:password,email:email,number:number}).exec(function(err,member){               
                    if (err){
                        return res.send ({
                            success : false,
                            message : "Database Error"
                        })
                        
                    }  
                   return res.send({
                       success: true,
                       message : "User account Created",
                       userId : member.id,
                       name : member.name
                   })
                });
            }
           
        })

         
               
       
    },

    login : function(req,res){
        var name = req.body.name;
        var password = req.body.password;
        Members.findOne({
                name : name,
                password:password
        })
        .then(function(member){
            if(!member){  
                return res.send({
                    success : false,
                    message : "Username does not exist"
                });
            }
            return res.send({
                success : true,
                message : "Username exists",
                userId : member.id,
                name : member.name
            })
        });          
    },

    delete : function(req,res){
        Hobbies.destroy({id:req.body.id}).exec(function(err){
            if (err){
               return  res.send({
                   sucess : false,
                   message: 'Database Error'
                });
            }
            return res.send({
                success : true,
                message : "record deleted"
            })     
        });
    },

    gethobby : function(req,res){
        Members.findOne({id:req.body.userId}).populateAll().exec(function(err,member){
            if(err){
                return res.send({
                    success : false
                });
            }
            return res.send({
                hobbies : member.hobbies
            });

        });
    }

  
};

