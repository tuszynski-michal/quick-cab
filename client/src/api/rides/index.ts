import {clientApi} from "@/api/client.api";

type Ride = {
    id: number;
    status: string;
    username?: string
}

export const getRides = clientApi.createRequest<Ride[]>()({
    endpoint: "/rides",
    method: "GET"
})

type CreateRide = {
    status: string;
}

export const createRide = clientApi.createRequest<Ride[], CreateRide>()({
    endpoint: "/rides",
    method: "POST"
})