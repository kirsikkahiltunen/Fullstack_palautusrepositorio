const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
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
  
    test('when list has only one blog function returns information of this blog', () => {
      const result = listHelper.favoriteBlog(blogListOne)
      assert.deepStrictEqual(result, blogListOne[0])
    })

    test('when list have more than one blog, the function returns the blog with more likes', () => {
        const result = listHelper.favoriteBlog(blogListTwo)
        assert.deepStrictEqual(result, blogListTwo[1])
    })

    test('when list is empty, function returns 0', () => {
        const result = listHelper.favoriteBlog([])
        assert.deepStrictEqual(result, 0)
    })
  })