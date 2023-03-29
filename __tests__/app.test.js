const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

const app = require("../app");
const { convertTimestampToDate } = require("../db/seeds/utils.js");

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
        test("status 200 - returns an article object correctly based on an id ", () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({ body }) => {
                    const { article } = body;
                    expect(article).toBeInstanceOf(Object);
                    expect(article).toMatchObject({
                       title: "Living in the shadow of a great man",
                       author : "butter_bridge",
                      article_id : 1,
                        body:"I find this existence challenging",
                      topic: "mitch",
                    votes:100,
                    created_at:expect.any(String),
                    article_img_url:'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',

                })
        
                    })
                })
                })


                test("status 404 -  article id doesn't exist", () => {
                    return request(app)
                        .get("/api/articles/2005")
                        .expect(404)
                        .then(({ body }) => {
                            expect(body).toEqual({msg :"Article can't be found"});
                        })
                    })
       test("status 400 - requests id that doesnt exist with string parameter/wrong data type", () => {
             return request(app)
             .get("/api/articles/doesntexist")
            expect(400)
            .then(({ body }) => {
             expect(body).toEqual({ message: "invalid request" });
              });

    });

       describe("GET/api/articles", () => {
        test("status:200 - responds with an array of articles, with the correct properties", () => {
            return request(app)
                .get("/api/articles")
                .expect(200)
                .then(({ body }) => {
                    const { articles } = body;
                    
                    expect(articles).toBeInstanceOf(Array);
                    expect(articles).toHaveLength(12);
                    articles.forEach((article) => {
                       
                        expect(article).toMatchObject({
                            author: expect.any(String),
                            article_id:expect.any(Number),
                            topic : expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            article_img_url : expect.any(String),
                            comment_count : expect.any(String),
                        });
                    });
                })
            });
            test("status 200 - returns the articles in  descending order ", () => {
                return request(app)
                    .get("/api/articles")
                    .expect(200)
                    .then(({ body }) => {
                       
                        expect(body.articles).toBeSortedBy("created_at", {
                            descending: true,
                        });
        })
    })
});
