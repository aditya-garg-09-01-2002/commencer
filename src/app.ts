import express from "express"
import cors from  "cors"
import bodyParser from "body-parser"
import routes from "./routes"
import cookieParser from "cookie-parser"
import { SessionCookie } from "./config/cookie"

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders:['Content-Type'],
}));
app.use(cookieParser(SessionCookie.key))

app.use("/",routes)

app.use((req,res)=>{
    res.status(404).json({fetched:false,message:"URL not found!!!"})
})

export default app