
/** @type {import('@hapi/basic').Validate} */
exports.validate = async (req, username, password, h) => {
    return {
        isValid: true,
        credentials: { username, password },
    };
};