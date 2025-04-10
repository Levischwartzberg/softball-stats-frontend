import {Season} from "@/types/types";
import {Alert, Autocomplete, Button, FormControl, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {useState} from "react";
import css from "./CreateNewSeason.module.scss";
import AsyncButton from "@/components/common/AsyncButton";
import {useCreateSeasonMutation} from "@/store/seasons/seasonApiSlice";

type CreateNewSeasonProps = {
    setSeason : (season : Season) => void
}

const CreateNewSeason = (props : CreateNewSeasonProps) => {

    const [session, setSession] = useState("");
    const [year, setYear] = useState(0);
    const [showCreateSeasonError, setShowCreateSeasonError] = useState(false);

    const [createSeasonTrigger, createSeasonMutation] = useCreateSeasonMutation();

    const createSeason = async () => {
        const season = {
            session : session,
            year : year
        };

        const createdSeason = await createSeasonTrigger(season);
        setSession("");
        setYear(0);

        if (createdSeason.error) {
            setShowCreateSeasonError(true);
            console.log(createdSeason.error)
        } else {
            setShowCreateSeasonError(false);
            props.setSeason(createdSeason.data);
        }
    }

    return <>
        <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-session">Session</InputLabel>
            <OutlinedInput
                className="outlined-input"
                id="outlined-adornment-session"
                label="Session"
                value={session}
                onChange={(event) => setSession(event.target.value)}
            />
        </FormControl>
        <Autocomplete
            disablePortal
            blurOnSelect={true}
            options={["2021", "2022", "2023", "2024", "2025", "2026"]}
            sx={{ width: 300 }}
            onChange={(event, value) => setYear(parseInt(value!))}
            renderInput={(params) => <TextField {...params} label="Year" />}
        />
        <div className={css.createSeasonButton}>
            <AsyncButton isLoading={createSeasonMutation.isLoading} onClick={createSeason}>
                Create New Season
            </AsyncButton>
        </div>

        {showCreateSeasonError && (
            <Alert severity="error" onClose={() => setShowCreateSeasonError(false)}>Error creating season</Alert>
        )}
    </>
}

export default CreateNewSeason;