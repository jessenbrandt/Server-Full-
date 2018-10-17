module.exports = (sequelize, DataTypes) => {
    const Org = sequelize.define('org', {
        nameOfOrg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        purpose: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        needs: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

return Org;
}