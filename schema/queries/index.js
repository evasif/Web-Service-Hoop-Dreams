module.exports = `
type Query {
  allBasketballFields: [BasketballField!]!
  allPickupGames: [PickupGame!]!
  allPlayers: [Player!]!
  basketballField(id: ID!): BasketballField!
  pickupGame(id: ID!): PickupGame!
  player(id: ID!): Player!
}
`;