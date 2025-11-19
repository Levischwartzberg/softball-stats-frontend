import {RunExpectancyData, SituationRunExpectancy} from "@/types/types";
import InfoIcon from '@mui/icons-material/Info';
import {Tooltip} from "@mui/material";

type RunExpectancyMatrixProps = {
    runExpectancyData: RunExpectancyData;
}

const baserunnerSituationMap = {
    basesEmpty : {
        code : "000",
        label : "Bases Empty"
    },
    runnerOnFirst : {
        code : "100",
        label : "Runner on 1st"
    },
    runnerOnSecond : {
        code : "010",
        label : "Runner on 2nd"
    },
    runnerOnThird : {
        code : "001",
        label : "Runner on 3rd"
    },
    runnersOnFirstAndSecond : {
        code : "110",
        label : "Runners on 1st and 2nd"
    },
    runnersOnFirstAndThird : {
        code : "101",
        label : "Runners on 1st and 3rd"
    },
    runnersOnSecondAndThird : {
        code : "011",
        label : "Runners on 2nd and 3rd"
    },
    basesLoaded : {
        code: "111",
        label: "Bases Loaded"
    }
}

const RunExpectancyMatrix = ({ runExpectancyData }: RunExpectancyMatrixProps) => {
    const {situationRunExpectancy} = runExpectancyData;

    const indexed = new Map<string, SituationRunExpectancy>();
    situationRunExpectancy.forEach(sre => {
        const key = `${sre.firstBaseOccupied ? 1 : 0}${sre.secondBaseOccupied ? 1 : 0}${sre.thirdBaseOccupied ? 1 : 0}-${sre.outs}`;
        indexed.set(key, sre);
    });

    const getRunExpectancy = (code: string, outs: number) => {
        const situation = indexed.get(`${code}-${outs}`);
        return situation ? situation.runExpectancy.toFixed(3) : "-";
    };

    const tooltipContent = "Values determined by finding average number of runs scored after each instance of the given scenario for all games."

    return (<div>
            <h3>Run Expectancy Matrix <Tooltip title={tooltipContent}><InfoIcon/></Tooltip></h3>
            <table>
                <thead>
                <tr>
                    <th>Baserunner State</th>
                    <th>0 Outs</th>
                    <th>1 Out</th>
                    <th>2 Outs</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(baserunnerSituationMap).map(({code, label}) => (
                    <tr key={code}>
                        <td>{label}</td>
                        <td>{getRunExpectancy(code, 0)}</td>
                        <td>{getRunExpectancy(code, 1)}</td>
                        <td>{getRunExpectancy(code, 2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default RunExpectancyMatrix;
