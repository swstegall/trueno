import { Sequelize, DataTypes } from "sequelize";

const dbName = process.env.POSTGRES_DB || "";
const dbUser = process.env.POSTGRES_USER || "";
const dbPassword = process.env.POSTGRES_PASSWORD || "";
const dbHost = process.env.DB_HOST || "";
const dbPort = process.env.DB_PORT || "";

export const db: any = {};

let sequelize: any = new Sequelize(dbName, dbUser, dbPassword, {
  pool: {
    max: 1,
    min: 0,
  },
  define: {
    freezeTableName: true,
  },
  dialect: "postgres",
  host: dbHost,
  port: parseInt(dbPort, 10),
  ssl: true,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const credentials = db.sequelize.define(
  "credentials",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "credentials",
    timestamps: true,
  }
);

const users = db.sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

const messages = db.sequelize.define(
  "messages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "messages",
    timestamps: true,
  }
);

credentials.belongsTo(users, { foreignKey: "id" });
users.hasOne(credentials, { foreignKey: "id" });
messages.belongsTo(users, { foreignKey: "id" });
users.hasMany(messages, { foreignKey: "userId" });

db.credentials = credentials;
db.users = users;
db.messages = messages;

export default db;
