import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts } from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/addProduct").post(upload.single("image"), addProduct)
router.route("/deleteProduct").post(deleteProduct)
router.route("/allProducts").get(getAllProducts)

export default router;
