const mongoose = require('mongoose');
const User = require('../backend/src/models/User.model');
const Group = require('../backend/src/models/Group.model');

const MONGODB_URI = "mongodb+srv://goawaysuee:Nguyen%400712@localhost0712.8o4p9c0.mongodb.net/";

const accounts = [
  {
    email: "existing@test.com",
    name: "Existing User",
    password: "Abc@1234",
    role: "user",
    isActive: true,
    isEmailVerified: true
  },
  {
    email: "active@test.com",
    name: "Active User",
    password: "Abc@1234",
    role: "user",
    isActive: true,
    isEmailVerified: true
  },
  {
    email: "locked@test.com",
    name: "Locked User",
    password: "Abc@1234",
    role: "user",
    isActive: false,
    isEmailVerified: true
  },
  {
    email: "admin@test.com",
    name: "Admin User",
    password: "Admin@1234",
    role: "admin",
    isActive: true,
    isEmailVerified: true
  }
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB:", mongoose.connection.name);

  let created = 0;
  for (const acc of accounts) {
    await User.deleteMany({ email: acc.email });
    
    // By using User.create(), it will trigger the pre-save hook and use Node's bcrypt!
    const user = await User.create(acc);
    
    await Group.create({
      name: 'Personal Workspace',
      description: 'Your personal workspace',
      createdBy: user._id,
      isPersonalWorkspace: true,
      members: [{ userId: user._id, role: null, joinedAt: new Date() }]
    });

    console.log(`✅ Created: ${acc.email}`);
    created++;
  }
  
  console.log(`Done. Created: ${created}`);
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
