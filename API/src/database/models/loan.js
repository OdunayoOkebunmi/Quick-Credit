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
        allowNull: false,
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
      },
      balance: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      interest: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {},
  );
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
