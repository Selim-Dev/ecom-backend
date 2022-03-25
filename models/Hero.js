const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Hero message is required']
    },
    image: {
        type: String,
        required: [true, 'Hero title is required']
    }
});

const Hero = mongoose.model('Hero', HeroSchema);

module.exports = Hero;
