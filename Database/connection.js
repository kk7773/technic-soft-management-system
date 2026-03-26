import chalk from "chalk";
import mongoose from "mongoose";


const connection = async () => {
    //LOCAL DATABASE =======
    // try {
    //     mongoose.set('strictQuery', false);
    //     await mongoose.connect("mongodb://127.0.0.1:27017/vxd");
    //     console.log(chalk.bgGreen.bold("Database is connected"))
    // } catch (error) {
    //     console.log(error)
    // }

    //Production Database=====
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb+srv://technicsoft21:${process.env.DATABASE_PASSWORD}@cluster0.znnhxam.mongodb.net/TechnicSoft`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(chalk.bgGreen.bold("Database is connected"))
    } catch (error) {
        console.log(chalk.bgRed.bold(error))
    }

}

connection();