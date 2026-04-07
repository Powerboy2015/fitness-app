import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const NutritionDonutChart: React.FC = () => {
    const series = [1200, 30, 30, 30];
    const labels = ['Calories', 'Carbs', 'Fats', 'Proteins'];
    const colors = ['#F67631', '#DC143C', '#4DA3FF', '#32CD32'];
    const units = ['cal', 'g', 'g', 'g'];

    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            background: 'transparent',
        },
        colors,
        plotOptions: {
            radialBar: {
                hollow: { size: '35%' },
                track: { background: '#2A2A2A', margin: 6, strokeWidth: '100%' },
                dataLabels: {
                    show: false,
                },
            },
        },
        stroke: { lineCap: 'round' },
        states: {
            hover: {
                filter: {
                    type: 'none', // disables hover highlight
                },
            },
            active: {
                filter: {
                    type: 'none', // disables click dimming
                },
            },
        },
    }

    const legendData = labels.map((label, i) => ({
        label,
        value: series[i],
        color: colors[i],
        unit: units[i],
    }));

    return (
        <div style={{ width: '100%', textAlign: 'center', color: 'white' }}>
            <Chart options={options} series={series} type="radialBar" height={300} />

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '12px 16px',
                    marginTop: 16,
                    justifyItems: 'start',
                }}
            >
                {legendData.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 2}}>
                    <span
                        style={{
                            display: 'inline-block',
                            width: 14,
                            height: 14,
                            background: item.color,
                            borderRadius: '50%',
                        }}
                    />
                        <span>{item.label}:</span>
                        <span>{item.value}</span>
                        <span>{item.unit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};