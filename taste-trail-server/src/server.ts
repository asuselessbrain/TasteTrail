import app from './app';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect("mongodb+srv://arfan19:QSY86AS.at37nc9@cluster0.zfaaptg.mongodb.net/TasteTrail?appName=Cluster0");

    app.listen(5000, () => {
      console.log(`Example app listening on port ${5000}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();