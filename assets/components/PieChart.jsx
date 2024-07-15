import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';

export default function PieChart({chartData}) {
    let chartRef = useRef(null);
    let pieChart;

    useEffect(() => {
        const listener = () => {
            if (pieChart !== undefined) {
                pieChart.resize();
            }
        };

        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    });

    useEffect(() => {
        if (chartRef.current !== null) {
            pieChart = echarts.init(document.getElementById('chartContainer'));
        }

        let series = [];
        if (chartData.length > 0) {
            series = [
                {
                    type: 'pie',
                    data: chartData,
                    // radius: '50%',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    label: {
                        show: true,
                        position: 'outside',
                        fontStyle: 'bold'
                    }
                }
            ];
        }

        if (pieChart !== null) {
            pieChart.setOption({
                title: {
                    show: chartData.length === 0,
                    textStyle: {
                        color: "grey",
                        fontSize: 20
                    },
                    text: "No data",
                    left: "center",
                    top: "center"
                },
                tooltip: {
                    trigger: 'item'
                },
                series: series
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