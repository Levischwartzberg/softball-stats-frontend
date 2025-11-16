import React from 'react';
import Plot from "react-plotly.js";
import { PlayerBattedBallData } from "@/types/types";
import { Data, Layout } from "plotly.js";

type Props = {
    data: PlayerBattedBallData;
    filter: { region : string | null, launchAngle: string | null } | null;
};

const RegionPieChart: React.FC<Props> = ({ data, filter }) => {
    const filteredData = filter !== null ? data.battedBallData.filter(datum => datum.launchAngle === filter?.launchAngle) : data.battedBallData;

    const regionCounts: Record<string, number> = {};
    filteredData.forEach(datum => {
        const angle = datum.region || "Unknown";
        regionCounts[angle] = (regionCounts[angle] || 0) + 1;
    });

    const labels = Object.keys(regionCounts);
    const values = Object.values(regionCounts);

    const pieTrace: Partial<Data> = {
        type: "pie",
        labels,
        values,
        textinfo: "label+percent",
        hoverinfo: "label+value+percent",
        marker: {
            colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"] // custom color palette
        }
    };

    const layout: Partial<Layout> = {

        title: {
            text: `Region Distribution (${filter !== null ? filter.launchAngle : "All"})`,
            font: { size: 16 },
            x: 0.4,
            xanchor: "center"
        },
        height: 300,
        width: 500,
        margin: { t: 40, b: 60, l: 40, r: 5 }
    };

    if (filter !== null && filter?.launchAngle === null) return <></>;
    return <Plot data={[pieTrace]} layout={layout} config={{ responsive: true }} />;
};

export default RegionPieChart;

