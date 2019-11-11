const mongoose = require('mongoose');
const pickupGameSchema = require('./schemas/pickupGame');
const playerSchema = require('./schemas/player');
const registeredPlayersSchema = require('./schemas/registeredPlayers');

const connection = mongoose.createConnection('mongodb://evadb:abc123@ds237373.mlab.com:37373/hoop_dreams', { useNewUrlParser: true });

module.exports = {
    PickupGame: connection.model('PickupGame', pickupGameSchema),
    Player: connection.model('Player', playerSchema),
    RegisteredPlayers: connection.model('RegisteredPlayers', registeredPlayersSchema),
    connection,

};

