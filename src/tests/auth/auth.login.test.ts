import request, { Response } from "supertest"
import app from "../../app"
import { describe } from "node:test"
import { SessionJwt, UserJwt } from "../../config/jwt"
import { SessionCookie } from "../../config/cookie"
import dotenv from "dotenv"
dotenv.config()

describe("login api tests",()=>{

    test("given a valid userID and password",async ()=>{

        //should match userID and password from database.
        let response = await request(app)
            .post("/auth/login").
            send({
                userId:process.env.USER_ID,
                password:"1234"
            })

        // status code should be 200
        expect(response.status).toBe(200)

        // json object with fetched and message attributes
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body).toHaveProperty("fetched")
        expect(response.body.fetched).toBeDefined()
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBeDefined()
        
        // user jwt token received
        const userJwtName = UserJwt.name.toLowerCase()
        const userJwt = response.headers[userJwtName]
        expect(userJwt).toBeTruthy()
        if(Array.isArray(userJwt)){
            expect(userJwt.length).toBeGreaterThan(0)
        }

        // session jwt token received
        const sessionJwtName = SessionJwt.name.toLowerCase()
        const sessionJwt = response.headers[sessionJwtName]
        expect(sessionJwt).toBeTruthy()
        if(Array.isArray(sessionJwt)){
            expect(sessionJwt.length).toBeGreaterThan(0)
        }

        // session cookie received
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

    const testCasesInvalidUserId = [
        {userId:"",password:"1234",desc:"empty user id, non-empty password"},
        {userId:"",password:"",desc:"empty user id and password"},
        {userId:"safmas",password:"1234",desc:"invalid user id and non-empty password"},
        {userId:"+89 21122",password:"",desc:"invalid user id and empty password"}
    ]
    
    testCasesInvalidUserId.forEach(({userId,password,desc})=>{
        test("given empty/invalid userID : "+desc,async()=>{
            let response:Response
            response = await request(app)
                .post("/auth/login")
                .send({
                    userId,
                    password
                })
            // status code 404 received
            expect(response.status).toBe(404)
    
            // json object with fetched and message received
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toHaveProperty("fetched")
            expect(response.body.fetched).toBeDefined()
            expect(response.body).toHaveProperty("message")
            expect(response.body.message).toBeDefined()
        })
    })


    const testCasesInvalidPassword = [
        {userId:process.env.USER_ID,password:"",desc:"valid user id and empty password"},
        {userId:process.env.USER_ID,password:"5678",desc:"valid user id and wrong password"}
    ]

    testCasesInvalidPassword.forEach(({userId,password,desc})=>{
        test("given wrong/empty password : "+desc,async()=>{
            let response:Response
            response = await request(app)
                .post("/auth/login")
                .send({
                    userId,
                    password
                })
            // status code 403 received
            expect(response.status).toBe(403)
    
            // json object with message and fetched attributes received
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toHaveProperty("fetched")
            expect(response.body.fetched).toBeDefined()
            expect(response.body).toHaveProperty("message")
            expect(response.body.message).toBeDefined()
        })
    })

    test("login attempt before setting password",async ()=>{
        let response:Response
        response = await request(app)
            .post("/auth/login")
            .send({
                userId:"abcd@gmail.com",
                password:"AJNSD"
            })
        // status code 403 received
        expect(response.status).toBe(403)

        //json object with fetched and message received
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body).toHaveProperty("fetched")
        expect(response.body.fetched).toBeDefined()
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBeDefined()
    })
})