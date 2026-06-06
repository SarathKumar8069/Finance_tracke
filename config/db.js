import mongoose from 'mongoose';

export const connectDB=async()=> {
    await mongoose.connect("mongodb+srv://sarathkumarballi_db_user:wWb7LjJSamMnA1oS@cluster0.ssxw8fx.mongodb.net/Expense")
    .then(()=> {console.log("DB conneted")})
}