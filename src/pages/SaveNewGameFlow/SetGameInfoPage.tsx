import {GameInfo, Opponent, WeatherConditionENUM} from "@/types/types";
import {DateTimePicker} from "@mui/x-date-pickers";
import {useGetOpponentsQuery} from "@/store/opponents/opponentApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import SelectOpponentAutocomplete from "@/components/SelectOpponentAutocomplete/SelectOpponentAutocomplete";
import {Dayjs} from "dayjs";
import {OutlinedInput, InputAdornment, InputLabel, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel} from "@mui/material";
import {isNumber} from "@mui/base/unstable_useNumberInput/utils";
import WeatherConditionsMultiselect from "@/components/WeatherConditionsMultiselect/WeatherConditionsMutliselect";

type SetGameInfoProps = {
    gameInfo : GameInfo;
    setGameInfo : (gameInfo : GameInfo) => void;
}

const SetGameInfoPage = (props : SetGameInfoProps) => {

    const updateDate = (date : Dayjs) => {
        const modifiedGameInfo = {...props.gameInfo};
        modifiedGameInfo.date = date;
        props.setGameInfo(modifiedGameInfo);
    }

    const updateHomeAway = (val : string) => {
        const home = val === "home";
        const modifiedGameInfo = {...props.gameInfo};
        modifiedGameInfo.home = home;
        if (val !== "idk") {
            props.setGameInfo(modifiedGameInfo);
        } else {
            modifiedGameInfo.home = undefined;
            props.setGameInfo(modifiedGameInfo);
        }
    }

    const updateField = (field : string) => {
        const modifiedGameInfo = {...props.gameInfo};
        modifiedGameInfo.field = field;
        props.setGameInfo(modifiedGameInfo);
    }

    const updateTemp = (temp : string) => {
        if (isNumber(parseInt(temp)) || temp === "") {
            const modifiedGameInfo = {...props.gameInfo};
            modifiedGameInfo.temperature = parseInt(temp);
            props.setGameInfo(modifiedGameInfo);
        }
    }

    const updateWeatherConditions = (weatherConditions : WeatherConditionENUM[]) => {
        const modifiedGameInfo = {...props.gameInfo};
        modifiedGameInfo.weatherConditions = weatherConditions;
        props.setGameInfo(modifiedGameInfo);
    }

    const updateOpponent = (opponent : Opponent) => {
        const modifiedGameInfo = {...props.gameInfo};
        modifiedGameInfo.opponent = opponent;
        props.setGameInfo(modifiedGameInfo);
    }

    const getOpponentsQuery = useGetOpponentsQuery();

    return <div className="game-flow-content">
        <DateTimePicker
            label="Game Date/Time"
            value={props.gameInfo.date}
            onChange={(newValue) => updateDate(newValue!)}
        />

        <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group" style={{textAlign : "left"}}>Home/Away</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={props.gameInfo.home !== undefined ? (props.gameInfo.home ? "home" : "away") : "idk"}
                onChange={(event, value) => updateHomeAway(value)}
            >
                <FormControlLabel value="home" control={<Radio />} label="Home" />
                <FormControlLabel value="away" control={<Radio />} label="Away" />
                <FormControlLabel value="idk" control={<Radio />} label="Idk" />
            </RadioGroup>
        </FormControl>

        <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-field">Field</InputLabel>
            <OutlinedInput
                className="outlined-input"
                id="outlined-adornment-field"
                label="Field"
                value={props.gameInfo.field ? props.gameInfo.field : ""}
                onChange={(event) => updateField(event.target.value)}
            />
        </FormControl>

        <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-temp">Temperature</InputLabel>
            <OutlinedInput
                className="outlined-input"
                id="outlined-adornment-temp"
                endAdornment={<InputAdornment position="end">&deg;F</InputAdornment>}
                label="Temperature"
                value={props.gameInfo.temperature ? props.gameInfo.temperature : ""}
                onChange={(event) => updateTemp(event.target.value)}
            />
        </FormControl>

        <div className="outlined-input">
            <WeatherConditionsMultiselect title="Weather Conditions"
                                          selectedConditions={props.gameInfo.weatherConditions ? props.gameInfo.weatherConditions : []}
                                          setSelectedConditions={updateWeatherConditions} />
        </div>

        <AsyncStateWrapper query={getOpponentsQuery as QueryState} >
            <SelectOpponentAutocomplete opponents={getOpponentsQuery.data!} gameInfo={props.gameInfo} setSelectedOpponent={updateOpponent} setGameInfo={props.setGameInfo} />
        </AsyncStateWrapper>
    </ div>

}

export default SetGameInfoPage;