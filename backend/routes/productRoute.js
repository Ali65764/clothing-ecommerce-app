import express from 'express'
import { addProduct, singleProduct, removeProduct, listProducts, updateProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRoute = express.Router();

productRoute.get("/", listProducts)
productRoute.get("/:id", singleProduct)
productRoute.post("/", adminAuth, upload.single("image"), addProduct)
productRoute.put("/:id", adminAuth, upload.single("image"), updateProduct)
productRoute.delete("/:id", adminAuth, removeProduct)

export default productRoute
