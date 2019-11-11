var request = require("request");

module.exports = {
    queries: {
        allPickupGames: (parent, args, context) => {
            return context.PickupGame.find({});
        },
        pickupGame: (parent, args, context) => {
            return new Promise(function (resolve, reject) {
                context.PickupGame.findById(args.id, (err, game) => {
                    if (!game) {
                        reject(new context.errors.NotFoundError());
                    }
                    else {
                        resolve(game);
                    }
                });
            });
        }
    },
    mutations: {
        createPickupGame: (parent, args, context) => {
            return new Promise((resolve, reject) => {
                context.Player.findById(args.input.hostId, (err, player) => {
                    if (!player) {
                        reject(new context.errors.NotFoundError());
                    } else {
                        request(
                            `https://basketball-fields.herokuapp.com/api/basketball-fields/${
                            args.input.basketballFieldId
                            }`,
                            (err, response, body) => {
                                basketballField = JSON.parse(body);
                                if (err) {
                                    reject(err);
                                } else if (basketballField.status == "CLOSED") {
                                    reject(new context.errors.BasketballFieldClosedError());
                                } else {
                                    context.PickupGame.create({
                                        start: args.input.start,
                                        end: args.input.end,
                                        location: basketballField,
                                        host: player
                                    },
                                        (err, pickupGame) => {
                                            if (err) {
                                                reject(new context.errors.BadRequest());
                                            } else {
                                                resolve(pickupGame);
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                });
            });
        },
        removePickupGame: (parent, args, context) => {
            return new Promise(function (resolve, reject) {
                context.PickupGame.findOneAndDelete({ _id: args.id }, (err, pickupGame) => {
                    if (err) {
                        reject(new context.errors.NotFoundError());
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        },
        addPlayerToPickupGame: (parent, args, context) => {
            return new Promise(function (resolve, reject) {
                context.PickupGame.findById({ "_id": args.input.pickupGameId }, (err, pickupgame) => {
                    if (err) {
                        reject(new context.errors.NotFoundError());
                    }
                    else if (pickupgame.end <= Date.now()) {
                        reject(new context.errors.PickupGameAlreadyPassedError());
                    }
                    else {
                        context.RegisteredPlayers.find({ "pickupGameId": args.input.pickupGameId }, (err, game) => {

                            const playerIds = game.map(data => data.playerId);

                            context.Player.find({ "_id": { $in: playerIds } }, (err, players) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    if (players.length < pickupgame.location.capacity) {
                                        context.RegisteredPlayers.create({
                                            playerId: args.input.playerId,
                                            pickupGameId: args.input.pickupGameId,
                                        }, (err, game) => {
                                            if (err) {
                                                reject(new context.errors.BadRequest());
                                            }
                                            else {
                                                resolve(pickupgame);
                                            }
                                        })
                                    }
                                    else {
                                        reject(new context.errors.PickupGameExceedMaximumError());
                                    }
                                }
                            })
                        });
                    }
                })
            })
        },
        removePlayerFromPickupGame: (parent, args, context) => {
            return new Promise(function (resolve, reject) {
                context.PickupGame.findById({ "_id": args.input.pickupGameId }, (err, pickupgame) => {
                    if (err) {
                        reject(new context.errors.NotFoundError());
                    }
                    else if (pickupgame.end <= Date.now()) {
                        reject(new context.errors.PickupGameAlreadyPassedError());
                    }
                    else {
                        context.Player.findById({ "_id": args.input.playerId }, (err, player) => {
                            if (err) {
                                reject(new context.errors.NotFoundError());
                            }
                            else {
                                context.RegisteredPlayers.findOneAndDelete(
                                    { playerId: player.id },
                                    { pickupGameId: pickupgame.id },
                                    (err, registeredPlayer) => {
                                        if (err) {
                                            reject(new context.errors.NotFoundError());
                                        }
                                        else {
                                            resolve(pickupgame);
                                        }
                                    }
                                );
                            }
                        })
                    }
                })
            });
        }
    },
    types: {
        PickupGame: {
            end: (parent, args, context) => {
                return context.Moment(parent.end).locale("is").format("llll");
            },
            start: (parent, args, context) => {
                return context.Moment(parent.start).locale("is").format("llll");
            },
            host: (parent, args, context) => {
                return new Promise(function (resolve, reject) {
                    context.Player.findById(parent.host, (err, host) => {
                        if (err) {
                            reject(new context.errors.NotFoundError());
                        }
                        else {
                            resolve(host);
                        }
                    })
                });
            },
            registerPlayers: (parent, args, context) => {
                return new Promise(function (resolve, reject) {
                    context.RegisteredPlayers.find({ "pickupGameId": parent.id }, (err, pickupGame) => {

                        const playerIds = pickupGame.map(data => data.playerId);

                        context.Player.find({ "_id": { $in: playerIds } }, (err, players) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(players);
                            }
                        })
                    });
                });
            }
        },
    }
}

