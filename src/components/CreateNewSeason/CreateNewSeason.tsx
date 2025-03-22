import {Season} from "@/types/types";
import {Autocomplete, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {useState} from "react";

type CreateNewSeasonProps = {
    setSeason : (season : Season) => void
}

const CreateNewSeason = (props : CreateNewSeasonProps) => {

    const [session, setSession] = useState("");
    const [year, setYear] = useState(0);

    const yearOptions = [{label : "Choose Year", id: 0}, {label : "2025", id: 2025}, {label : "2026", id: 2026}];

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
            options={yearOptions}
            sx={{ width: 300 }}
            onChange={(event, value) => setYear(value!.id)}
            renderInput={(params) => <TextField {...params} label="Year" />}
        />
        <Button onClick={() => console.log({session : session, year : year})}> Create New Season </Button>
    </>
}

export default CreateNewSeason;