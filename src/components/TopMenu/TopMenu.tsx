import {Box, Button} from "@mui/material";
import {MouseEventHandler} from "react";

type NavItemProps = {
    selected?: boolean,
    label?: string,
    onClick?: MouseEventHandler<unknown>,
}

type TopMenuProps = {
    links : NavItemProps[]
};

const TopMenu = (props : TopMenuProps) => {

    return (
        <Box>
            <nav className="main-nav">
                <ul>
                    {props.links.map(link => {
                        return <li>
                            <Button onClick={link.onClick}>
                                {link.label}
                            </Button>
                        </li>
                    })}
                </ul>
            </nav>
        </Box>
    )
}

export default TopMenu;