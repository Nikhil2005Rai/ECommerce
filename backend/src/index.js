import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({path: "./.env"})

console.log("test")

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error(err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed: ", error);
    process.exit(1);
  });