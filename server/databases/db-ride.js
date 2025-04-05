let rideStatus = {
    id: "123",
    status: "waiting", // waiting | on_the_way | arrived | in_progress | finished
};

function getRideStatus() {
    return rideStatus;
}

function updateRideStatus(newStatus) {
    rideStatus.status = newStatus;
}

module.exports = {
    getRideStatus,
    updateRideStatus,
};