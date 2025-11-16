import React from 'react';
import Plot from "react-plotly.js";
import { PlayerBattedBallData } from "@/types/types";
import { Data, Layout } from 'plotly.js';
import {Region, LaunchAngle} from "@/components/PlayerBattedBallWRCPlusTable/PlayerBattedBallWRCPlusTable";

type Props = {
    data: PlayerBattedBallData;
    filter: { region : Region | null, launchAngle: LaunchAngle | null } | null;
};

const BattedBallBoxPlot: React.FC<Props> = ({ data, filter}) => {
    const filteredData = filter !== null ?
        data.battedBallData.filter(datum => {
            return (!filter.launchAngle || datum.launchAngle === filter.launchAngle) &&
                (!filter.region || datum.region === filter.region);
        })
        : data.battedBallData;

    const exitVelocities = filteredData
        .map(d => d.exitVelocity)
        .filter(ev => ev !== 0);

    const avgEV = exitVelocities.reduce((sum, ev) => sum + ev, 0) / exitVelocities.length;

    const boxTrace: Partial<Data> = {
        x: exitVelocities,
        type: 'box',
        name: 'Exit Velocity',
        boxpoints: false,
        line: { color: 'black' }
    };

    const avgTrace: Partial<Data> = {
        x: [avgEV],
        y: [-0.05],
        mode: 'text+markers',
        type: 'scatter',
        name: 'Average',
        marker: { color: 'red', size: 12, symbol: 'diamond' },
        text: [`Avg: ${avgEV.toFixed(1)} mph`],
        textposition: 'bottom center',
        hoverinfo: 'text'
    };

    const minEV = Math.min(...exitVelocities);
    const maxEV = Math.max(...exitVelocities);

    const layout: Partial<Layout> = {
        title: { text: 'Exit Velocity Distribution' },
        xaxis: { title: { text: 'Exit Velocity (mph)' }, range: [minEV - 5, maxEV + 5] },
        yaxis: { visible: false },
        showlegend: true,
        height: 400
    };

    return <Plot data={[boxTrace, avgTrace]} layout={layout} config={{ responsive: true }} />;
};

export default BattedBallBoxPlot;

