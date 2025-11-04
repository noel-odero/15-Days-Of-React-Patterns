import express from "express";
import usersRouter from "./routes/users.mjs";

const app = express();

app.use(express.json());


const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(loggingMiddleware);
app.use(usersRouter);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
