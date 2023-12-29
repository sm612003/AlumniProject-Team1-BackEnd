import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import blogRouter from "./src/routes/Blogs.js";
import newsRouter from "./src/routes/News.js";
import newsletterRouter from "./src/routes/Newsletter.js";
import categoryRouter from "./src/routes/Category.js";
import emailRouter from "./src/routes/Email.js";
// import connect from "./src/config/config.js";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
import router from "./src/routes/OAuth.js";
<<<<<<< HEAD
dotenv.config();
=======
import subscribedrouter from "./src/routes/SubscribedUser.js";
dotenv.config()
>>>>>>> souhad-dashboard
const app = express();
const PORT = process.env.PORT;

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use("/images", express.static(process.cwd() + "/images"));

app.listen(PORT, () => {
  // connect()
  console.log(`running on port ${PORT}`);
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use("/", blogRouter);
app.use("/", newsRouter);
app.use("/", newsletterRouter);
app.use("/", categoryRouter);
app.use("/", emailRouter);
app.use("/user", userRoutes);
<<<<<<< HEAD
app.use("/google", router);

=======
app.use("/google", router)
app.use('/',subscribedrouter)
>>>>>>> souhad-dashboard
