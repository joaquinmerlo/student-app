const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authController = require("../controllers/authController");

router.get("/students", studentController.getAll);
router.get("/students/:id", studentController.getStudentById);
router.post("/students/add/", studentController.createStudent);
router.put("/students/edit/:id", studentController.updateStudent);
router.delete("/students/:id", studentController.deleteStudent);

router.post("/auth/authenticate", authController.authenticate);
router.post("/auth/register", authController.singUp);
router.get("/auth/user", authController.getActiveUser);

module.exports = router;
