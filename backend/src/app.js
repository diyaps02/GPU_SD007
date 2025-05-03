import express from "express";
import cors from "cors";
const app = express();
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: "true", limit: "16kb" }));
app.use(express.static("public"));

import mainRouter from "./api/routes/recommendation.routes.js";

app.use("/api/v1", mainRouter);

export default app;
