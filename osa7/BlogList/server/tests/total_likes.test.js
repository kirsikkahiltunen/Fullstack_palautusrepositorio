const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
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
          }
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(blogListOne)
      assert.strictEqual(result, 10)
    })

    test('when list has two blogs the likes of blogs are summed up', () => {
        const result = listHelper.totalLikes(blogListTwo)
        assert.strictEqual(result, 18)  
    })
    test('when the list is empty, total likes equals zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
  })