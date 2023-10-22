import axios from "axios";
import {IAuthCredentials, TToken} from "../types";

export const API_URL = process.env.BASE_URL;

export async function verifyRequisites(
    credentials: IAuthCredentials
): Promise<boolean> {
    try {
        const { status } = await axios.post(
            `https://gateway.scan-interfax.ru/api/v1/account/login`,
            credentials
        );

        return status === 200;
    } catch (e) {
        return false;
    }
}

export async function getToken(
): Promise<TToken | boolean> {
    try {
        const {request} = await axios.get<TToken>(
            `https://gateway.scan-interfax.ru/api/v1/account/info`
        );
        return request.token
    } catch (e) {
        return false;
    }
}