import {OperationENUM} from "@/types/types";
import {Box, Button, Card, MenuItem, Select, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import css from "./TableFilters.module.scss";

type TableFiltersProps = {
    filters : TableFilter[];
    setFilters : (filters : TableFilter[]) => void;
}

export type TableFilter = {
    field : string;
    operator : OperationENUM,
    value : number
}

type FilterProps = {
    tableFilter : TableFilter;
    setFilter : (tableFilter : TableFilter) => void;
}

const Filter = (props : FilterProps) => {

    const onValueChange = (value : number) => {
        if (isNaN(value)) {
            value = 0;
        }
        props.setFilter({...props.tableFilter, value: value});
    }

    return <>
        <Select className={css.fields}
                value={props.tableFilter.field}
                label="Field"
                onChange={(field) => props.setFilter({...props.tableFilter, field: field.target.value})}
        >
            <MenuItem value="games">Games</MenuItem>
            <MenuItem value="atBats">At Bats</MenuItem>
            <MenuItem value="hits">Hits</MenuItem>
            <MenuItem value="singles">Singles</MenuItem>
            <MenuItem value="doubles">Doubles</MenuItem>
            <MenuItem value="triples">Triples</MenuItem>
            <MenuItem value="homeruns">Homeruns</MenuItem>
            <MenuItem value="walks">Walks</MenuItem>
            <MenuItem value="runs">Runs</MenuItem>
            <MenuItem value="rbi">RBI</MenuItem>
        </Select>
        <Select className={css.fields}
                value={props.tableFilter.operator}
                label="Operator"
                onChange={(operator) => props.setFilter({...props.tableFilter, operator: operator.target.value as OperationENUM})}
        >
            <MenuItem value={OperationENUM.EQUAL}>=</MenuItem>
            <MenuItem value={OperationENUM.GREATER_THAN}>&gt;</MenuItem>
            <MenuItem value={OperationENUM.LESS_THAN}>&lt;</MenuItem>
        </Select>
        <TextField className={css.fields}
                   value={props.tableFilter.value}
                   label="Value"
                   onChange={(value) => onValueChange(parseInt(value.target.value))}
        />
    </>;
}

const TableFilters = (props: TableFiltersProps) => {

    return (
        <Card className={css.tableFiltersCard}>
            <h3>Table Filters:</h3>
            {props.filters.map((filter, index) => (
                <Box display={"flex"} gap={1} marginBottom={1}>
                    <Filter tableFilter={filter}
                            setFilter={(updatedFilter) => {
                                const newFilters = [...props.filters];
                                newFilters[index] = updatedFilter;
                                props.setFilters(newFilters);
                            }}
                    />
                    <Button className={css.button}
                        onClick={() => {
                            const newFilters = [...props.filters];
                            newFilters.push({field: "games", operator: OperationENUM.GREATER_THAN, value: 0});
                            props.setFilters(newFilters);
                        }}
                    >
                        <AddIcon />
                    </Button>
                    {((index === props.filters.length - 1) && index !== 0) && (
                        <Button className={css.button}
                            onClick={() => {
                                const newFilters = [...props.filters];
                                newFilters.pop();
                                props.setFilters(newFilters);
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    )}
                </Box>
            ))}
        </Card>
    );
}

export default TableFilters;
