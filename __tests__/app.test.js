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
                    expect(body.message).toBe("Bad request");
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
            .expect(400)
            .then(({ body }) => {
             expect(body).toEqual({ msg: "Bad Request" });
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
                            title : expect.any(String),
                            article_id:expect.any(Number),
                            topic : expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            article_img_url : expect.any(String),
                            comment_count : expect.any(Number),
                        });
                    });
                })
            });
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
    describe("GET/api/articles/:article_id/comments", () => {
        test("status:200 - responds with an array of comments for the given article id, with the correct properties", () => {
            return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body }) => {
                    const { comments } = body;
                    
                    expect(comments).toBeInstanceOf(Array);
                    expect(comments).toHaveLength(11);
                    comments.forEach((comment) => {
                       
                        expect(comment).toMatchObject({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                             author: expect.any(String),
                           body: expect.any(String),
                           article_id:1,
                           
                        });
                    });
                });
            });
                });
test("status 200 - returns the comments in  descending order ", () => {
    return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
           
            expect(body.comments).toBeSortedBy("created_at", {
                descending: true,
            });
    });
});

    test("status 200 - responds with an empty array when queried by an article id that does exist but has no comments", () => {
        return request(app)
            .get("/api/articles/2/comments")
            .expect(200)
            .then(({ body }) => {
               
                expect(body.comments).toEqual([]);
        });
    });
        test("status 404 - responds with an error message when article id doesn't exist", () => {
            return request(app)
                .get("/api/articles/2002/comments")
                .expect(404)
            .then(({ body }) => {
             expect(body).toEqual({ msg: "Article id not found" });
              });
            });
              test(" responds with an error message when  the wrong input is entered", () => {
                return request(app)
                    .get("/api/articles/hello/comments")
                    expect(400)
                .then(({ body }) => {
                 expect(body).toEqual({  msg: err.msg} );
                  });
                
});
describe("POST /api/articles/:article_id/comments test ", ()=>{
    test("201, post request, adds a comment, to the article id entered, and returns the posted comment", ()=>{
        const inputComment = {
            username: 'rogersop',
            body: 'This is what I want to write.', 
            }
            return request(app)
        .post("/api/articles/1/comments")
        .send(inputComment)
        .expect(201)
        .then(( { body } )=>{
            const { comment } = body;
            expect(comment).toBeInstanceOf(Object)
            expect(comment).toMatchObject({
                comment_id: expect.any(Number),
                votes: 0,
                created_at: expect.any(String),
                author: 'rogersop',
               body: "This is what I want to write.",
               article_id: 1,
            })
        })
    })
    test("status 400 - missing values on post username ", () => {
        const inputComment = {
           
            body: "This is what I want to write",
        };
        return request(app)
            .post("/api/articles/1/comments")
            .send(inputComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Not found");
            });


    });
    test("status 400 - missing key on post body ", () => {
        const inputComment = {
            username: "rogersop",
            
        };
        return request(app)
            .post("/api/articles/1/comments")
            .send(inputComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("invalid input");
            });
});

test("status 201 - extra keys on the post object ", () => {
    const inputComment = {
        username: "rogersop",
        title: "Title here",
        body: "This is my message",
        topic: "Wombats",
        votes: 100,
    };
    return request(app)
        .post("/api/articles/1/comments")
        .send(inputComment)
        .expect(201)
        .then(({ body }) => {
                const { comment } = body;
                expect(comment).toBeInstanceOf(Object)
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: 0,
                    created_at: expect.any(String),
                    author: 'rogersop',
                   body: "This is my message",
                   article_id: 1,
                })
            })
        });
    });
        test("status 404 - not existing username ", () => {
            const inputComment = {
                username: "notauser",
                body: "This is what I want to write",
              
            };
            return request(app)
                .post("/api/articles/1/comments")
                .send(inputComment)
                .expect(404)
                .then(({ body }) => {
                    expect(body.message).toBe("not found");
                });
});


test("status 404 - responds with an error message when article id doesn't exist", () => {
    
    const inputComment = {
        username: 'rogersop',
        body: 'This is what I want to write.', 
        }
        return request(app)
        .post("/api/articles/2002/comments")
        .send(inputComment)
        .expect(404)
    .then(({ body }) => {
     expect(body.message).toBe("not found");
      })
});

describe(". DELETE /api/comments/:comment_id",()=>{
    test("Status 204 ,deletes comment and returns 204 status, checks the array has removed one comment",()=>{
        return request(app)
        .delete("/api/comments/1")
        .expect(204);
            
    })
    test("Status 404  responds with an error message when comment id does not exist",()=>{
        return request(app)
        .delete("/api/comments/2005")
        .expect(404) 
        .then(({ body }) => {
            expect(body.msg).toBe("Not found");
             })
            
    })
    
    test("Status 400  responds with an error message when comment id is a string",()=>{
        return request(app)
        .delete("/api/comments/letters")
        .expect(400) 
        .then(({ body }) => {
            expect(body.msg).toBe("Bad Request");
             })
            
    })
    });

