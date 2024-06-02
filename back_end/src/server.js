const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
//User Router
const userRoute = require("./routes/user.router");
const GlobalErrorFilter = require("./middlewares/errors/error.filter");




app.use("/users", userRoute);

app.get("/", (req, res) => {
  console.log("Blog Website Backend");
  res.send("Blog Website Backend");
});

//Router Setup

app.use(GlobalErrorFilter);

app.listen(port, () => {
  console.log(`Listing to the port ${port}`);
});
