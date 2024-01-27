const { data } = require("../db/database");

class QuestionController {
  static async getAll(req, reply) {
    const result = [...data];

    if (!result?.length) {
      return reply.status(404).send({
        code: 404,
        status: "error",
        message: "Oops! Quiz tidak ditemukan.",
      });
    }

    return reply.code(200).send({
      code: 200,
      status: "success",
      message: "Berhasil mendapatkan data quiz",
      data: result,
    });
  }

  static async getById(req, reply) {
    const { id } = req.params;

    if (!id) {
      return reply.status(400).send({
        code: 400,
        status: "error",
        message: "ID tidak valid atau tidak ditemukan",
      });
    }

    const result = data.find((quiz) => quiz.id === Number(id));

    if (!result) {
      return reply.status(404).send({
        code: 404,
        status: "error",
        message: "Data quiz tidak ditemukan. Silahkan tambah data quiz!",
      });
    }

    return reply.status(200).send({
      code: 200,
      status: "success",
      message: "Berhasil mendapatkan data quiz",
      data: result,
    });
  }

  static async createOne(req, reply) {
    const { question, answer, category, language } = req.body;

    const payload = {
      id: data.length + 1,
      question,
      answer,
      category,
      language,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    data.push(payload);

    return reply.status(201).send({
      code: 201,
      status: "success",
      message: "Quiz berhasil ditambahkan",
    });
  }

  static async updateById(req, reply) {
    const { id } = req.params;
    const { question, answer, category, language } = req.body;

    const result = data.find((quiz) => quiz.id === Number(id));

    if (!result) {
      return reply.status(404).send({
        code: 404,
        status: "error",
        message: "Data quiz tidak ditemukan. Silahkan tambah data quiz!",
      });
    }

    const payload = {
      ...result,
      id: result.id,
      question,
      answer,
      category,
      language,
      updated_at: new Date().toISOString(),
    };

    data.splice(data.indexOf(result), 1, payload);

    return reply.status(200).send({
      code: 200,
      status: "success",
      message: "Quiz berhasil diupdate",
    });
  }

  static async deleteById(req, reply) {
    const { id } = req.params;

    const result = data.find((quiz) => quiz.id === Number(id));

    if (!result) {
      return reply.status(404).send({
        code: 404,
        status: "error",
        message: "Data quiz tidak ditemukan. Silahkan tambah data quiz!",
      });
    }

    data.splice(data.indexOf(result), 1);

    return reply.status(200).send({
      code: 200,
      status: "success",
      message: "Quiz berhasil dihapus",
    });
  }

  static async search(req, reply) {
    const { s } = req.query;

    if (!s) {
      return reply.status(400).send({
        code: 400,
        status: "error",
        message: "Query tidak valid",
      });
    }

    const result = data.filter((quiz) => {
      return (
        quiz.question.toLowerCase().includes(s.toLowerCase()) ||
        quiz.answer.toLowerCase().includes(s.toLowerCase()) ||
        quiz.category.toLowerCase().includes(s.toLowerCase()) ||
        quiz.language.toLowerCase().includes(s.toLowerCase())
      );
    });

    if (!result?.length) {
      return reply.status(404).send({
        code: 404,
        status: "error",
        message: "Quiz tidak ditemukan",
      });
    }

    return reply.status(200).send({
      code: 200,
      status: "success",
      message: "Berhasil mendapatkan data quiz",
      data: result,
    });
  }
}

module.exports = QuestionController;
