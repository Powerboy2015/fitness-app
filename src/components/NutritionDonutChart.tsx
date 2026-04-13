import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const NutritionDonutChart: React.FC = () => {
    const Rawseries = [1200, 45, 30, 25];
    const max = [2000, 60, 60, 60];
    const labels = ['Calories', 'Carbs', 'Proteins', 'Fats'];
    const colors = ['#F67631', '#DC143C', '#4DA3FF', '#32CD32'];
    const units = ['kcal', 'g', 'g', 'g'];

    const series = Rawseries.map((value, i) =>
        Math.min((value / max[i]) * 100, 100)
    );

    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            background: 'transparent',
        },
        colors,
        plotOptions: {
            radialBar: {
                hollow: { size: '35%' },
                track: {
                    background: '#2A2A2A',
                    margin: 6,
                    strokeWidth: '100%',
                },
                dataLabels: {
                    show: false,
                },
            },
        },
        stroke: { lineCap: 'round' },
        states: {
            hover: {
                filter: { type: 'none' },
            },
            active: {
                filter: { type: 'none' },
            },
        },
    };

    const legendData = labels.map((label, i) => ({
        label,
        value: Rawseries[i],
        color: colors[i],
        unit: units[i],
        max: max[i],
    }));

    return (
        <div style={{ width: '100%', textAlign: 'center', color: 'white' }}>
            <Chart
                options={options}
                series={series}
                type="radialBar"
                height={300}
            />

            <div style={{ marginTop: 16 }}>
                <div style={{ textAlign: 'left', marginBottom: 16 }}>
                    <span style={{ color: colors[0], fontSize: 24, fontWeight: 700, display: 'block'}}>{labels[0]}</span>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>
                        {Rawseries[0]}
                        <span style={{ fontSize: 14, color: '#888' }}>/{max[0]}{units[0]}</span>
                    </div>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: 20,
                    }}>
                    {legendData.slice(1).map((item, idx) => (
                        <div>
                            <div key={idx} style={{ display: 'block', justifyContent: 'center', width: '100%', borderColor: item.color}} className="border-2 rounded-xl p-3">
                                <span style={{color: item.color, display: 'block'}}>{item.label}</span>
                                <span>{item.value}</span>
                                <span className="text-[10px] text-gray-500">/{item.max}{item.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};