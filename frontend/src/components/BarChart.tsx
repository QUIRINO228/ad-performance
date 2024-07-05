import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import CustomTooltip from "./CustomTooltip";

interface AdInfo {
    id: string;
    adTitle: string;
    date: string;
    views: number;
    clicks: number;
    price: number;
    clicks_per_view: number;
    cost_per_click: number;
}

interface BarChartComponentProps {
    adInfo: AdInfo[];
    handleFilterChange: React.Dispatch<React.SetStateAction<number>>;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ adInfo, handleFilterChange }) => {
    const internalHandleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            handleFilterChange(value);
        } else {
            handleFilterChange(0);
        }
    };

    return (
        <div style={{width: '100%', height: '500px'}}>
            <div className="mb-5">
                <label htmlFor="filterViews" className="mr-2">
                    Filter by Views:
                </label>
                <input
                    type="number"
                    id="filterViews"
                    name="filterViews"
                    min="0"
                    className="p-2 border border-gray-300 rounded-md"
                    onChange={internalHandleFilterChange}
                />
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adInfo} margin={{right: 30}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="adTitle"/>
                    <YAxis/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend/>
                    <Bar dataKey="clicks_per_view" fill="#2563eb"/>
                    <Bar dataKey="cost_per_click" fill="#8b5cf6"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
)
    ;
};

export default BarChartComponent;


