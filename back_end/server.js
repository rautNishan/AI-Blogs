const express = require("express");
const app = express();
const port = 3000;

//User Router
const userRoute = require("./routes/user.router");

app.use("/users", userRoute);

app.get("/", (req, res) => {
  console.log("Blog Website Backend");
  res.send("Blog Website Backend");
});

//Router Setup


app.listen(port, () => {
  console.log(`Listing to the port ${port}`);
});
