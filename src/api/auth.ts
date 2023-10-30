import axios from "axios";
import {IAuthCredentials, TToken} from "../types";
import localStorage from "redux-persist/es/storage";

export const API_URL = process.env.BASE_URL;

export async function verifyRequisites(
    credentials: IAuthCredentials,
): Promise<void> {

    try {
        await axios.post(
            `https://gateway.scan-interfax.ru/api/v1/account/login`,
            credentials
        )
            .then((response: axios.AxiosResponse<TToken>) => {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('expire', response.data.expire!);
            })
    } catch (e) {
       alert('You login or password are incorrect')
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