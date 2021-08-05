require("dotenv").config({ path: ".env.test" });
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");

describe("GET - api/private tests", () => {
  it("should return 401 /wo token in header", async () => {
    //given
    //sends GET request to /test endpoint

    //when
    // console.log(process.env.NODE_ENV);
    //console.log(process.env.JWT_SECRET);
    const res = await request.get("/api/private");

    //then
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("unauthorized");
  });

  it("should return 200 /w token in header", async () => {
    //given
    //sends GET request to /test endpoint
    //const user_id = 1;
    

    const token = jwt.sign( {user_id: 1}, process.env.JWT_SECRET);

    //when
    //console.log("EZAAAAAAAZ",process.env.JWT_SECRET);
    const res = await request.get("/api/private").set("Authorization", token);

    //then
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("PSSSSSST SUCH SECRET, MUCH WOW");
  });
});
