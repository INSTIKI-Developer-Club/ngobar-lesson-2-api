const fastify = require("fastify");
const cors = require("@fastify/cors");
const helmet = require("@fastify/helmet");
const rateLimit = require("@fastify/rate-limit");
const compression = require("@fastify/compress");

const Quiz = require("./routes/index.routes");

const app = fastify({
  logger: true,
});

/**
 * Register plugins
 *
 */

app.register(compression, {
  encodings: ["gzip", "deflate"],
  threshold: 1024,
});
app.register(helmet);
app.register(rateLimit, {
  max: 1000,
  timeWindow: "10 minute",
});
app.register(cors, {
  origin: "*",
});

/**
 * Routes for the application
 */

app.get("/", (request, reply) =>
  reply.send({
    code: 200,
    status: "success",
    message: "Hi, Mentee IDC FrontEnd Beginner Class. Welcome to Lesson 2",
    time: new Date().getTime(),
  })
);

app.register(Quiz, { prefix: "/api" });

try {
  app.listen({
    host: "127.0.0.1",
    port: 8200,
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
