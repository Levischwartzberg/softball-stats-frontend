import {useState} from "react";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import UserPool from "@/UserPool";
import {Button, Checkbox, FormControl, InputLabel, OutlinedInput, FormControlLabel, Alert} from "@mui/material";
import css from "./AdminLogin.module.scss"
import {setUserAccessToken} from "@/store/token/tokenSlice";
import {useDispatch} from "react-redux";

const AdminLogin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);

    const dispatch = useDispatch();

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
                dispatch(setUserAccessToken(data.getIdToken().getJwtToken()));
                setShowLoginSuccess(true);
                setUsername("");
                setPassword("");
            },
            onFailure : (data) => {
                console.log(username, password);
                console.error("Error: ", data);
                setShowLoginError(true);
            },
            newPasswordRequired : (data) => {
                console.log(data);
            }
        })
    }

    return <div>

            <div className={css.input}>
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
            </div>
            <div className={css.input}>
                <FormControl sx={{ m: 1 }} className={css.input}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        className="outlined-input"
                        id="outlined-adornment-password"
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </FormControl>
            </div>

            <div className={css.input}>
                <FormControlLabel control={<Checkbox checked={showPassword} onChange={(e, value) => setShowPassword(value)} />} label="show password" />
            </div>

            <div className={css.loginButton}>
                <Button onClick={() => login()}>
                    Admin Login
                </Button>
            </div>

            {showLoginError && (
                <Alert severity="error" onClose={() => setShowLoginError(false)}>Invalid Credentials</Alert>
            )}
            {showLoginSuccess && (
                <Alert severity="success" onClose={() => setShowLoginSuccess(false)}>Admin Logged In</Alert>
            )}
        </div>;

}

export default AdminLogin;