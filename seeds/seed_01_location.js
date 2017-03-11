exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('location').del()
    .then( () => {
      // Inserts seed entries
      return knex('location').insert([
        {name: 'Jungle1'},
        {name: 'Jungle2'},
        {name: 'Jungle3'},
        {name: 'Jungle4'},
        {name: 'Jungle5'},
        {name: 'Jungle6'}
      ])
    })
}
