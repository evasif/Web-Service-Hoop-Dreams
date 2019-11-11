const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { Player, PickupGame, RegisteredPlayers } = require('./data/db');
const Moment = require('moment');
const Errors = require('./errors')
const BasketballFieldService = require('./services/basketballFieldService');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        Player: Player,
        PickupGame: PickupGame,
        RegisteredPlayers: RegisteredPlayers,
        BasketballFieldService: BasketballFieldService,
        Moment: Moment,
        errors: Errors
    }
});

server.listen()
    .then(({ url }) => console.log(`GraphQL API running on ${url}`));