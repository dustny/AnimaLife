function errorHandler(error,request,response,next) {
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            response
            .status(400)
            .json({message: error.errors[0].message})
        case "EmailNull":
            response.status(400).json({message: "Email is required"});
        case "PasswordNull":
            response.status(400).json({message: "Password is required"});
            break;
        case "already_subscribe":
            response.status(400).json({message: "You already a subscriber"})
            break;
        case "MidtransError":
            response.status(400).json({message: error.ApiResponse.error_messages[0]})
        case "UserNotFound":
        case "PasswordInvalid":
            response.status(401).json({message: "Invalid email/password"})
            break;
        case "Unauthorized":
        case "JsonWebTokenError":
            response.status(401).json({message: "Invalid token"})
            break;
        case "Forbidden":
            response.status(403).json({message: "You are not authorized"})
            break;
        case "ProfileNotFound":
            response.status(404).json({message: "Profile not found"})
            break;
        default:
            response.status(500).json({message: "Internal server error"});
            break;
    }
}

module.exports = errorHandler