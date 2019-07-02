const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_api');

const User = conn.define('user', {

  name:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  }

})

const Department = conn.define('department', {

  name:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  }

})

User.belongsTo(Department);
Department.hasMany(User);


const syncAndSeed = async ()=> {

  try{
  await conn.sync({ force: true});
  const departments = ['HR', 'Engineering', 'Sales'];
  const [hr, engineering, sales] = await Promise.all(departments.map(dept => Department.create({dept})));
  const users = ['Ryan', 'Jason', 'Matt'];
  const [ryan, jason, matt] = await Promise.all(users.map(user => User.create({user})));
  }
  catch(err){
    console.log(err);
  }
}

syncAndSeed();
