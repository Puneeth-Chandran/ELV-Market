import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter product name'],
        maxlength: [200, 'Product name cannot exceed 200 characters']
    },
    price:{
        type:Number,
        required:[true,'Please enter product price'],
        maxlength: [8, 'Product price cannot exceed 8 digits']
    },
    description:{
        type:String,
        require:[true,'Please enter the description']
    },
    // brand:{
    //     type:String,
    //     require:[true, 'Please enter the brand name']
    // },
    // about_brand:{
    //     type:String,
    //     require:[true,'Please enter the description']
    // },
    ratings:{
        type: Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type:String,
                required: true
            },
            url:{
                type:String,
                required: true
            },
        },
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: ['Cat6', 'Cat7', 'Cat8'],
            message: 'Please select correct category for this product'
        }
    },
    // subcategory: {
    //     type: String,
    //     required: false,
    //     enum: {
    //         values: ['Subcat1', 'Subcat2', 'Subcat3'],
    //         message: 'Please select a correct subcategory for this product'
    //     }
    // }

    stock:{
        type:Number,
        required:[true, 'Please enter the product stock']
    },
    numOfReviews:{
        type: Number,
        default: 0,
    },
    reviews:[{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        rating:{
            type:Number,
            required: true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    
  },{timestamps:true});

  export default mongoose.model("Product",productSchema)