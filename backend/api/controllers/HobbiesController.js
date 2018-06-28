/**
 * HobbiesController
 *
 * @description :: Server-side logic for managing hobbies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    addhobby : function (req,res){
        res.clearCookie("emailTextError");
        const nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure : false,
            port : 25,
            auth:{
                user : 'akanbassey8@gmail.com',
                pass : 'einstien'
            },
            tls : {
                rejectUnauthorized : false
            }

        });

        var mailOptions = {
            from : 'Hobbinator <akanbassey8@gmail.com>',
            to: "akanbassey8@gmail.com",
            subject : "You added a new hobby!!",
            text : req.body.title
        }

        transporter.sendMail(mailOptions,function(err,res){
            if (err){
                 req.session.emailTextError ="(Not Sent) Email  "
                console.log(err);
            }else{
                req.session.emailTextError ="(Sent) Email  "
                console.log('email sent');
            }
        })

        var TeleSignSDK = require('telesignsdk');
        var client = new TeleSignSDK('10CE9F3A-840B-4E3E-8AC4-81724011A02D','kGNni11BEN3L2ahAPWziXWDaURhoLMRZCA50RzV9GzdtHtMnnbD1Pg7PInbMqY+X45XLngwVdh49oOWzDiS4QQ==');

        callback = function(err,resBody){
            if(err){
                req.session.emailTextError +="and Text";
                console.error(err);
            }else{
                req.session.emailTextError +="and Text";
                console.log(resBody);
            }
        }

        client.sms.message(callback,'2349077891532','You added a new hobby!! => ' + req.body.title,'ARN');

        Hobbies.create({hobbies:req.body.title,owner:req.body.userId }).exec(function(err){      
                        
            if (err){
                return res.send({
                    success : false,
                    message: 'Database Error'
                });
               
            }  
            return res.send({
                success : true,
                message : "Hobby has been created"
            });  
        })         
       
    },
    


    delete : function(req,res){
        Hobbies.destroy({id:req.body.id}).exec(function(err){
            if (err){
                res.send(500,{error: 'Database Error'});
            }

            res.send({
                success : true
            });
        });
        return false;
    },

	
};

