const QuizController = require("../controllers/quiz.controller.js");

const { getAll, getById, createOne, updateById, deleteById, search } =
  QuizController;

const QuizRoutes = (fastify, option, done) => {
  fastify.get("/quizzes", option, getAll);
  fastify.get("/quiz", option, search);
  fastify.get("/quiz/:id", option, getById);
  fastify.post("/quiz", option, createOne);
  fastify.put("/quiz/:id/update", option, updateById);
  fastify.delete("/quiz/:id/delete", option, deleteById);

  done();
};

module.exports = QuizRoutes;
