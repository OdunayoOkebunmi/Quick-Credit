/* eslint-disable no-param-reassign */
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define(
    'Loan',
    {
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      amount: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      tenor: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      paymentInstallment: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        values: ['pending', 'approved', 'rejected'],
        defaultValue: 'pending',
        allowNull: false,
      },
      repaid: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      balance: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      interest: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
    },
    {},
  );

  Loan.beforeCreate((newLoan) => {
    newLoan.interest = newLoan.amount * 0.05;
    newLoan.paymentInstallment = ((newLoan.amount + newLoan.interest) / newLoan.tenor);
    newLoan.balance = newLoan.paymentInstallment * newLoan.tenor;

    console.log(newLoan);
    return newLoan;
  });
  Loan.associate = (models) => {
    Loan.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'loans',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Loan.hasMany(models.Repayment, {
      foreignKey: 'loanId',
      as: 'repayments',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Loan;
};
