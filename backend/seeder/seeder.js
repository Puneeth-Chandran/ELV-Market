import mongoose from 'mongoose';
import products from './data.js';
import Product from '../models/product.js';

const seedProducts = async()=>{
    try{
        await mongoose.connect("mongodb+srv://cableshousetrial:4lAfSczp4q1yEhG7@cableshousetrail.4wfotvj.mongodb.net/");

        await Product.deleteMany();
        console.log("Products are deleted");

        await Product.insertMany(products);
        console.log("Products are added");

        process.exit();
         
    } catch(error){
        console.log(error.message)
        process.exit();
    }
}

seedProducts();