import { hash } from "bcrypt";
import app from "./app"
import { port } from "./config/app"

const PORT = port
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});