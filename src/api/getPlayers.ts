import API from "./API";
import {Player} from "../types/types";
import {AxiosResponse} from "axios";

const getPlayers = async () : Promise<Player[]> => {
    return API.getPlayers()
        .then((res: AxiosResponse<Player[]>) => {
            return res.data;
        }).catch(error => {
            console.error();
            return [] as Player[];
        });
}

export default getPlayers;