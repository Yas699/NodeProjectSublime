export const asyncHandler = (callableFunction) => async (request, response,next) => {
    try {
        return await callableFunction(request, response, next);
    } catch (error) {
        response.status(500).json({
            success : false,
            message : error.message,
            code : error.code
        })
    }
}