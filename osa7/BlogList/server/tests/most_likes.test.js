const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
    const blogListOne = [
        {
            "_id": "68ad8965f5f47824407bde93",
            "title": "Arjen reseptit",
            "author": "Laura Korhonen",
            "url": "arjenreseptit.com",
            "likes": 10,
            "__v": 0
          }
    ]

    const blogListTwo = [

        {
            "_id": "68ad88c8f5f47824407bde90",
            "title": "Testiblogi",
            "author": "Maija Meikäläinen",
            "url": "Testiblogi.fi",
            "likes": 6,
            "__v": 0
          },
          {
            "_id": "68ad8965f5f47824407bde93",
            "title": "Arjen reseptit",
            "author": "Laura Korhonen",
            "url": "arjenreseptit.com",
            "likes": 10,
            "__v": 0
          },
          {
            "_id": "68ad89aef5f47824407bde96",
            "title": "Minimalistin matkassa",
            "author": "Anna Lehtonen",
            "url": "minimalistinmatkassa.net",
            "likes": 3,
            "__v": 0
          },
          {
            "_id": "68ad97c5d3cf5b8b670201d6",
            "title": "Koodarin kulma",
            "author": "Jari Salmi",
            "url": "koodarinkulma.dev",
            "likes": 15,
            "__v": 0
          },
          {
            "_id": "68ad9819d3cf5b8b670201d9",
            "title": "Luontopolku",
            "author": "Jari Salmi",
            "url": "luontopolku.org",
            "likes": 7,
            "__v": 0
          }
    ]
  
    test('when list has only one blog function returns information of author and likes of this blog', () => {
      const result = listHelper.mostLikes(blogListOne)
      assert.deepStrictEqual(result, { author: 'Laura Korhonen', likes: 10 })
    })

    test('when list have more than one blog, the function returns the author with most likes', () => {
        const result = listHelper.mostLikes(blogListTwo)
        assert.deepStrictEqual(result, { author: 'Jari Salmi', likes: 22 })
    })

    test('when list have zero blogs, the function returns {}', () => {
        const result = listHelper.mostLikes([])
        assert.deepStrictEqual(result, {})
    })
  })