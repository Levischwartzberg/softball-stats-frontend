import React from 'react';
import Plot from "react-plotly.js";
import {PlayerBattedBallData} from "@/types/types";
import { Data, Layout } from 'plotly.js';
import {LaunchAngle, Region} from "@/components/PlayerBattedBallWRCPlusTable/PlayerBattedBallWRCPlusTable";

type Props = {
    data : PlayerBattedBallData;
    filter: { region : Region | null, launchAngle: LaunchAngle | null } | null;
};

const BattedBallScatterPlot: React.FC<Props> = ({ data, filter }) => {
    const resultTypes = ['OUT', 'SINGLE', 'DOUBLE', 'TRIPLE', 'HOMERUN'] as const;
    const colors: Record<typeof resultTypes[number], string> = {
        OUT: 'blue',
        SINGLE: 'green',
        DOUBLE: 'orange',
        TRIPLE: 'purple',
        HOMERUN: 'red'
    };

    const filteredData = filter !== null ?
            data.battedBallData.filter(datum => {
                return (!filter.launchAngle || datum.launchAngle === filter.launchAngle) &&
                    (!filter.region || datum.region === filter.region);
            })
        : data.battedBallData;

    const exitVelocities = filteredData.map(d => d.exitVelocity).filter(ev => ev !== 0);

    const scatterTraces: Partial<Data>[] = resultTypes.map(result => {
        const filtered = filteredData.filter(ev => ev.exitVelocity !== 0).filter(d => d.result === result.toString());
        return {
            x: filtered.map(d => d.exitVelocity),
            y: filtered.map(() => Math.random() * 0.01),
            mode: 'markers',
            type: 'scatter',
            name: result,
            marker: { color: colors[result], size: 8 },
            hoverinfo: 'x+name'
        };
    });

    const minEV = Math.min(...exitVelocities);
    const maxEV = Math.max(...exitVelocities);

    const layout: Partial<Layout> = {
        title: {
            text: `Exit Velocities ${
                filter ? `(${[filter.region, filter.launchAngle].filter(Boolean).join(", ")})` : "(All)"
            }`
        },
        xaxis: { title: { text: 'Exit Velocity (mph)' }, range: [minEV - 5, maxEV + 5] },
        yaxis: { visible: false },
        showlegend: true,
        height: 300
    };

    const counts = resultTypes.reduce((acc, result) => {
        acc[result] = filteredData.filter(d => d.result === result.toString()).length;
        return acc;
    }, {} as Record<typeof resultTypes[number], number>);

    layout.annotations = [
        {
            x: 0.5,
            y: -0.3,
            xref: 'paper',
            yref: 'paper',
            text: `
      <b>OUT:</b> ${counts.OUT} &nbsp;&nbsp;
      <b>SINGLE:</b> ${counts.SINGLE} &nbsp;&nbsp;
      <b>DOUBLE:</b> ${counts.DOUBLE} &nbsp;&nbsp;
      <b>TRIPLE:</b> ${counts.TRIPLE} &nbsp;&nbsp;
      <b>HR:</b> ${counts.HOMERUN}
    `,
            showarrow: false,
            align: 'center',
            font: { size: 14 }
        }
    ];
    return <Plot data={[...scatterTraces]} layout={layout} config={{ responsive: true }} />;
};

export default BattedBallScatterPlot;
