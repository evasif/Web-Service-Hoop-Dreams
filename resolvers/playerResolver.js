
module.exports = {
    queries: {
        allPlayers: (parent, args, context) => {
            return new Promise(function (resolve, reject) {
                context.Player.find({}, (err, player) => {
                    if (!player) {
                        reject(new context.errors.NotFoundError());
                    }
                    else {
                        resolve(player);
                    }
                });
            });
        },
        player: (parent, args, context) => {
            return new Promise(function (resolve, reject) {
                context.Player.findById(args.id, (err, player) => {
                    if (!player) {
                        reject(new context.errors.NotFoundError());
                    }
                    else {
                        resolve(player);
                    }
                });
            });
        }
    },
    mutations: {
        createPlayer: (parent, args, context) => {
            return new Promise(function (resolve, reject) {
                context.Player.create({
                    name: args.input.name,
                }, (err, player) => {
                    if (err) {
                        reject(new context.errors.BadRequest());
                    }
                    else {
                        resolve(player);
                    }
                });
            });
        },
        updatePlayer: (parent, args, context) => {
            return new Promise(function (resolve, reject) {
                context.Player.findOneAndUpdate(
                    { _id: args.id },
                    { $set: { name: args.name } }, (err, player) => {
                        if (err) {
                            reject(new context.errors.NotFoundError());
                        }
                        else {
                            resolve(player);
                        }
                    });
            });
        },
        removePlayer: (parent, args, context) => {
            return new Promise(function (resolve, reject) {
                context.Player.findOneAndDelete({ _id: args.id }, (err, player) => {
                    if (!player) {
                        reject(new context.errors.NotFoundError());
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        },
    },
    types: {
        Player: {
            playedGames: (parent, args, context) => {
                return new Promise(function (resolve, reject) {
                    context.RegisteredPlayers.find({ "playerId": parent.id }, (err, player) => {

                        const pickupGameIds = player.map(data => data.pickupGameId);

                        context.PickupGame.find({ "_id": { $in: pickupGameIds } }, (err, pickupGames) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(pickupGames);
                            }
                        })
                    });
                });
            }
        }
    }
}