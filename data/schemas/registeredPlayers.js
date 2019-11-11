const Schema = require('mongoose').Schema;

module.exports = new Schema({
    playerId: { type: [Schema.Types.ObjectId], required: true },
    pickupGameId: { type: [Schema.Types.ObjectId], required: true },
});
