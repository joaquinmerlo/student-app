const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const db = require("../db/conex");

const SECRET_WORD = "newsecretword";
const saltNumber = 10;

function verifyRequest(req, res, next) {
  if (req.method !== "GET") {
    if (!req.headers.authorization)
      return res
        .status(403)
        .send(
          "No ha enviado las credenciales, por favor inicie sesion nuevamente!"
        );
    const token = req.headers.authorization;
    const isValidToken = verifyToken(token);
    if (!isValidToken) return res.status(401).send("Expiró su sesion");
  }
  next();
}

async function authenticate(req, res) {
  const { email, password } = req.body;
  const query = "SELECT * FROM user where email = " + db.escape(email);
  db.query(query, async (err, result) => {
    if (err) {
      res.status(500).send("err");
      return;
    }
    if (result.length === 0) {
      res
        .status(409)
        .send(`No se ha encontrado el usuario con email: ${email}`);
      return;
    }
    const user = result[0];
    await comparePassword(password, user.password).then((val) => {
      if (!val) {
        res.status(409).send(`Contraseña incorrecta`);
        return;
      } else {
        const { id, name } = user;
        res
          .json({
            id,
            name,
            email,
            token: generateToken({ name, email }),
          })
          .status(200);
      }
    });
  });
}

async function getActiveUser(req, res) {
  const token = req.headers.authorization || "";
  if (!token) {
    res.status(200).send("Sin token");
    return;
  }
  const decoded = verifyToken(token);
  const { name, email } = decoded;
  res.status(200).json({
    name,
    email,
    token,
  });
  return;
}

async function singUp(req, res) {
  const { name, email, password } = req.body;

  const querySelect = "SELECT * FROM user WHERE email = " + db.escape(email);
  db.query(querySelect, async (err, rows) => {
    if (err) {
      res.json({ error: err }).status(500);
      return;
    }
    if (rows.length > 0) {
      res
        .json({ error: `The user with email ${email} already exist` })
        .status(409);
      return;
    }
    const hashed = await hashPassword(password);
    db.query(
      "INSERT INTO user SET ?",
      { name, email, password: hashed },
      (err, result) => {
        if (err) {
          res.json({ error: err }).status(500);
          return;
        }
        res
          .json({
            id: result.insertId,
            name,
            email,
            token: generateToken({ name, email }),
          })
          .status(200);
      }
    );
  });
}

function generateToken(data, expiresIn = "24h") {
  return jwt.sign(data, SECRET_WORD, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(
    token.replace("Bearer ", ""),
    SECRET_WORD,
    (err, decoded) => {
      if (err) return false;
      return decoded;
    }
  );
}

async function hashPassword(str) {
  const hashed = await bcryptjs.hash(str, saltNumber);
  return hashed;
}

async function comparePassword(pass, hashed) {
  return await bcryptjs.compare(pass, hashed);
}

module.exports = {
  verifyRequest,
  authenticate,
  singUp,
  getActiveUser,
};
