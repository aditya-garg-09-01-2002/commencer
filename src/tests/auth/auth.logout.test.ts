import request, { Response } from "supertest"
import app from "../../app"
import { describe } from "node:test"
import { SessionJwt } from "../../config/jwt"
import { generateSessionJwt } from "../../utils/jwt"
import { v4 } from "uuid"
import { SessionCookie } from "../../config/cookie"
import { sign } from "cookie-signature"

describe("logout api tests", ()=>{

    describe("valid session jwt is provided and session cookie is present",()=>{
        let response:Response
        beforeAll(async ()=>{
            const sessionId = v4()
            response = await request(app)
                .post("/auth/logout")
                .set(SessionJwt.name,generateSessionJwt(sessionId,SessionJwt.key))
                .set('Cookie',`${SessionCookie.name}=s:${sign(sessionId,SessionCookie.key)}`)
        })
        test("should respond with a status 200 code", async ()=>{
            expect(response.status).toBe(200)
        })
        test("should respond with a json object containing message", async ()=>{
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toHaveProperty("fetched")
            expect(response.body.fetched).toBe(true)
            expect(response.body).toHaveProperty("message")
            expect(response.body.message).toBeDefined()
        })
    })

    describe("either session cookie or session jwt is absent, due to expiry or previous logout",()=>{
        let response:Response
        const sessionId = v4()
        const testCases = [
            {
                Cookie:`${SessionCookie.name}=s:${sign(sessionId,v4())}`,
            },
            {
                [SessionJwt.name]:generateSessionJwt(sessionId,SessionJwt.key)
            },
        ]
        testCases.forEach(testCase=>{
            let req = request(app)
                .post("/auth/logout")
            Object.keys(testCase).forEach(key=>{
                req.set(key,testCase[key])
            })
            beforeAll(async ()=>{
                response = await req
            })
            test("should respond with a status 401 code", async ()=>{
                expect(response.status).toBe(401)
            })
            test("should respond with a json object containing message", async ()=>{
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
                expect(response.body).toHaveProperty("fetched")
                expect(response.body.fetched).toBe(false)
                expect(response.body).toHaveProperty("message")
                expect(response.body.message).toBeDefined()
            })
        })
    })

    describe("mismatch of session ID between cookie and jwt",()=>{
        let response:Response
        const testCases = [
            {
                Cookie:`${SessionCookie.name}=s:${sign(v4(),SessionCookie.key)}`,
                [SessionJwt.name]:generateSessionJwt(v4(),SessionJwt.key)
            },
        ]
        testCases.forEach(testCase=>{
            let req = request(app)
                .post("/auth/logout")
            Object.keys(testCase).forEach(key=>{
                req.set(key,testCase[key])
            })
            beforeAll(async ()=>{
                response = await req
            })
            test("should respond with a status 403 code", async ()=>{
                expect(response.status).toBe(403)
            })
            test("should respond with a json object containing message", async ()=>{
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
                expect(response.body).toHaveProperty("fetched")
                expect(response.body.fetched).toBe(false)
                expect(response.body).toHaveProperty("message")
                expect(response.body.message).toBeDefined()
            })
        })
    })
})