import genToken from "../config/token.js";
import User from "../models/user.model.js";


export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email });
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,        // localhost ke liye false, production me true
            sameSite: "none",   // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                name: user.name,
            }
        })

        console.log(token);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Login Failed",
            error: err.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logout Successful"
        })
    }

    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Logout Failed",
            error: err.message
        });
    }
}