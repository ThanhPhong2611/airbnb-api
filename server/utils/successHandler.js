

const successHandler = (res,status,data,message) => {
    const alert = res.status(status).json({
        success: true,
        message,
        data
    });
    return alert;
};

module.exports = successHandler;
