import {Button, Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

type AsyncButtonProps = {
    isLoading: boolean,
    width?: string,
}

const AsyncButton : React.FC<React.PropsWithChildren<AsyncButtonProps & Record<string, unknown>>> = ({ children, isLoading, width, ...props}) => {
    return (
        <Button disabled={isLoading} {...props} style={{width}}>
            {!isLoading
                ? children
                : <CircularProgress size={30} />
            }
        </Button>);
};

export default AsyncButton;