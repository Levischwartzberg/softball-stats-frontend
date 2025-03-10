import {Player} from "@/types/types";
import css from "./PlayerInfo.module.scss";

type PlayerInfoProps = {
    player : Player
}

const PlayerInfo = (props : PlayerInfoProps) => {

    return (
        <div>
            <div className={css.playerName}>
                <h1>
                    {`${props.player.firstName} ${props.player.lastName}`}
                </h1>
            </div>
            <div className={css.playerAttributes}>
                <ul>
                    <li>
                        <span style={{fontWeight: "bold"}}>Height: </span> {props.player.height}
                    </li>
                    <li>
                        <span style={{fontWeight: "bold"}}>Weight: </span> {props.player.weight}
                    </li>
                    <li>
                        <span style={{fontWeight: "bold"}}>Bats: </span> {props.player.batHand}
                    </li>
                    <li>
                        <span style={{fontWeight: "bold"}}>Throws: </span> {props.player.throwHand}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PlayerInfo;