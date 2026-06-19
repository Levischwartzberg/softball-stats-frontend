import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    useGetPlayerBattedBallDataQuery, useLazyGetPlayerBattedBallDataQuery,
} from "@/store/playerBattedBallData/playerBattedBallDataApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import {Autocomplete, Typography, TextField} from "@mui/material";
import {useGetPlayerInfoQuery} from "@/store/players/playerApiSlice";
import BattedBallCharts from "@/components/BattedBallCharts/BattedBallCharts";
import GenericAccordion from "@/components/common/GenericAccordion/GenericAccordion";

const AdvancedPlayerDataPage = () => {
    const { playerId } = useParams();
    const [selectedYear, setSelectedYear] = useState(2025);
    const getPlayerBattedBallDataQuery = useGetPlayerBattedBallDataQuery({
        playerId : parseInt(playerId!),
        year : undefined
    });
    const [getPlayerBattedBallDataByYearTrigger, getPlayerBattedBallDataByYearQuery] = useLazyGetPlayerBattedBallDataQuery();
    const getPlayerInfo = useGetPlayerInfoQuery(parseInt(playerId!));

    useEffect(() => {
        getPlayerBattedBallDataByYearTrigger({
            playerId : parseInt(playerId!),
            year : selectedYear
        });
    }, []);

    return (
        <div className="content">
            <AsyncStateWrapper query={getPlayerInfo as QueryState}>
                <Typography variant="h4" gutterBottom>
                    Advanced Metrics
                </Typography>
                {getPlayerInfo.data && (
                    <Typography variant="h5" gutterBottom>
                        {getPlayerInfo.data.firstName} {getPlayerInfo.data.lastName}
                    </Typography>
                )}

                <GenericAccordion
                    title={<h1>All Years</h1>}
                    content={
                        <AsyncStateWrapper query={getPlayerBattedBallDataQuery as QueryState}>
                            <BattedBallCharts data={getPlayerBattedBallDataQuery.data!} />
                        </AsyncStateWrapper>
                    }
                    defaultExpanded={true}
                />

                <GenericAccordion
                    title={<h1>Batted Ball Data : {selectedYear}</h1>}
                    content={
                    <>
                        <Autocomplete
                            disableClearable
                            disablePortal
                            blurOnSelect={true}
                            options={[2025, 2026]}
                            sx={{ width: 300 }}
                            value={selectedYear}
                            onChange={(event, value) => {
                                setSelectedYear(value!);
                                getPlayerBattedBallDataByYearTrigger({
                                    playerId : parseInt(playerId!),
                                    year : value!
                                });
                            }
                        }
                            renderInput={(params) => <TextField {...params} label="Year" />}
                        />
                        <AsyncStateWrapper query={getPlayerBattedBallDataByYearQuery as QueryState}>
                            <BattedBallCharts data={getPlayerBattedBallDataByYearQuery.data!} />
                        </AsyncStateWrapper>
                    </>
                    }
                    defaultExpanded={false}
                />
            </AsyncStateWrapper>
        </div>
    );
};

export default AdvancedPlayerDataPage;

