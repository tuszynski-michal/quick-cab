import {Request, Response, Router} from 'express';

import {rides} from '../mocks/ride-db';
import {ridesSocket} from "../app";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json(rides);
});

router.post("/", (req: Request, res: Response) => {
    const newRide = {
        id: rides.length + 1,
        status: req.body.status,
        ...req?.body,
    }

    rides.push(newRide);

    ridesSocket.emit("rides:create", newRide);

    res.status(201).json(newRide);
})

export default router;