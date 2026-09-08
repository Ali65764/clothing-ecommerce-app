import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

const uploadImage = async (file) => {
    const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
    return result.secure_url
}

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" })
        }

        const imageUrl = await uploadImage(req.file)

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imageUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save() 

        res.json({success: true, message: "Product Added"})
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}


const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({});
        res.json({success: true, products})
    } catch(err){
        console.log(err);
        res.json({success: false, message: err.message})
    }
}

const updateProduct = async (req, res) => {
    try{
        const product = await productModel.findById(req.params.id)
        if(!product){
            return res.status(404).json({success: false, message:"Product not found"})
        }

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const updateData = {}
        if(name !== undefined) updateData.name = name
        if(description !== undefined) updateData.description = description
        if(price !== undefined) updateData.price = Number(price)
        if(category !== undefined) updateData.category = category
        if(subCategory !== undefined) updateData.subCategory = subCategory
        if(sizes !== undefined) updateData.sizes = JSON.parse(sizes)
        if(bestseller !== undefined) updateData.bestseller = bestseller === 'true' ? true : false

        if(req.file){
            updateData.image = await uploadImage(req.file)
        }

        const updated = await productModel.findByIdAndUpdate(req.params.id, updateData, { new: true })

        res.json({success: true, message:"Product Updated", product: updated})
    } catch(err){
        console.log(err);
        res.json({success: false, message: err.message})
    }
}

const removeProduct = async (req, res) => {
    try{
        const product = await productModel.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).json({success: false, message:"Product not found"})
        }
        res.json({success: true, message:"Product Removed"})
    } catch(err){
        console.log(err);
        res.json({success: false, message: err.message})
    }
}

const singleProduct = async (req, res) => {
    try{
        const product = await productModel.findById(req.params.id)
        if(!product){
            return res.status(404).json({success: false, message:"Product not found"})
        }
        res.json({success: true, product})
    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message})
    }
}

export { addProduct, listProducts, removeProduct, singleProduct, updateProduct }

