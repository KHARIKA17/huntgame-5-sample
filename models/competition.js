/**
 *  Team model
 *  Describes the characteristics of each attribute in a Team resource.
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 * https://sequelize.org/master/manual/validations-and-constraints.html
 *
 * For validators see: https://github.com/validatorjs/validator.js
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
    db.define('competition', {
      // sqlite creates a rowid attribute automatically
      competitionName: {
        type: DataTypes.STRING(30),
        unique: true,
        required: true,
        allowNull: false,
        defaultValue: 'Team',
        validate: {
          is: {
            args: /^[A-Za-z]+$/i, // matches a RegExp
            msg: 'Name is only letters, no spaces or punctuation.',
          },
          notNull: {
            args: true,
            msg: 'Name cannot be null.',
          },
          notEmpty: {
            args: true, // RegExp- only letters, no spaces
            msg: 'Name cannot be empty.',
          },
          max: {
            args: [30],
            msg: 'Name is limited to 32 characters.',
          },
          min: {
            args: [3],
            msg: 'Name must be at least 3 characters.',
          },
        },
      },
      creatorUserId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        required: true,
        validate: {
          max: {
            args: 100,
            msg: 'Age must be 100 or less.',
          },
          min: {
            args: 1,
            msg: 'Age must be 1 or more.',
          },
        },
      },
      questId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        required: true,
        validate: {
          max: {
            args: 100,
            msg: 'Age must be 100 or less.',
          },
          min: {
            args: 1,
            msg: 'Age must be 1 or more.',
          },
        },
      },
      dateTimeCreated: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('dateTimeCreated')).format('MM/DD/YYYY hh:mm:ss');
        }
    },
    startDateTime: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('startDateTime')).format('MM/DD/YYYY hh:mm:ss');
        }
    },
    endDateTime: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('endDateTime')).format('MM/DD/YYYY hh:mm:ss');
        }
      },
      

     // isCartoon: {
//type: DataTypes.BOOLEAN,
//defaultValue: true,
//},
    });
  };
  