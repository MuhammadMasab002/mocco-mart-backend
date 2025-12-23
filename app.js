import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    // origin: "*"   // NOT ALLOWED when credentials are used
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static('public'));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// API ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Moco Mart API");
});
app.use("/api", router);

export default app;
