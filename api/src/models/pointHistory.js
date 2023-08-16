export default function (sequelize, DataTypes) {
  return sequelize.define(
    "pointHistory",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      friendId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING(256),
      },
      point: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          fields: ["friendId"],
        },
      ],
      paranoid: true,
    }
  );
}
