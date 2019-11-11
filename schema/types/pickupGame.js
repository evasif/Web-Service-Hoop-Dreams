module.exports = `
  type PickupGame {
    id: ID!
    start: Moment!
    end: Moment!
    location: BasketballField!
    registerPlayers: [Player!]!
    host: Player!
  }
`;