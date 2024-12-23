import getPlayers from "../api/getPlayers";
import PlayerTable from "../components/PlayerTable/PlayerTable";
import {Player} from "@/types/types";
import {useEffect, useState} from "react";

const PlayerPage = () => {

    const [players, setPlayers] = useState([] as Player[]);

    useEffect(() => {
        getPlayers().then(players => {
            setPlayers(players);
        });

    }, []);

    return (
        <>
            Player Page

            <PlayerTable players={players} />
        </>
    )
}

export default PlayerPage;