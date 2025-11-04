export const createUserValidationSchema ={
    username: {
        isLength: {
            options: { min: 5, max: 32 },
            errorMessage: "Username must be between 5 and 32 characters"
        },
        notEmpty: {
            errorMessage: "Username is required"
        },
        isString: {
            errorMessage: "Username must be a string"
        }
    },
    displayName: {
        isLength: {
            options: { min: 2, max: 100 },
            errorMessage: "Display name must be between 2 and 100 characters"
        },
        notEmpty: {
            errorMessage: "Display name is required"
        }
    }
}