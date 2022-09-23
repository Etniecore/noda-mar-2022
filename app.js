// const fs = require('fs/promises');
// const path = require('path');

// const sortBoysFolder = async () => {
//     try {
//         const boysFolderPath = path.join(__dirname, 'boys');
//         const girlsFolderPath = path.join(__dirname, 'girls');
//
//         const files = await fs.readdir(boysFolderPath);
//         for (const file of files) {
//             const filePath = path.join(boysFolderPath,file)
//             const data =  await fs.readFile(filePath);
//             const user = JSON.parse(data);
//             if(user.gender !== 'male'){
//                 await fs.rename(filePath,path.join(girlsFolderPath,file));
//             }
//         }
//     }catch (e){
//         console.error(e)
//     }
// }
//
// sortBoysFolder();
//
// const sortGirlsFolder = async () => {
//     try {
//         const boysFolderPath = path.join(__dirname, 'boys');
//         const girlsFolderPath = path.join(__dirname, 'girls');
//
//         const files = await fs.readdir(girlsFolderPath);
//         for (const file of files) {
//             const filePath = path.join(girlsFolderPath,file)
//             const data =  await fs.readFile(filePath);
//             const user = JSON.parse(data);
//             if(user.gender !== 'female'){
//                 await fs.rename(filePath,path.join(boysFolderPath,file));
//             }
//         }
//
//     }catch (e){
//         console.error(e)
//     }
// }
//
// sortGirlsFolder();


// const reader = async (folderPath) =>{
//     const files = await fs.readdir(folderPath);
//
//
//     for (const file of files) {
//         const filePath = path.join(folderPath,file);
//         const stat = await fs.stat(filePath);
//
//         if (stat.isFile()){
//             await fs.rename(filePath,path.join(__dirname,'folder',file));
//         }
//         if(stat.isDirectory()){
//             await reader(filePath)
//         }
//     }
// }
// reader(path.join(__dirname,'folder'))


// SERVER
const express = require('express');
//mongoose
const mongoose = require('mongoose');

//routes
const {userRouter, carRouter, authRouter} = require('./routes');
const {ErrorHandler, ApiError} = require("./errors");
const {PORT,MONGO_URL} = require("./configs/config");


//app configurations
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//controllers and routes
app.use('/cars',carRouter);
app.use('/users',userRouter);
app.use('/auth', authRouter);

//errors handler
app.use('*',()=>{
    throw new ApiError('Route was not found')
})
app.use(ErrorHandler);

//server
app.listen(PORT, () => {
    console.log('Server Started', PORT)
    mongoose.connect(MONGO_URL);
})