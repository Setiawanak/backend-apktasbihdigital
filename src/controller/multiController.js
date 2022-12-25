const db = require("../config/db");
const { QueryTypes } = require("sequelize");
const moment = require("moment");

const response = (res, statuscode, message, data) => {
  res.status(statuscode).json({
    message: message,
    data: data,
  });
};

exports.createHistory = async (req, res) => {
  try {
    const { target, tercapai, user_id } = req.body;

    await db.query(
      `insert into tb_user_history
        set tanggal = "${moment().format("YYYY-MM-DD hh:mm:ss")}",
        target = "${target}",
        tercapai = "${tercapai}",
        user_id = "${user_id}"
      `,
      {
        type: QueryTypes.INSERT,
      }
    );

    response(res, 200, "Sukses create history", []);
  } catch (error) {
    console.log(error);
    response(res, 500, error.message, []);
  }
};

exports.getAllHistoryByUserId = async (req, res) => {
  try {
    const { user_id } = req.query;

    const data = await db.query(
      `select * from tb_user_history
        where user_id = "${user_id}"
        order by id desc
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    const resData = data.map((item) => {
      const { tanggal, target, tercapai, user_id, id } = item;

      return {
        id: id,
        tanggal: moment.utc(tanggal).format("DD-MM-YYYY"),
        waktu: moment.utc(tanggal).format("hh:mm:ss"),
        target: target,
        tercapai: tercapai,
        user_id: user_id,
      };
    });

    response(res, 200, "Sukses get all history by user id", resData);
  } catch (error) {
    console.log(error);
    response(res, 500, error.message, []);
  }
};
