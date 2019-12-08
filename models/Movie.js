const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectID,
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunludur'], //path ust klasor yani title
        minlength: [2, '{PATH} en az {MINLENGTH} karakter olmalı sizinki {VALUE}'],
        maxlength: [30, '{PATH} en fazla {MAXLENGTH} karakter olmalı'],
    },
     category: {
         type: String,
         maxlength: 30,
         minlength: 3
     },
     country: {
         type: String,
         maxlength: 30,
         minlength: 3
     },
    year: {
        type: Number,
        max: 2030,
        min: 1890
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('movie', MovieSchema);