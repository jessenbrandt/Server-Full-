module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define('events', {
        eventName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventLocation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Events;

}