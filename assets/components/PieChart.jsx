import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';

export default function PieChart({chartData}) {
    let chartRef = useRef(null);

    useEffect(() => {
        let pieChart;
        if (chartRef.current !== null) {
            pieChart = echarts.init(document.getElementById('chartContainer'));
        }

        if (pieChart !== null) {
            pieChart.setOption({
                series: [
                    {
                        type: 'pie',
                        data: chartData
                    }
                ]
            });
        }

        // Return cleanup function
        return () => {
            pieChart?.dispose();
        };
    }, [chartData]);

    return (
        <>
            <div ref={chartRef} id="chartContainer" style={{width: "100%", height: "400px"}}></div>
        </>
    );
}