var request = require('request');

module.exports = {
    getAllBasketballFields: () => {
        return new Promise(function (resolve, reject) {
            request('https://basketball-fields.herokuapp.com/api/basketball-fields', function (error, response, body) {

                if (error) {
                    return reject(error);
                }
                else {
                    resolve(body);
                }
            });
        });
    },

    getBasketballFieldById: (id) => {
        return new Promise(function (resolve, reject) {
            request(`https://basketball-fields.herokuapp.com/api/basketball-fields/${id}`, function (error, response, body) {

                if (error) {
                    return reject(error);
                }
                else {
                    resolve(body);
                }
            });
        });
    }
}
