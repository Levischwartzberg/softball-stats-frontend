import {AtBat} from "@/types/types";
import {BaseENUM} from "./Base";
import {Box, Button, Modal} from "@mui/material";
import css from "./PlateAppearanceModal.module.scss";
import Base from "@/components/PlateAppearanceModal/Base";

type PlateAppearanceModalProps = {
    open : boolean;
    atBat : AtBat;
    closeModal : (close : boolean) => void;
}

function PlateAppearanceModal(props : PlateAppearanceModalProps) {

    return <Modal open={props.open} onClose={() => props.closeModal(false)}>
        <Box className={css.modal}>
            <Button onClick={() => props.closeModal(false)}>X</Button>
            <div className={css.diamond}>
                <Base className={css.firstBase} base={BaseENUM.FIRST} runner={props.atBat.baserunners ? props.atBat.baserunners.first : null} />
                <Base className={css.secondBase} base={BaseENUM.SECOND} runner={props.atBat.baserunners ? props.atBat.baserunners.second : null} />
                <Base className={css.thirdBase} base={BaseENUM.THIRD} runner={props.atBat.baserunners ? props.atBat.baserunners.third : null} />
            </div>
            <div className={css.plateAppearanceInfoTables}>
                <table>
                    <tbody>
                    <tr>
                        <th>Result</th>
                        <th>Scoring</th>
                        {props.atBat.region && (
                            <th>Region</th>
                        )}
                        {props.atBat.launchAngle && (
                            <th>Launch Angle</th>
                        )}
                        {(props.atBat.exitVelocity !== undefined && props.atBat.exitVelocity > 0) && (
                            <th>Exit Velo (MPH)</th>
                        )}
                    </tr>
                    <tr>
                        <td>{props.atBat.result}</td>
                        <td>{props.atBat.scoring}</td>
                        {props.atBat.region && (
                            <td>{props.atBat.region}</td>
                        )}
                        {props.atBat.launchAngle && (
                            <td>{props.atBat.launchAngle}</td>
                        )}
                        {(props.atBat.exitVelocity !== undefined && props.atBat.exitVelocity > 0) && (
                            <td>{props.atBat.exitVelocity}</td>
                        )}
                    </tr>
                    </tbody>
                </table>
                    {props.atBat.runs.length > 0 && (
                        <table>
                            <tbody>
                            <tr>
                                <th>Scored</th>
                            </tr>
                            {props.atBat.runs.map(player => {
                                return <tr>
                                    <td>{player.firstName + " " + player.lastName}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    )}
                    {props.atBat.outs.length > 0 && (
                        <table>
                            <tbody>
                            <tr>
                                <th>Out</th>
                            </tr>
                            {props.atBat.outs.map(player => {
                                return <tr>
                                    <td>{player.firstName + " " + player.lastName}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    )}
            </div>
        </Box>
    </Modal>
}

export default PlateAppearanceModal;