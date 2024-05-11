import sequelize from '../models/index.js'
import { DataTypes } from 'sequelize';

const Chat = sequelize.define(
  'chat',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    summoner: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    tableName: 'chat',
    timestamps: true,
    paranoid: true
  }
);

export default Chat;