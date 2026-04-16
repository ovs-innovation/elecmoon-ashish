require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

const getAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admins = await Admin.find({ role: "Super Admin" });
    if (admins.length > 0) {
      console.log("SUPER_ADMIN_EMAILS:");
      admins.forEach(admin => {
        console.log(`- ${admin.email}`);
      });
    } else {
      const anyAdmins = await Admin.find({});
       console.log("ALL_ADMIN_EMAILS:");
       anyAdmins.forEach(admin => {
        console.log(`- ${admin.email} (${admin.role})`);
      });
    }
    process.exit();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

getAdmin();
