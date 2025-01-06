import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SentimentChart from './SentimentChart';

function Dashboard() {
    const [sentimentData, setSentimentData] = useState([]);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/stats/");
                setSentimentData(response.data);
                setLoading(false); // Successfully fetched data
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
                setLoading(false); // Error while fetching data
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Sentiment Analysis Dashboard</h2>
            <SentimentChart data={sentimentData} />
        </div>
    );
}

// Styles for the Dashboard component
const styles = {
    container: {
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f4f4f4',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    loading: {
        textAlign: 'center',
        paddingTop: '50px',
        fontSize: '1.5rem',
        color: '#007BFF',
    },
    error: {
        textAlign: 'center',
        paddingTop: '50px',
        fontSize: '1.5rem',
        color: '#FF0000',
    },
};

export default Dashboard;
