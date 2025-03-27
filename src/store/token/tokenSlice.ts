import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
    userAccessToken: string | null;
}

const initialState: TokenState = {
    userAccessToken: localStorage.getItem("userAccessToken"),
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setUserAccessToken(state, action: PayloadAction<string | null>) {
            state.userAccessToken = action.payload;
        },
    },
});

export const { setUserAccessToken } = tokenSlice.actions;
export default tokenSlice.reducer;