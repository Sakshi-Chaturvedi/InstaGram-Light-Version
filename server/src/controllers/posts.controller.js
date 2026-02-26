const catchAsyncError = require("../middlewares/catchAsyncError");



const createPosts = catchAsyncError(async (req, res, next) => {
    const file = req.file;

    
})

module.exports = createPosts