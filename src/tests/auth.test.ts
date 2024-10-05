import request from "supertest"
import app from "../app"
import { describe } from "node:test"
import { SessionJwt, UserJwt } from "../config/jwt"
import { generateSessionJwt } from "../utils/jwt"
import { v4 } from "uuid"
import { SessionCookie } from "../config/cookie"
import { sign } from "cookie-signature"

describe("auth api tests", ()=>{

    describe("login api tests",()=>{
        
        describe("given a valid userID and password",()=>{

            //should match userID and password from database.
            //upon successful login, must create a jwt token ans session cookie to be stored on api call user.
            //returns a 200 status code
            //returns json object with message and fetched
            //response headers contains jwt tokens
            test("should response with a status 200 code", async ()=>{
                const response = await request(app)
                    .post("/auth/login").
                    send({
                        userId:"+91 8318016910",
                        password:"1234"
                    })
                expect(response.status).toBe(200)
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
                expect(response.body).toHaveProperty("fetched")
                expect(response.body.fetched).toBeDefined()
                const userJwtName = UserJwt.name.toLowerCase()
                const sessionJwtName = SessionJwt.name.toLowerCase()
                const userJwt = response.headers[userJwtName]
                const sessionJwt = response.headers[sessionJwtName]
                expect(userJwt).toBeTruthy()
                expect(sessionJwt).toBeTruthy()
                if(Array.isArray(userJwt)){
                    expect(userJwt.length).toBeGreaterThan(0)
                }
                if(Array.isArray(sessionJwt)){
                    expect(sessionJwt.length).toBeGreaterThan(0)
                }
            })
        })
    
        // describe("given empty userID or password",()=>{
    
        // })
    
        // describe("given invalid userID",()=>{
    
        // })
    
        // describe("given wrong password",()=>{
    
        // })
    })

    describe("logout api tests", ()=>{
        describe("valid session jwt is provided",()=>{
            
            test("should response with a status 200 code", async ()=>{
                const sessionId = v4()
                const response = await request(app)
                    .post("/auth/logout")
                    .set(SessionJwt.name,generateSessionJwt(sessionId,SessionJwt.key))
                    .set('Cookie',`${SessionCookie.name}=s:${sign(sessionId,SessionCookie.key)}`)
                expect(response.status).toBe(200)
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
                expect(response.body).toHaveProperty("fetched")
                expect(response.body.fetched).toBeDefined()
            })
        })
    })
    

})