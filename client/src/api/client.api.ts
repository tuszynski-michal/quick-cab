import {Client} from "@hyper-fetch/core";

export type ServerErrorType = {
    error: string;
    message: string;
};

export const clientApi = new Client<ServerErrorType>({url: "http://localhost:4000"}).setQueryParamsConfig({
    arrayFormat: "comma",
    skipEmptyString: true,
})