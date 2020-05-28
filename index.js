const express = require("express"); // import express
const port = process.env.PORT || 4000;

const userRouter = require("./routers/user"); // import router
const imageRouter = require("./routers/image"); // import router
const authRouter = require("./routers/auth");

const app = express();
const jsonParser = express.json(); // parser middleware

app.use(jsonParser);
app.use("/users", userRouter); // register router
app.use("/images", imageRouter); // register router
app.use("/auth", authRouter);

app.listen(port, () => console.log("success! listening on port"));
