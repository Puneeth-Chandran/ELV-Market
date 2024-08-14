import express from 'express';
import { deleteProducts, getProductdetails, getProducts, newProduct, updateProducts } from "../controllers/productControllers.js";
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(newProduct);

router.route("/products/:id").get(getProductdetails);
router.route("/products/:id").put(updateProducts);
router.route("/products/:id").delete(deleteProducts);

export default router;