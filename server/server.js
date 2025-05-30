import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; 
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";

// App Config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB()

// Use raw parser only for webhooks
app.use("/api/user/webhooks", bodyParser.raw({ type: "application/json" }));

// Intialize Middlewares
app.use(express.json())
app.use(cors())

// API routes
app.get("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/user/webhooks" , userRouter)

app.listen(PORT, () => console.log("Server Running on port " + PORT));
