const Schema = require('mongoose').Schema;

module.exports = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    location: { type: Object, required: true },
    registerPlayers: { type: [Schema.Types.ObjectId], required: true },
    host: { type: Object, required: true }

});
