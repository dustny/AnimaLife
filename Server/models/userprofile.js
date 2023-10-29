'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }
  }
  UserProfile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "First name is required"
        },
        notEmpty: {
          msg: "First name is required"
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Last name is required"
        },
        notEmpty: {
          msg: "Last name is required"
        },
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Username is required"
        },
        notEmpty: {
          msg: "Username is required"
        },
      }
    },
    photoProfile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Photo profile is required"
        },
        notEmpty: {
          msg: "Photo profile is required"
        },
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      allowNull :false,
      unique:true,
      validate:{
        notNull:{
          msg: "userId is Required"
        },
        notEmpty:{
          msg: "userId is Required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};