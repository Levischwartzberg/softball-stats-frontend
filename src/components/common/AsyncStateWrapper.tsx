import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/material";
import React from "react";

export interface QueryState<T = unknown> {
    isUninitialized: boolean,
    isLoading: boolean,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    error?: { status?: string | number, data?: { message: string } | string },
    data?: T | undefined,
}

type AsyncStateWrapperProps = {
    query: QueryState,
    prefixText?: string,
    heightPadding?: number
}

const AsyncStateWrapper : React.FC<React.PropsWithChildren<AsyncStateWrapperProps>> = ({ query, prefixText, heightPadding, children }) => {

    if (query.isUninitialized) {
        return null;

    } else if (query.isLoading || query.isFetching) {
        return <Box style={{padding: heightPadding ? heightPadding : 0}} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
        </Box>

    } else if (query.isError) {
        console.error(query.error);

        let errorMessage : string | React.ReactElement = "Error accessing the backend.";
        return <>
            {errorMessage}
        </>

    } else if (query.isSuccess) {
        return <>{ children }</>;

    }

    return <p style={{ color: "red" }}>Component in inconsistent state</p>;
};

export default AsyncStateWrapper;
