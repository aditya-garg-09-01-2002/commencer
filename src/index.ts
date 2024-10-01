import express from "express"
import cors from  "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import routes from "./routes"
import cookieParser from "cookie-parser"
import { port } from "./config/app"

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders:['Content-Type'],
}));
app.use(cookieParser())

app.use("/",routes)

app.use((req,res)=>{
    res.status(404).json({fetched:false,message:"URL not found!!!"})
})
const PORT = port
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});