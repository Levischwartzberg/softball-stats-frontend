import {Modal, Box, InputLabel, OutlinedInput, FormControl, Typography, Alert} from "@mui/material";
import {useState} from "react";
import AsyncButton from "@/components/common/AsyncButton";
import {useCreateOpponentMutation} from "@/store/opponents/opponentApiSlice";
import {GameInfo} from "@/types/types";

type CreateNewOpponentModalProps = {
    open : boolean;
    gameInfo? : GameInfo;
    setOpen : (open : boolean) => void;
    setGameInfo? : (gameInfo : GameInfo) => void;
}

const CreateNewOpponentModal = (props : CreateNewOpponentModalProps) => {

    const [opponentName, setOpponentName] = useState("");
    const [createOpponentTrigger, createOpponentMutation] = useCreateOpponentMutation();
    const [showErrorText, setShowErrorText] = useState(false);

    const createNewOpponent = async () => {

        const createdOpponent = await createOpponentTrigger({teamName : opponentName});

        setOpponentName("");

        if (createdOpponent.error) {
            console.log(createdOpponent.error);
            setShowErrorText(true);
        } else {

            if (props.setGameInfo && props.gameInfo) {
                const gameInfoCopy = {...props.gameInfo};
                gameInfoCopy.opponent = createdOpponent.data;
                props.setGameInfo(gameInfoCopy);
            }
            setShowErrorText(false);
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
                Create New Opponent
            </Typography>
            <FormControl sx={{ m: 1 }} style={{display : "block"}}>
                <InputLabel htmlFor="outlined-adornment-team-name">Opponent Name</InputLabel>
                <OutlinedInput
                    className="outlined-input"
                    id="outlined-adornment-team-name"
                    label="Opponent Name"
                    value={opponentName}
                    onChange={(event) => setOpponentName(event.target.value)}
                />
            </FormControl>
            <AsyncButton isLoading={createOpponentMutation.isLoading} onClick={() => createNewOpponent()}>
                Save Opponent
            </AsyncButton>
            {showErrorText && (
                <Alert severity="error" onClose={() => setShowErrorText(false)}>Error creating opponent</Alert>
            )}
        </Box>
    </Modal>
}

export default CreateNewOpponentModal;