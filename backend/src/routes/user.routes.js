import { Router } from "express"
import { addToCart, getCartItems, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/addToCart").post(verifyJWT,addToCart)
router.route("/getCartItems").get(verifyJWT,getCartItems)

export default router;