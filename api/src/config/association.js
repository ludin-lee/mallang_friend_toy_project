export default function associationAll(db) {
  // friend-pointHistory 1:N관계
  db.pointHistory.belongsTo(db.friend, {
    as: "friendId_friends",
    foreignKey: "friendId",
    onDelete: "cascade",
  });
  db.friend.hasMany(db.pointHistory, {
    as: "pointHistories",
    foreignKey: "friendId",
    onDelete: "cascade",
  });

  //user-friend 1:N 관계
  db.friend.belongsTo(db.user, {
    as: "fownerId_users",
    foreignKey: "ownerId",
    onDelete: "cascade",
  });
  db.user.hasMany(db.friend, {
    as: "friends",
    foreignKey: "ownerId",
    onDelete: "cascade",
  });
}
