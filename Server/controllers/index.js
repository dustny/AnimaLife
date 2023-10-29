const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {
  User,
  UserProfile,
  Asia,
  America,
  Africa,
  Antartica,
  Australia,
  Europe,
} = require("../models");
const midtransClient = require("midtrans-client");
const axios = require("axios");
const OpenAI = require("openai");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, firstName, lastName, username, photoProfile } =
        req.body;
      const newUser = await User.create({
        email,
        password,
        status: "normal",
      });
      const id = newUser.id;
      const userProfile = await UserProfile.create({
        firstName,
        lastName,
        username,
        photoProfile,
        UserId: id,
      });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        status: newUser.status,
        userProfile,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmailNull" };
      }
      if (!password) {
        throw { name: "PasswordNull" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "UserNotFound" };
      }
      const passwordValid = comparePassword(password, user.password);
      if (!passwordValid) {
        throw { name: "PasswordInvalid" };
      }
      const token = signToken({
        id: user.id,
        email: user.email,
        status: user.status,
      });
      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editProfile(req, res, next) {
    try {
      const { firstName, lastName, username, photoProfile } = req.body;
      const profile = await UserProfile.findOne({
        where: { UserId: req.user.id },
      });
      console.log(req.body);
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.username = username;
      profile.photoProfile = photoProfile;
      await profile.save();
      res.status(200).json({ message: "Success edit profile" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async GenerateMTToken(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (user.status == "premium") {
        throw { name: "already_subscribe" };
      }

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            `AnimaLife_` + Math.floor(5000000 + Math.random() * 1000000),
          gross_amount: 50000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const midtrans_token = await snap.createTransaction(parameter);
      res.status(201).json(midtrans_token);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async subscription(req, res, next) {
    try {
      await User.update({ status: "premium" }, { where: { id: req.user.id } });
      res.status(200).json({ message: `You already a subscriber` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchAnimalByType(req, res, next) {
    try {
      const { name } = req.query;
      const response = await axios({
        method: "get",
        url: `https://api.api-ninjas.com/v1/animals?name=${name}`,
        headers: {
          "X-Api-Key": process.env.API_NINJAS_X_API,
        },
      });
      const image = await axios({
        method: "get",
        url:
          `https://api.unsplash.com/search/photos?query=${name}&client_id=` +
          process.env.PUBLIC_UNSPLASH_CLIENT_ID,
      });
      const imageUrl = image.data.results[0].urls.full;
      res.status(200).json({ animal: response.data[0], image: imageUrl });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getFactAnimal(req, res, next) {
    try {
      const hewan = [
        "cat",
        "dog",
        "bird",
        "panda",
        "redpanda",
        "koala",
        "fox",
        "whale",
        "dolphin",
        "kangaroo",
        "rabbit",
        "lion",
        "bear",
        "frog",
        "duck",
        "penguin",
        "axolotl",
        "capybara",
        "hedgehog",
        "turtle",
        "narwhal",
        "squirrel",
        "fish",
        "horse",
      ];
      const randomAnimal = hewan[Math.floor(Math.random() * hewan.length)];

      const animality = `https://api.animality.xyz`;

      const fact = await axios({
        method: "get",
        url: animality + `/all/${randomAnimal}`,
      });
      res.status(200).json(fact.data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteAccount(req, res, next) {
    try {
      await UserProfile.destroy({ where: { UserId: req.user.id } });
      await User.destroy({ where: { id: req.user.id } });
      res.status(200).json({ message: "User success to be delete" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async botChat(req, res, next) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const message = req.body.message;
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are an animal expert, and you are a scientist" },
          { role: "user", content: `${message}` },
        ],
        model: "gpt-3.5-turbo",
      });
      res.status(200).json(chatCompletion.choices[0].message.content);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchAnimalRegion(req, res, next) {
    try {
      const asiaAnimal = await Asia.findAll();
      const americaAnimal = await America.findAll();
      const antarticaAnimal = await Antartica.findAll();
      const australiaAnimal = await Australia.findAll();
      const europeAnimal = await Europe.findAll();
      const africaAnimal = await Africa.findAll();
      res
        .status(200)
        .json({
          asiaAnimal,
          americaAnimal,
          antarticaAnimal,
          australiaAnimal,
          europeAnimal,
          africaAnimal,
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
