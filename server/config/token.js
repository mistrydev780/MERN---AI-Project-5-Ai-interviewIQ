import jwt from 'jsonwebtoken';


const genToken = async (userId) => {

    try {
        const token = jwt.sign(
            { userId: userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return token;
    }
    catch (err) {
        console.error("Error generating token:", err);

    }

}

export default genToken;