describe("PATCH /api/articles/:articleid request", () => {
    test("status 200 - increments votes correctly and returns the updated article ", () => {
        const update = { inc_votes: 20 };
        return request(app)
            .patch("/api/articles/1")
            .send(update)
            .expect(201)
            .then(({ body }) => {
               const { article } = body;
                
                expect(article).toMatchObject({
                    title: 'Living in the shadow of a great man',
                    topic: 'mitch',
                    author: 'butter_bridge',
                    body: 'I find this existence challenging',
                    votes: 120,
                    article_img_url:
                      'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
                    created_at: expect.any(String),
                });
            })
        })
        test("status 404 - responds with an error message when article id doesn't exist", () => {
    
            const update = { votes: 20 };
                return request(app)
                .patch("/api/articles/2002")
                .send(update)
                .expect(404)
            .then(({ body }) => {
             expect(body.msg).toBe("Not found");
              })
        });
        test("status 400 - responds with an error message when you enter a string instead of a number", () => {
    
            const update = { inc_votes: "hi" };
                return request(app)
                .patch("/api/articles/1")
                .send(update)
                .expect(400)
            .then(({ body }) => {
             expect(body.msg).toBe("Bad Request");
              })
        });
        test("status 400 - responds with an error message when you enter an empty object", () => {
    
            const update = {};
                return request(app)
                .patch("/api/articles/1")
                .send(update)
                .expect(400)
            .then(({ body }) => {
             expect(body.msg).toBe("Bad Request");
              })
        });
    })
    describe("GET /api/users", ()=>{
        test(" status 200, responds with an array of user objects ",()=>{
            return request(app)
            .get("/api/users")
            .expect(200)
            .then(({body} )=>{
                const { users } = body;
                expect(users).toBeInstanceOf(Array);
                expect(users).toHaveLength(4);
                users.forEach((user) => {
                    expect(user).toMatchObject({
                         username: expect.any(String),
                         name: expect.any(String),
                         avatar_url:expect.any(String),
                    });
                });

            }) 

            })
        })

        describe("get/api/artciles queries", ()=>{
           
        
            test("status 200, get an arrray of articles, sorted by a valid column ", ()=>{
                return request(app)
                .get("/api/articles?sort_by=created_at")
                .expect(200)
                .then(({body})=>{
                    const { articles } = body;
                    expect(articles).toHaveLength(12);
                    })
        
            })
            test("status 200, get an arrray of articles, sorted by a valid column ", ()=>{
                return request(app)
                .get("/api/articles?sort_by=created_at")
                .expect(200)
                .then(({body})=>{
                    const { articles } = body;
                    expect(articles).toHaveLength(12);
                    })
        
            })
            test("status 200 - returns articles sorted by column selected ", () => {
                return request(app)
                    .get("/api/articles?sort_by=article_id")
                    .expect(200)
                    .then(({ body }) => {
                       const { articles } = body
                   
                        expect(articles).toBeSortedBy("article_id", {
                            descending: true,
                        })
                        })
                    })
                    
            
                    test("status 200 - returns articles sorted by order ", () => {
                        return request(app)
                            .get("/api/articles?order=desc")
                            .expect(200)
                            .then(({ body }) => {
                               
                                const { articles } = body
                               
                                expect(articles).toBeSortedBy("created_at", {
                                    descending: true,
                                })
                                })
                            })
                    
                        
                            test("status 404 - responds with an error message when you enter  an invalid topic column", () => {
    
                            return request(app)
                            .get("/api/articles/?topic=noatopic")
                            .expect(404)
                            .then(({ body }) => {
                                  console.log(body)
                                 expect(body.msg).toBe("Topic not found");
                                  })
                            });
                           
                        test("status 404 - responds with an error message when you enter  an invalid order by", () => {
    
                        
                            return request(app)
                            .get("/api/articles/?order=notvalid")
                          .expect(400)
                        .then(({ body }) => {
                         expect(body.msg).toBe("invalid order query");
                          })
                    });

                    test("status 400 - invalid sort query/not a column in db ", () => {
                        return request(app)
                            .get("/api/articles?sort_by=notacolumn")
                            .expect(400)
                            .then(({ body }) => {
                                expect(body.msg).toBe("Invalid sort query");
                            });
                        })
                        test("status 200 - queries existing topic, but with no articles associated ", () => {
                            return request(app)
                                .get("/api/articles?topic=paper")
                                .expect(200)
                                .then(({ body }) => {
                                    
                                    expect(body.articles).toEqual([]);
                                });
                        });
        })
        describe("get/api/articles/:article id", () =>{
            test("status 200 - returns an article object correctly based on an id, which now includes the comment count as a number ", () => {
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
                            comment_count : 11,
                    })
            
                        })
                    })
                    })