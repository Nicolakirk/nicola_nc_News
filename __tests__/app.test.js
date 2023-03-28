const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

const app = require("../app");

  describe("GET/api/topics", () => {
    test("status:200 - responds with an array of topics, with slug and description properties", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
                const { topics } = body;
                expect(topics).toBeInstanceOf(Array);
                expect(topics).toHaveLength(3);
                topics.forEach((topic) => {
                    expect(topic).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String),
                    });
                });
            })
        })
        it("status 404 - not a route/path ", () => {
            return request(app)
                .get("/api/badroute")
                .expect(404)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid url");
                });
})
  });

  
        describe("get/api/articles/:article id", () =>{
        test("status 200 - returns an article object correctly based on id ", () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({ body }) => {
                    expect(body.article.title).toBe(
                       "Living in the shadow of a great man");
                       expect(body.article.author).toBe ("butter_bridge");
                        expect(body.article.article_id).toBe( 1);
                        expect(body.article.body).toBe("I find this existence challenging");
                        expect(body.article.topic).toBe ("mitch");
                    expect(body.article.votes).toBe(100);
        
                    })
                })


                it("status 404 -  article id doesn't exist", () => {
                    return request(app)
                        .get("/api/articles/2005")
                        .expect(404)
                        .then(({ body }) => {
                            expect(body).toEqual({msg :"Article can't be found"});
                        });
       test("status 400 - requests id that doesnt exist with string parameter/wrong data type", () => {
             return request(app)
             .get("/api/articles/doesntexist")
            expect(400)
            .then(({ body }) => {
             expect(body).toEqual({ message: "invalid request" });
              });

    })
})
       });
