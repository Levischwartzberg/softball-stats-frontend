import {CognitoUserPool} from "amazon-cognito-identity-js";

const userPoolId = process.env.REACT_APP_USERPOOL_ID as string;
const clientId = process.env.REACT_APP_USERPOOL_CLIENT_ID as string;

const poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId
}

export default new CognitoUserPool(poolData);