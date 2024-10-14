import request, { Response } from "supertest"
import app from "../../app"
import { describe } from "node:test"
import { SessionJwt, UserJwt } from "../../config/jwt"
import { SessionCookie } from "../../config/cookie"
import dotenv from "dotenv"
dotenv.config()

describe("login api tests",()=>{
    
    describe("given a valid userID and password",async ()=>{

        //should match userID and password from database.
        //returns a 200 status code
        //returns json object with message and fetched
        //response headers contains user jwt token and session jwt token
        //response headers must also set a singed cookie
        let response:Response;
        beforeAll(async()=>{
            response = await request(app)
                .post("/auth/login").
                send({
                    userId:process.env.USER_ID,
                    password:"1234"
                })
        })

        test("should respond with a status 200 code",async ()=>{
            expect(response.status).toBe(200)
        })
        test("should respond with a json object containing message",async ()=>{
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toHaveProperty("fetched")
            expect(response.body.fetched).toBeDefined()
            expect(response.body).toHaveProperty("message")
            expect(response.body.message).toBeDefined()
        })
        test("should respond with a valid User JWT",async()=>{
            const userJwtName = UserJwt.name.toLowerCase()
            const userJwt = response.headers[userJwtName]
            expect(userJwt).toBeTruthy()
            if(Array.isArray(userJwt)){
                expect(userJwt.length).toBeGreaterThan(0)
            }
        })
        test("should respond with a valid Session JWT",async()=>{
            const sessionJwtName = SessionJwt.name.toLowerCase()
            const sessionJwt = response.headers[sessionJwtName]
            expect(sessionJwt).toBeTruthy()
            if(Array.isArray(sessionJwt)){
                expect(sessionJwt.length).toBeGreaterThan(0)
            }
        })
        test("should set a signed Session Cookie",async()=>{
            const sessionCookieName = SessionCookie.name
            const setCookieHeader = response.headers['set-cookie'];

            expect(setCookieHeader).toBeDefined()
            expect(Array.isArray(setCookieHeader)).toBe(true);

            const sessionCookie = setCookieHeader.find((cookie:string) => cookie.toLowerCase().startsWith(sessionCookieName.toLowerCase()));

            // Validate that the session cookie is found
            expect(sessionCookie).toBeDefined();
            expect(sessionCookie).toMatch(new RegExp(`${sessionCookieName}=s%.+`)); // Adjust the regex according to your cookie format

            // Optionally, check if it is a signed cookie by inspecting attributes
            expect(sessionCookie).toContain('HttpOnly'); // If your cookie is set with HttpOnly
            // expect(sessionCookie).toContain('Secure');  // Secure for production env only for now
        })
    })

    describe("given empty/invalid userID",()=>{
        let response:Response
        const testCases = [
            {userId:"",password:"1234"},
            {userId:"",password:""},
            {userId:"safmas",password:"1234"},
            {userId:"+89 21122",password:""}
        ]
        testCases.forEach(({userId,password})=>{
            beforeAll(async()=>{
                response = await request(app)
                    .post("/auth/login")
                    .send({
                        userId,
                        password
                    })
            })
            test("should respond with a status 404 code",async()=>{
                expect(response.status).toBe(404)
            })
            test("should respond with a json object containing message",async()=>{
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
                expect(response.body).toHaveProperty("fetched")
                expect(response.body.fetched).toBeDefined()
                expect(response.body).toHaveProperty("message")
                expect(response.body.message).toBeDefined()
            })
        })
    })

    describe("given wrong/empty password",()=>{
        let response:Response
        const testCases = [
            {userId:process.env.USER_ID,password:""},
            {userId:process.env.USER_ID,password:"5678"}
        ]
        testCases.forEach(({userId,password})=>{
            beforeAll(async()=>{
                response = await request(app)
                    .post("/auth/login")
                    .send({
                        userId,
                        password
                    })
            })
            test("should respond with a status 403 code",async()=>{
                expect(response.status).toBe(403)
            })
            test("should respond with a json object containing message",async()=>{
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
                expect(response.body).toHaveProperty("fetched")
                expect(response.body.fetched).toBeDefined()
                expect(response.body).toHaveProperty("message")
                expect(response.body.message).toBeDefined()
            })
        })
    })

    describe("login attempt before setting password",()=>{
        let response:Response
        beforeAll(async()=>{
            response = await request(app)
                .post("/auth/login")
                .send({
                    userId:"abcd@gmail.com",
                    password:"AJNSD"
                })
        })
        test("should respond with a status 403 code",async()=>{
            expect(response.status).toBe(403)
        })
        test("should respond with a json object containing message",async()=>{
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toHaveProperty("fetched")
            expect(response.body.fetched).toBeDefined()
            expect(response.body).toHaveProperty("message")
            expect(response.body.message).toBeDefined()
        })
    })
})