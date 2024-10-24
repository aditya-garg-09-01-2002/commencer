import request, { Response } from "supertest"
import app from "../../app"
import { describe } from "node:test"
import { SessionJwt } from "../../config/jwt"
import { generateSessionJwt } from "../../utils/jwt"
import { v4 } from "uuid"
import { SessionCookie } from "../../config/cookie"
import { sign } from "cookie-signature"

describe("logout api tests", ()=>{

    test("valid session jwt is provided and session cookie is present",async()=>{
        let response:Response
        const sessionId = v4()
        response = await request(app)
            .post("/auth/logout")
            .set(SessionJwt.name,generateSessionJwt(sessionId,SessionJwt.key))
            .set('Cookie',`${SessionCookie.name}=s:${sign(sessionId,SessionCookie.key)}`)
            
        // should respond with a status code 200
        expect(response.status).toBe(200)

        //should respond with a json object containing message
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body).toHaveProperty("fetched")
        expect(response.body.fetched).toBe(true)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBeDefined()
    })

    const sessionId = v4()
    const testCasesMissingSessionCredentials = [
        {
            Cookie:`${SessionCookie.name}=s:${sign(sessionId,v4())}`,
        },
        {
            [SessionJwt.name]:generateSessionJwt(sessionId,SessionJwt.key)
        },
    ]
    testCasesMissingSessionCredentials.forEach((testCase:{
        [x:string]:string
    })=>{
        test("either session cookie or session jwt is absent, due to expiry or previous logout",async()=>{
            let response:Response
            let req = request(app)
                .post("/auth/logout")

            Object.keys(testCase).forEach(key=>{
                req.set(key,testCase[key])
            })
    
            response = await req

            // should respond with a status 401 code
            expect(response.status).toBe(401)

            // should respond with a json object containing message
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toHaveProperty("fetched")
            expect(response.body.fetched).toBe(false)
            expect(response.body).toHaveProperty("message")
            expect(response.body.message).toBeDefined()
        })
    })

    const testCasesInvalidSession = [
        {
            Cookie:`${SessionCookie.name}=s:${sign(v4(),SessionCookie.key)}`,
            [SessionJwt.name]:generateSessionJwt(v4(),SessionJwt.key)
        },
    ]

    testCasesInvalidSession.forEach((testCase:{
        [x:string]:string
    })=>{
        test("mismatch of session ID between cookie and jwt",async ()=>{
            let response:Response
            let req = request(app)
                .post("/auth/logout")
            Object.keys(testCase).forEach(key=>{
                req.set(key,testCase[key])
            })
            response = await req

            // should respond with a status 403 code
            expect(response.status).toBe(403)

            // should respond with a json object containing message
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toHaveProperty("fetched")
            expect(response.body.fetched).toBe(false)
            expect(response.body).toHaveProperty("message")
            expect(response.body.message).toBeDefined()
        })
    })
})