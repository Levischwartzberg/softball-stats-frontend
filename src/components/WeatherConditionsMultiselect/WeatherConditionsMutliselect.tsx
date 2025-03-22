import React from "react";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {WeatherConditionENUM} from "@/types/types";
import {Theme, useTheme} from "@mui/material/styles";

type WeatherConditionsMultiselectProps = {

    title : string;
    selectedConditions : WeatherConditionENUM[];
    setSelectedConditions: (conditions : WeatherConditionENUM[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    style: {
        zIndex: 1500
    },
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        zIndex: 1500,
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const WeatherConditionsMultiselect : React.FC<WeatherConditionsMultiselectProps> = ({title, selectedConditions, setSelectedConditions}) => {

    const theme = useTheme();

    const weatherConditionOptions = Object.values(WeatherConditionENUM);

    return <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{title}</InputLabel>
        <Select
            style={{textAlign : "left"}}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={selectedConditions}
            onChange={e => setSelectedConditions(e.target.value as number[])}
            input={<OutlinedInput label={title} />}
            MenuProps={MenuProps}
        >
            {weatherConditionOptions.map((condition) => (
                <MenuItem
                    key={condition}
                    value={condition}
                >
                    {condition}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}

export default WeatherConditionsMultiselect;