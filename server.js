const Hapi = require("@hapi/hapi");

const server = new Hapi.Server({
  port: 8765,
  host: "localhost",
});

async function runtime() {
  throw new Error("Not implemented!");
  // await server.start();
  // console.log("Server running at:", server.info.uri);
}

runtime();
