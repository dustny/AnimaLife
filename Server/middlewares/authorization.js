const { UserProfile } = require("../models");

async function authorization(req, res, next) {
  try {
    const userProfile = await UserProfile.findOne({where: {UserId:req.user.id}});
    if (!userProfile) {
      throw { name: "ProfileNotFound" };
    }
    if(req.user.id !== userProfile.UserId){
      throw {name: "Forbidden"}
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authorization;
