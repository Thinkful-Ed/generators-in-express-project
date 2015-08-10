// A generated set of users for our sample data
var users = require('./users').map(function (v, i) { v.id = i; return v; });
// An array user ids
var userIds = users.map(function (v) { return v.id; });

module.exports = {
    /**
     * A mocked collection object
     */
    users: {
        /**
         * Returns all user ids (array indices)
         *
         * @return     {Promise}  An array of user ids
         */
        all: function () {
            return new Promise(function (resolve, reject) {
                resolve(userIds);
            });
        },
        /**
         * Returns user by index
         *
         * @param      {number}   id      index in array of users
         *
         * @return     {Promise}  the value at index
         */
        find: function (id) {
            return new Promise(function (resolve, reject) {
                users[id] ?
                    resolve(users[id])
                :   reject(new Error("No users with id", id));
            });
        }
    }
}
