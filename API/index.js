const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const authController = require("./controllers/authController");

const app = express();
const port = process.env.PORT || 5000;
app.use(
  express.json({
    inflate: true,
    reviver: null,
    strict: true,
    type: "application/json",
  })
);
app.use(cors());
app.use("/students", authController.verifyRequest);
app.use(router);

app.listen(port, () => {
  console.log("listen on port " + port);
});
