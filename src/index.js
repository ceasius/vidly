const genres = require("./routes/genres");
const express = require("express");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const app = express();

app.use(express.json());
app.use("/api/genres", genres);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
