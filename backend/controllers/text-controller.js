exports.dummy = async (req, res) => {
    try {
        const result = await product.create(req.body)
        res.json({
            success: true,
            message: "Product added",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: `Error ${error}`,
        })
    }
};