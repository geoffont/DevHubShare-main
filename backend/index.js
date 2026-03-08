// Compatibility shim for Node.js v22+ (SlowBuffer was removed)
const buffer = require("buffer");

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = Buffer;
}

require("dotenv").config();

const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.info(`Server is listening on ${port}`);
  }
});
