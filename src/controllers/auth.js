/** @format */

const authModel = require("../models/auth");
const formResponse = require("../helpers/forms/form");

const authController = {
  register: (req, res) => {
    authModel
      .postNewUser(req.body)
      .then((data) => {
        const responseData = {
          msg: "Register succses",
        };
        formResponse.success(res, responseData);
      })
      .catch((error) => {
        formResponse.error(res, error);
      });
  },
  login: (req, res) => {
    authModel
      .loginUser(req.body)
      .then((data) => {
        formResponse.success(res, data);
      })
      .catch((err) => {
        formResponse.error(res, err);
      });
  },
};

module.exports = authController;