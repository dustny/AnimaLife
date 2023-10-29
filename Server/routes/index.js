const Controller = require("../controllers");
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/Authentication");
const authorization = require("../middlewares/authorization");
const authorizationPremium = require("../middlewares/AuthorizationPremium");
const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.use(authentication);
router.delete("/user", Controller.deleteAccount);
router.post("/generate_midtrans_token", Controller.GenerateMTToken);
router.patch("/subscription", Controller.subscription);
router.get("/fact", Controller.getFactAnimal);
router.get("/search",authorizationPremium, Controller.fetchAnimalByType);
router.get("/data", Controller.fetchAnimalRegion);
router.put("/profile", authorization, Controller.editProfile);
router.post("/bot", Controller.botChat);

router.use(errorHandler);
module.exports = router;