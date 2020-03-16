module.exports = (sequelize, DataTypes) => {
  const Repayment = sequelize.define(
    'Repayment',
    {
      loanId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      amount: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {},
  );
  Repayment.associate = (models) => {
    Repayment.belongsTo(models.Loan, {
      foreignKey: 'loanId',
      as: 'repayments',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Repayment;
};
