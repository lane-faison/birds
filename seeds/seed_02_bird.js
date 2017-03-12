exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('bird').del()
    .then( () => {
      // Inserts seed entries
      return knex('bird').insert([
        {name: 'Oriole1', location_id: 1, rating: 3, notes: 'Notes on bird 1'},
        {name: 'Oriole2', location_id: 1, rating: 5, notes: 'Notes on bird 2'},
        {name: 'Oriole3', location_id: 2, rating: 2, notes: 'Notes on bird 3'}
        // {name: 'Oriole4', location_id: 2, rating: 4, notes: 'Notes on bird 4'},
        // {name: 'Oriole5', location_id: 3, rating: 5, notes: 'Notes on bird 5'},
        // {name: 'Oriole6', location_id: 3, rating: 1, notes: 'Notes on bird 6'},
        // {name: 'Oriole7', location_id: 4, rating: 3, notes: 'Notes on bird 7'},
        // {name: 'Oriole8', location_id: 4, rating: 3, notes: 'Notes on bird 8'},
        // {name: 'Oriole9', location_id: 5, rating: 2, notes: 'Notes on bird 9'},
        // {name: 'Oriole10', location_id: 5, rating: 4, notes: 'Notes on bird 10'},
        // {name: 'Oriole11', location_id: 6, rating: 2, notes: 'Notes on bird 11'}
      ])
    })
}
