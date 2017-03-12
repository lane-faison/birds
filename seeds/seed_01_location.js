exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('location').del()
    .then( () => {
      // Inserts seed entries
      return knex('location').insert([
        {area: 'Jungle1'},
        {area: 'Jungle2'},
        {area: 'Jungle3'},
        {area: 'Jungle4'},
        {area: 'Jungle5'},
        {area: 'Jungle6'}
      ])
    })
}
