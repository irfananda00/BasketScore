/**
 * Match.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    home_name: {
      type:'string',
      required: true
    },
    home_score: {
      type:'integer',
      required: true
    },
    away_name: {
      type:'string',
      required: true
    },
    away_score: {
      type:'integer',
      required: true
    },
  }
};
