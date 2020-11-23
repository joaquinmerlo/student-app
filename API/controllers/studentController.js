const { response } = require("express");
const db = require("../db/conex");

async function getAll(req, res) {
  const query = "SELECT * FROM alumno";
  db.query(query, (err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json([...data]).status(200);
  });
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const query = "SELECT * FROM alumno where id = " + db.escape(id);
  db.query(query, (err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(data[0]).status(200);
  });
}

async function createStudent(req, res) {
  const student = req.body;
  const query = "INSERT INTO alumno SET ?";
  db.query(query, student, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ ...student, id: results.insertId }).status(200);
  });
}

async function updateStudent(req, res) {
  const { id } = req.params;
  const student = req.body;
  const query = "UPDATE alumno SET ? where id = " + db.escape(id);
  db.query(query, student, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ ...student, id: results.insertId }).status(200);
  });
}

async function deleteStudent(req, res) {
  const { id } = req.params;
  const query = "DELETE FROM alumno where id = " + db.escape(id);
  db.query(query, (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json({ message: "Deleted" });
  });
}

module.exports = {
  getAll,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
