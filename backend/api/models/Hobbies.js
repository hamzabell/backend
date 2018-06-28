/**
 * Hobbies.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    hobbies :{
      type: "string",
      required: true
    },

    owner : {
      model : 'members',
      required : true
    }

  },
  connection : 'mongodb'
};

