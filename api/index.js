const express = require("express");
const bootstrap = require("./src/boostrap");

const app = express();
bootstrap(app, express.Router());

const PORT = 80;
app.listen(PORT, (err) => {
  if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
  console.log(`Server Listening at: http://localhost:${PORT}/`);
});
