const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const load = verifyToken(req.headers.access_token);
    let user = await User.findByPk(load.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = { id: user.id, email: user.email, status: user.status };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authentication;
