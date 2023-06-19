

const errorHandler = (res,status,message) => {
    const alert = res.status(status).json({
        success: false,
        message,
    });
    return alert;
};

module.exports = errorHandler;
