const express = require("express");
const jwt = require("jsonwebtoken");
const {
    addExpense,
    getExpense,
    deleteExpense,
    updateExpense,
} = require("../controllers/expenseControllers");
const User = require("../models/User");

const router = express.Router();

const secretKey = "Hello";
const authenticateToken = (request, response, next) => {
    console.log("authentication processing...");
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    console.log(authHeader);
    if (accessToken) {
        jwt.verify(accessToken, secretKey, async (error, userDetails) => {
            if (error) {
                response.status(403).json({
                    status: "Failure",
                    message: "Access Denied",
                });
            } else {
                request.user = await User.findById(userDetails.userid);
                next();
            }
        });
    } else {
        response.status(401).json({
            status: "Failure",
            message: "Not Authorized",
        });
    }
    console.log(accessToken);
};

router.post("/new/:userid", authenticateToken, addExpense);

router.get("/all/:userid", getExpense);

router.delete("/delete/:id", deleteExpense);

router.patch("/update/:id", updateExpense);

module.exports = router;
