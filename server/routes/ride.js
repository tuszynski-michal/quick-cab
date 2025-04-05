const express = require("express");
const router = express.Router();
const { getRideStatus, updateRideStatus } = require("../databases/db-ride");

router.get("/", (req, res) => {
    res.json(getRideStatus());
});

router.post("/", (req, res) => {
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: "Missing status field" });
    }

    updateRideStatus(status);
    res.json({ message: "Status updated", rideStatus: getRideStatus() });
});

module.exports = router;
