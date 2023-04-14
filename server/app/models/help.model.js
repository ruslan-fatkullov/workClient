module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("help", {
        email: {
            type: Sequelize.STRING
        },
        fullName: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        }
    });

    return User;
};