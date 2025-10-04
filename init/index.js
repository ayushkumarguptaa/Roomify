const mongoose = require('mongoose');
const initData = require('./data')
const Listing = require('../models/listing')

async function main(){
    await mongoose.connect("mongodb://localhost:27017/wanderlust");
}
main()
.then(()=>{
    console.log("connected!!");
})
.catch((err)=>{
    console.log(err);
})

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj, owner:"68133bb72a1d4cd77f8c9b0b",
    }))
    await Listing.insertMany(initData.data);
    console.log("inserted!!");
}
initDB();