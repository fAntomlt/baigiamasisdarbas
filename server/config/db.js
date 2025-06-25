const mongoose = require('mongoose');
const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Prie duomenu bazes prisijungta sekmingai');
  }catch(error){
    console.error('Prie duomenu bazes prisijungti nepavyko nes:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;