import {useState} from "react";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import UserPool from "@/UserPool";
import {Button, FormControl, InputLabel, OutlinedInput} from "@mui/material";

const AdminLogin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const user = new CognitoUser({
            Username : username,
            Pool : UserPool
        })

        const authDetails = new AuthenticationDetails({
            Username : username,
            Password : password
        })

        user.authenticateUser(authDetails, {
            onSuccess : (data) => {
                console.log("Success: ", data);
                localStorage.setItem("userAccessToken", data.getIdToken().getJwtToken());
            },
            onFailure : (data) => {
                console.log(username, password);
                console.error("Error: ", data);
            },
            newPasswordRequired : (data) => {
                console.log(data);
            }
        })
    }

    return <>
            <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                <OutlinedInput
                    className="outlined-input"
                    id="outlined-adornment-username"
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    className="outlined-input"
                    id="outlined-adornment-password"
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </FormControl>

            <Button onClick={() => login()}>
                Login
            </Button>
        </>;

}

export default AdminLogin;