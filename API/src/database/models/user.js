/* eslint-disable no-param-reassign */
import { hashPassword } from '../../middlewares/authenticate';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isVerified: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {},
  );
  User.beforeCreate(async (newUser) => {
    newUser.password = hashPassword(newUser.password);
  });
  User.associate = (models) => {
    User.hasMany(models.Loan, {
      foreignKey: 'userId',
      as: 'userloan',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Repayment, {
      foreignKey: 'userId',
      as: 'repayments',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return User;
};
