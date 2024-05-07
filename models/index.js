import { Sequelize } from 'sequelize';

const config = {
  username: "lvc",
  password: "lvc123",
  database: "chat",
  host: "db",
  dialect: "mysql"
} 

const sequelize = new Sequelize(config);

export default sequelize;
