const mongoose = require('mongoose');

const myDatabase = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        mongoose.set('runValidators', true);
    } catch (err){
        console.log(`Error ! ${err.status || 500} ${err.message || "Internal Server Error..."}`)
    }
}

module.exports = myDatabase;