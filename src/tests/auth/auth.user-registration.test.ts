import request, { Response } from "supertest"
import app from "../../app"
import { describe } from "node:test"
import dotenv from "dotenv"
dotenv.config()

describe("user registration api tests",()=>{

    test("new user id and a name are sent",async()=>{
        let response = await request(app)
            .post("/auth/register-user")
            .send({
                userId:"xyz@xyz.com",
                name:"xyz"
            })

        //should respond with a 200 status code
        expect(response.status).toBe(200)

        // should respond with a json object containing message
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body).toHaveProperty("fetched")
        expect(response.body.fetched).toBe(true)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBeDefined()

        //test case for checking if OTP is sent properly or not
        //test case shall relieve database of the changes developed using libraries like knex
        //for now manual changes in database is required to test again and again
    })

    test("existing registered and verified user Id is sent again",async()=>{
        let response = await request(app)
            .post("/auth/register-user")
            .send({
                userId:process.env.USER_ID,
                name:"xyz"
            })

        // should respond with a 403 status code
        expect(response.status).toBe(403)

        // should respond with a json object containing message
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body).toHaveProperty("fetched")
        expect(response.body.fetched).toBe(false)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBeDefined()
    })

    test("user Id for existing but unverified user",async()=>{
        let response = await request(app)
            .post("/auth/register-user")
            .send({
                userId:"abcd@gmail.com",
                name:"Hallelujah"
            })

        // should respond with a 401 status code
        expect(response.status).toBe(401)

        // should respond with a json object containing message
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body).toHaveProperty("fetched")
        expect(response.body.fetched).toBe(false)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBeDefined()
    })
})