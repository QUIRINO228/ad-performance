'use client'


import React from "react";
import {TooltipProps} from "recharts";

interface CustomTooltipProps extends TooltipProps<number, string> {
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({active, payload}) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-sm text-blue-400">
                    Date:
                    <span className="ml-2">{payload[0].payload.date}</span>
                </p>
                <p className="text-sm text-blue-400">
                    Views:
                    <span className="ml-2">{payload[0].payload.views}</span>
                </p>
                <p className="text-sm text-blue-400">
                    Price: $
                    <span className="ml-2">{payload[0].payload.price}</span>
                </p>
                <p className="text-sm text-blue-400">
                    Clicks:
                    <span className="ml-2">{payload[0].payload.clicks}</span>
                </p>
                <p className="text-sm text-blue-400">
                    Clicks_per_view:
                    <span className="ml-2">${payload[0].value}</span>
                </p>
                <p className="text-sm text-indigo-400">
                    Cost_per_click:
                    <span className="ml-2">${payload[1].value}</span>
                </p>
            </div>
        );
    }
    return null;
}

export default CustomTooltip