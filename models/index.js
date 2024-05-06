import config from '../config/config.json' assert { type: "json" }
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(config.development);

export default sequelize;
