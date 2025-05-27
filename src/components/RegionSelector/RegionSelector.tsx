import {AtBat, RegionENUM} from "@/types/types";
import css from "./RegionSelector.module.scss";
import React from 'react';

type RegionSelectorProps = {
    atBat: AtBat;
    setAtBat: (atBat : AtBat) => void;
}

const regions = [RegionENUM.FOUL_LEFT, RegionENUM.LEFT, RegionENUM.LEFT_CENTER, RegionENUM.CENTER, RegionENUM.RIGHT_CENTER, RegionENUM.RIGHT, RegionENUM.FOUL_RIGHT];

const RegionSelector = (props : RegionSelectorProps) => {

    const changeRegion = (region: string) => {
        const atBatCopy = { ...props.atBat };
        atBatCopy.region = region as RegionENUM;
        props.setAtBat(atBatCopy);
    };

    return (
        <div className={css.diamondContainer}>
            <svg viewBox="0 0 200 200" className={css.diamond}>
                {/* Diamond shape */}
                <polygon points="100,60 170,130 100,200 30,130" className={css.diamondShape} />

                {[...Array(6)].map((_, i) => {
                    const angle = (-45 + i * 18) * (Math.PI / 90); // 6 lines from -45° to +45°
                    const x = 100 + 100 * Math.sin(angle);
                    const y = 100 - 100 * Math.cos(angle);
                    return <line key={i} x1="100" y1="200" x2={x} y2={y} className={css.dividerLine} />;
                })}

                {regions.map((label, i) => {
                    const angle = (-63 + (i + 0.5) * 18) * (Math.PI / 90);
                    const x = 100 + 85 * Math.sin(angle);
                    const y = 120 - 100 * Math.cos(angle);
                    return (
                        <foreignObject key={i} x={x - 20} y={y - 20} width="40" height="40">
                            <label className={css.radioLabel}>
                                {i}
                                <input
                                    type="radio"
                                    name="region"
                                    value={label}
                                    checked={props.atBat.region === label}
                                    onChange={(event) => changeRegion(event.target.value)}
                                />
                            </label>
                        </foreignObject>
                    );
                })}
            </svg>
        </div>
    );
}

export default RegionSelector;
