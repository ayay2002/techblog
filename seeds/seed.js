const sequelize = require("../config/connection");
const { User, Blog } = require("../models");

const userD = require("./userD.json");
const blogD = require("./blogD.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userD, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogD) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();