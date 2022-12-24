const db = require("../config/db");
const { QueryTypes } = require("sequelize");

const response = (res, statuscode, message, data) => {
  res.status(statuscode).json({
    message: message,
    data: data,
  });
};

// sync to register
exports.register = async (req, res) => {
  try {
    const { body } = req;
    const { name, email, password } = body;
    await db.query(
      `insert into tb_pentasbih
            set 
            nama_pentasbih ="${name}",
            totalhi_pentasbih = 0,
            totalbi_pentasbih = 0,
            totalti_pentasbih = 0,
            email = "${email}",
            password =" ${password}"
            
            `,
      { type: QueryTypes.INSERT }
    );

    response(res, 200, "Sukses register", []);
  } catch (error) {
    console.log(error);
    response(res, 500, error.message, []);
  }
};

// sync to login
exports.login = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    console.log(body);
    const data = await db.query(
      `select * from tb_pentasbih
            where
            email = "${email}" and
            password = "${password}"
            `,
      { type: QueryTypes.SELECT }
    );

    if (data.length > 0) {
      return response(res, 200, "Sukses login", data[0]);
    } else {
      return response(res, 400, "Email atau password salah!", []);
    }
  } catch (error) {
    console.log(error);
    response(res, 500, error.message, []);
  }
};

exports.checkUser = async (req, res) => {
  try {
    const { query } = req;
    const { id } = query;
    const data = await db.query(
      `select * from tb_pentasbih
            where
           id = "${id}"
            `,
      { type: QueryTypes.SELECT }
    );

    if (data.length > 0) {
      return response(res, 200, "Sukses login", data[0]);
    } else {
      return response(res, 400, "data tidak ditemukan", []);
    }
  } catch (error) {
    console.log(error);
    response(res, 500, error.message, []);
  }
};

exports.test = async (req, res) => {
  try {
    const data = await db.query(`select * from tb_pentasbih`, {
      type: QueryTypes.SELECT,
    });

    response(res, 200, "Sukses get data", data);
  } catch (error) {
    console.log(error);
    response(res, 500, error.message, []);
  }
};
