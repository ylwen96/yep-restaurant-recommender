module.exports.createErrorResponse = function (code, err) {
    if (code == 400) {
        return {
            status: 'error',
            error: {
                code: 400,
                message: "error found due to " + err
            }
        };
    } else if (code == 500) {
        return {
            status: 'error',
            error: {
                code: 500,
                message: "data base connection error due to " + err
            }
        };
    } else {
        return {
            status: 'error',
            error: {
                code: 404,
                message: "resource not found!"
            }
        };
    }

};

