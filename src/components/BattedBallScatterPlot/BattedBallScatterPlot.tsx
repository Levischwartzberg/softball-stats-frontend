
import React, { useMemo, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import type { Data, Layout, PlotMouseEvent } from 'plotly.js';
import { PlayerBattedBallData } from '@/types/types';
import { LaunchAngle, Region } from '@/components/PlayerBattedBallWRCPlusTable/PlayerBattedBallWRCPlusTable';

type Props = {
    data: PlayerBattedBallData;
    filter: { region: Region | null; launchAngle: LaunchAngle | null } | null;
};

type TooltipState = {
    visible: boolean;
    x: number;
    y: number;
    playerName?: string;
    playerId?: number | null;
    gameInfoId?: number | null;
    exitVelocity?: number;
    color?: string;
};

const BattedBallScatterPlot: React.FC<Props> = ({ data, filter }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, color: '#111111' });

    const resultTypes = ['OUT', 'SINGLE', 'DOUBLE', 'TRIPLE', 'HOMERUN'] as const;
    const colors: Record<typeof resultTypes[number], string> = {
        OUT: '#4A6FA5',
        SINGLE: '#FFCBA4',
        DOUBLE: '#FF9966',
        TRIPLE: '#FF6347',
        HOMERUN: '#B22222',
    };

    const filteredData = useMemo(() => {
        return filter !== null
            ? data.battedBallData.filter((datum) => {
                return (
                    (!filter.launchAngle || datum.launchAngle === filter.launchAngle) &&
                    (!filter.region || datum.region === filter.region)
                );
            })
            : data.battedBallData;
    }, [data.battedBallData, filter]);

    const exitVelocities = filteredData.map((d) => d.exitVelocity).filter((ev) => ev !== 0);

    const CD = {
        playerName: 0,
        gameInfoId: 1,
        playerId: 2,
        launchAngle: 3,
        region: 4,
        result: 5,
    } as const;

    const scatterTraces: Partial<Data>[] = resultTypes.map((result) => {
        const filtered = filteredData
            .filter((ev) => ev.exitVelocity !== 0)
            .filter((d) => d.result === result.toString());

        return {
            x: filtered.map((d) => d.exitVelocity),
            y: filtered.map(() => Math.random() * 0.01), // tiny jitter
            mode: 'markers',
            type: 'scatter',
            name: result,
            marker: { color: colors[result], size: 8 },

            customdata: filtered.map((d) => [
                `${(d.player?.firstName ?? '').trim()} ${(d.player?.lastName ?? '').trim()}`.trim(),
                d.gameInfoId ?? null,
                d.player?.id ?? null,
                d.launchAngle ?? null,
                d.region ?? null,
                d.result ?? null,
            ]),

            text: filtered.map((d) => `${d.player?.firstName ?? ''} ${d.player?.lastName ?? ''}`.trim()),
            hovertemplate:
                '<b>%{customdata[' + CD.playerName + ']}</b><br>' +
                'exit velocity: %{x:.1f} mph<br>' +
                'launch: %{customdata[' + CD.launchAngle + ']}<br>' +
                'region: %{customdata[' + CD.region + ']}<br>' +
                '<extra></extra>',
        };
    });

    const minEV = Math.min(...exitVelocities);
    const maxEV = Math.max(...exitVelocities);

    const layout: Partial<Layout> = {
        title: {
            text: `Exit Velocities ${
                filter ? `(${[filter.region, filter.launchAngle].filter(Boolean).join(', ')})` : '(All)'
            }`,
        },
        xaxis: { title: { text: 'Exit Velocity (mph)' }, range: [minEV - 5, maxEV + 5] },
        yaxis: { visible: false },
        showlegend: true,
        height: 300,
    };

    const counts = resultTypes.reduce((acc, result) => {
        acc[result] = filteredData.filter((d) => d.result === result.toString()).length;
        return acc;
    }, {} as Record<typeof resultTypes[number], number>);

    layout.annotations = [
        {
            x: 0.5,
            y: -0.65,
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
            font: { size: 14 },
        },
    ];

    const computeColorFromHitType = (result: string): string => {
        return colors[result as keyof typeof colors] || '#111111';
    }

    // Handle Plotly point click: show tooltip near the click with links
    const handleClick = (e: PlotMouseEvent) => {
        const pt = e.points?.[0];
        if (!pt || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.event.clientX - rect.left;
        const y = e.event.clientY - rect.top;

        const cd = (pt.customdata ?? []) as (number | string | Date | null)[];
        const playerName = String(cd[CD.playerName] ?? '');
        const gameInfoId = cd[CD.gameInfoId] as number | null;
        const playerId = cd[CD.playerId] as number | null;
        const result = cd[CD.result]

        setTooltip({
            visible: true,
            x: x + 12,
            y: y + 12,
            playerName,
            playerId,
            gameInfoId,
            exitVelocity: typeof pt.x === 'number' ? pt.x : Number(pt.x),
            color: computeColorFromHitType(result as string),
        });
    };

    const handleContainerClickCapture: React.MouseEventHandler<HTMLDivElement> = (evt) => {
        const target = evt.target as HTMLElement;
        const clickedPoint = target.closest('.point');
        if (!clickedPoint && tooltip.visible) {
            setTooltip((t) => ({ ...t, visible: false }));
        }
    };

    return (
        <div
            ref={containerRef}
            onClickCapture={handleContainerClickCapture}
            style={{ position: 'relative' }}
        >
            <Plot
                data={[...scatterTraces]}
                layout={layout}
                config={{ responsive: true }}
                onClick={handleClick}
                onDoubleClick={() => setTooltip((t) => ({ ...t, visible: false }))}
            />

            {tooltip.visible && (
                <div
                    className="bbd-tooltip"
                    style={{
                        position: 'absolute',
                        left: tooltip.x,
                        top: tooltip.y,
                        background: tooltip.color || '#222',
                        color: '#111111',
                        border: '1px solid #333',
                        borderRadius: 6,
                        boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
                        padding: '10px 12px',
                        maxWidth: 260,
                        zIndex: 1000,
                        pointerEvents: 'auto',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 6,
                        }}
                    >
                        <strong>{tooltip.playerName || 'Unknown player'}</strong>
                        <button
                            aria-label="Close"
                            onClick={() => setTooltip((t) => ({ ...t, visible: false }))}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#111111',
                                fontSize: 18,
                                cursor: 'pointer',
                            }}
                        >
                            ×
                        </button>
                    </div>

                    <div>
                        <div>
                            Exit velocity:{' '}
                            <strong>
                                {tooltip.exitVelocity != null
                                    ? `${tooltip.exitVelocity.toFixed(1)} mph`
                                    : '—'}
                            </strong>
                        </div>

                        <div style={{ marginTop: 6 }}>
                            {tooltip.playerId != null && (
                                <a href={`/advancedPlayerData/${tooltip.playerId}`} target="_blank" rel="noopener">
                                    View player ↗
                                </a>)
                            }
                            {tooltip.gameInfoId != null && (
                                <>
                                    {' '}
                                    ·{' '}
                                    <a href={`/game/${tooltip.gameInfoId}`} target="_blank" rel="noopener">
                                        View game ↗
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BattedBallScatterPlot;
