/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const faker = require('faker')

exports.seed = async function(knex) {
  return knex('clucks')
  .del()
  .then(function () {
  const clucks = Array.from({length: 10000}).map(() => {
    return {
      username : faker.internet.userName(),
      image_url: faker.image.imageUrl(),
      content: faker.lorem.text(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent()
      }
    })
    return knex('clucks').insert(clucks)
  })  
};
