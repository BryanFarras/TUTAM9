exports.validateUserInput = (name, email, password) => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!nameRegex.test(name)) return { valid: false, message: "Invalid name format" };
    if (!emailRegex.test(email)) return { valid: false, message: "Invalid email format" };
    if (!passwordRegex.test(password)) return { valid: false, message: "Password must contain min 6 chars, at least one letter and number" };

    return { valid: true };
};