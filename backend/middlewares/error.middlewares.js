exports.errorHandler = (err, req, res, next) => {
    res.status(res.statusCode || 500).json({
        success: false,
        error: err.message || "Kuch to Gadbad hai daya"
    })
}

exports.error404 = (req, res, next) => {
    const err = new Error(`page note Found`)
    res.status(404);
    next(err);

}