export default function (sequelize, DataTypes) {
  return sequelize.define(
    "friend",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      point: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      ownerId: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
      paranoid: true,
    }
  );
}
