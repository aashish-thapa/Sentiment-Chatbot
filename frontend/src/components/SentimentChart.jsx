import React from 'react';
import { Bar } from 'react-chartjs-2';

function SentimentChart({ data }) {
    const chartData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                label: "Sentiment Scores",
                data: data.map((item) => item.score),
                backgroundColor: "rgba(75,192,192,0.6)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Sentiment Labels',
                    color: '#333',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sentiment Score',
                    color: '#333',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
                min: 0,
                max: 1,
                ticks: {
                    stepSize: 0.1,
                    callback: (value) => value.toFixed(1), // Rounding ticks to 1 decimal
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: (tooltipItems) => {
                        return `Sentiment: ${tooltipItems[0].label}`;
                    },
                    label: (tooltipItem) => {
                        return `Score: ${tooltipItem.raw.toFixed(2)}`;
                    },
                },
            },
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                    },
                    color: '#333',
                },
            },
        },
    };

    return (
        <div style={styles.chartContainer}>
            <h3 style={styles.chartTitle}>Sentiment Analysis Overview</h3>
            <div style={styles.chartWrapper}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}

// Styles for the SentimentChart component
const styles = {
    chartContainer: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    chartTitle: {
        fontSize: '1.5rem',
        color: '#333',
        marginBottom: '20px',
    },
    chartWrapper: {
        position: 'relative',
        height: '400px', // Fixed height for the chart
    },
};

export default SentimentChart;
