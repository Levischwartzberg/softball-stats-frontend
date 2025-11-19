import {AtBatResult, RunExpectancyData} from "@/types/types";
import InfoIcon from "@mui/icons-material/Info";
import {Tooltip} from "@mui/material";

type ResultRunValueTableProps = {
    runExpectancyData: RunExpectancyData;
}

const resultKeysInDesiredOrder = [
    "OUT",
    "WALK",
    "SINGLE",
    "DOUBLE",
    "TRIPLE",
    "HOMERUN",
]

const ResultRunValueTable = ({ runExpectancyData }: ResultRunValueTableProps) => {
    const averageRunValuePerPlay = runExpectancyData.resultRunExpectancy;

    const tooltipContent = "Determined by using runs scored on each instance of result in conjunction with the situational change of the base out state expectation values.";

    return <div>
        <h3>Run Values <Tooltip title={tooltipContent}><InfoIcon/></Tooltip></h3>
        <table>
            <thead>
            <tr>
                <th>Result Type</th>
                <th>Run Value</th>
            </tr>
            </thead>
            <tbody>
            {resultKeysInDesiredOrder.map((result)=> (
                <tr key={result}>
                    <td>{result}</td>
                    <td>{averageRunValuePerPlay.runExpectancyByResult[result as AtBatResult].toFixed(3)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
}
export default ResultRunValueTable;
