import {
    Modal,
    Box,
    InputLabel,
    OutlinedInput,
    FormControl,
    Typography,
    Alert,
    InputAdornment,
    TextField, Autocomplete
} from "@mui/material";
import {useState} from "react";
import AsyncButton from "@/components/common/AsyncButton";
import {Player} from "@/types/types";
import {useCreatePlayerMutation} from "@/store/players/playerApiSlice";
import {isNumber} from "@mui/base/unstable_useNumberInput/utils";

type CreateNewPlayerModalProps = {
    open : boolean;
    index? : number,
    setOpen : (open : boolean) => void;
    setSelectedPlayer : (player : Player, index : number) => void;
}

const CreateNewPlayerModal = (props : CreateNewPlayerModalProps) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [heightFeet, setHeightFeet] = useState(0);
    const [heightInches, setHeightInches] = useState(0);
    const [throwHand, setThrowHand] = useState("");
    const [batHand, setBatHand] = useState("");
    const [weight, setWeight] = useState(undefined as number | undefined);
    const [createPlayerTrigger, createPlayerMutation] = useCreatePlayerMutation()
    const [showErrorText, setShowErrorText] = useState(false);

    const updateWeight = (weight : string) => {
        const trimmedWeight = weight.substring(0, 3);
        if (isNumber(parseInt(trimmedWeight)) || weight === "") {
            setWeight(parseInt(trimmedWeight));
        }
    }

    const createNewPlayer = async () => {

        const newPlayer = {
            firstName : firstName,
            lastName : lastName,
            height : `${heightFeet} ${heightInches}`,
            weight : weight!,
            throwHand : throwHand,
            batHand : batHand
        }

        const createdPlayer = await createPlayerTrigger(newPlayer);

        setFirstName("");
        setLastName("");
        setHeightFeet(0);
        setHeightInches(0);
        setWeight(undefined);
        setThrowHand("")
        setBatHand("");

        if (createdPlayer.error) {
            console.log(createdPlayer.error);
            setShowErrorText(true);
        } else {

            if (props.setSelectedPlayer && props.index) {
                props.setSelectedPlayer(createdPlayer.data, props.index);
            }
            setShowErrorText(false);
            props.setOpen(false);
        }
    }

    return <Modal
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box className="create-new-object-modal-contents">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Create New Player
            </Typography>
            <FormControl sx={{ m: 1 }} style={{display : "block"}}>
                <InputLabel htmlFor="outlined-adornment-first-name">First Name</InputLabel>
                <OutlinedInput
                    className="outlined-input"
                    id="outlined-adornment-first-name"
                    label="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} style={{display : "block"}}>
                <InputLabel htmlFor="outlined-adornment-last-name">Last Name</InputLabel>
                <OutlinedInput
                    className="outlined-input"
                    id="outlined-adornment-last-name"
                    label="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </FormControl>
            <Autocomplete
                style={{display : "inline-block", width : "200px"}}
                disablePortal
                blurOnSelect={true}
                options={[{label : "Feet", id: 0}, {label : "5", id: 5}, {label : "6", id: 6}]}
                sx={{ width: 300 }}
                onChange={(event, value) => setHeightFeet(value!.id)}
                renderInput={(params) => <TextField {...params} label="Height (Feet)" />}
            />
            <Autocomplete
                style={{display : "inline-block", width : "200px"}}
                disablePortal
                blurOnSelect={true}
                options={[{label : "Inches", id: 0}, {label : "1", id: 1}, {label : "2", id: 2}, {label : "3", id: 3}, {label : "4", id: 4}, {label : "5", id: 5}, {label : "6", id: 6}, {label : "7", id: 7}, {label : "8", id: 8}, {label : "9", id: 9}, {label : "10", id: 10}, {label : "11", id: 11}, {label : "12", id: 12}]}
                sx={{ width: 300 }}
                onChange={(event, value) => setHeightInches(value!.id)}
                renderInput={(params) => <TextField {...params} label="Height (Inches)" />}
            />
            <FormControl sx={{ m: 1 }} style={{display : "block"}}>
                <InputLabel htmlFor="outlined-adornment-weight">Weight</InputLabel>
                <OutlinedInput
                    className="outlined-input"
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">Lbs</InputAdornment>}
                    label="Weight"
                    value={weight ? weight : ""}
                    onChange={(event) => updateWeight(event.target.value)}
                />
            </FormControl>
            <Autocomplete
                disablePortal
                blurOnSelect={true}
                options={["Right", "Left"]}
                sx={{ width: 300 }}
                onChange={(event, value) => setThrowHand(value!)}
                renderInput={(params) => <TextField {...params} label="Throw Hand" />}
            />
            <Autocomplete
                disablePortal
                blurOnSelect={true}
                options={["Right", "Left", "Switch"]}
                sx={{ width: 300 }}
                onChange={(event, value) => setBatHand(value!)}
                renderInput={(params) => <TextField {...params} label="Bat Hand" />}
            />
            <AsyncButton isLoading={createPlayerMutation.isLoading} onClick={() => createNewPlayer()}>
                Save Player
            </AsyncButton>
            {showErrorText && (
                <Alert severity="error" onClose={() => setShowErrorText(false)}>Error creating player</Alert>
            )}
        </Box>
    </Modal>
}

export default CreateNewPlayerModal;