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
    type: Sequelize.UUIDV4,
    primaryKey: true
  }

})


