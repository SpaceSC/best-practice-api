require("dotenv").config({ path: ".env.test" });
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");
const http = require('axios');
// AAA/1 Axios mock adapter
const MockAdapter = require("axios-mock-adapter");

// AAA/2 axios mock adapter
//sets the mock adapter on the our instance
const mock = new MockAdapter(http);

//AAA/3 Axios mock adapter
//Mock any GET request to /users
//arguments for reply are (status, data, headers)
mock.onPost("https://oauth2.googleapis.com/token").reply(200, {access_token: 'ya29.a0ARrdaM_-7Wn4SEuWQK0F7m3vrdMPNzl0G3znx4ntMmMzdxv2jKb3RMaEMfxnHfeAB89dAmclFkfwJw_wG-Rth1hhVxmfCtwGTsq9GLq3FpOYIzQCPPhLN-zL9UIhye0fIZY7qvVzliaOsudB6ADR0F9o0T0F',
  expires_in: 3599,
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
  token_type: 'Bearer',
  id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBmY2MwMTRmMjI5MzRlNDc0ODBkYWYxMDdhMzQwYzIyYmQyNjJiNmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MDkxMjU1MjQ1NjMtNnJjMGE0ODU2b3RlcmFuNzQ1ZmUyczdjOWhjMWNuNzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MDkxMjU1MjQ1NjMtNnJjMGE0ODU2b3RlcmFuNzQ1ZmUyczdjOWhjMWNuNzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk1OTYwOTg3OTg4OTkyOTI4OTkiLCJlbWFpbCI6InN1Z2FyZ2xpZGVyMjIyMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Imd4VnRHQWNsT28zX3ZfNm5waC1lUkEiLCJuYW1lIjoiVHN6aWx5IFRzemlseSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp3SkhHRHl5by0zYjdvLWJ3OGRIMDd0SnpTNlVPaWNqZkVxdElCcT1zOTYtYyIsImdpdmVuX25hbWUiOiJUc3ppbHkiLCJmYW1pbHlfbmFtZSI6IlRzemlseSIsImxvY2FsZSI6Imh1IiwiaWF0IjoxNjI4MTY1Njc3LCJleHAiOjE2MjgxNjkyNzd9.LBrQTp4-o1gRdjgnq8GBO9FtTo2WmKpAW3j8nV5Soae9f-5DI5HVhPeETwwHfKUraRpQWkkHRDeS86MyHUuWhuQWbPfm0r38GrAFTIW4PrlKeKEGf-u6tmDKRnue5oRoAYTNDgI7GoJoG5p4hBx2QMTRmaFeLLQyVzz-vRibQIzboutfXvexI1Ebo6S8JvhrUvrCoDbuUx3bnam5ehnS4WFx_K4GDhKQEZ2XMGEh-GK4f8VqzD127Lo8ZotqXiqUzk9l5AiQGyXeW3ZB21OOkD4p-K1xWwxxbHgGdon66xEWVIcUop7tOXhjR2XcvlYwH2TZj6MN50JBgHkSgqghIA'
});

describe("GET - api/login tests", () => {
  it("should return 200", async () => {
    //given
    //sends GET request to /test endpoint

    //when
    // console.log(process.env.NODE_ENV);
    //console.log(process.env.JWT_SECRET);
    const response = await request.get("/login?code=alma");

    //then
    expect(response.status).toBe(200);
  });
});