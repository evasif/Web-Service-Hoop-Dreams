module.exports = {
    queries: {
        allBasketballFields: async (parent, args, context) => {
            const results = await context.BasketballFieldService.getAllBasketballFields();
            if (results == null) {
                return new context.errors.NotFoundError();

            }
            else {
                return JSON.parse(results);
            }

        },
        basketballField: async (parent, args, context) => {
            const result = await context.BasketballFieldService.getBasketballFieldById(args.id);

            if (result == "Basketball field was not with this id.") {
                return new context.errors.NotFoundError();
            }
            else {
                return JSON.parse(result);
            }

        }
    },
    types: {
        BasketballField: {
            pickupGames: (parent, args, context) => {
                return new Promise(function (resolve, reject) {
                    context.PickupGame.find({ "location.id": parent.id }, (err, game) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(game);
                        }
                    })
                })
            },
            yearOfCreation: (parent, args, context) => {
                return context.Moment(parent.yearOfCreation).locale("is").format("llll");
            }
        }
    }
};