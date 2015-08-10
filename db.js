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
         * @return     {void}
         */
        all: function (callback) {
            setTimeout(function () {
                callback(null, userIds);
            }, 10);
        },
        /**
         * Returns user by index
         *
         * @param      {number}   id      index in array of users
         *
         * @return     {void}
         */
        find: function (id, callback) {
            setTimeout(function () {
                var user = users[id];
                if (!user)
                    callback(new Error("No user with id", id));
                else
                    callback(null, user);
            }, 10);
        }
    }
}
