import React from 'react';
import Dashboard from '../components/Dashboard';
import { Container, Typography } from '@mui/material';

function Analytics() {
    return (
        <Container style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Sentiment Analytics Dashboard
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                See the real-time sentiment analysis of your conversations.
            </Typography>
            <Dashboard />
        </Container>
    );
}

export default Analytics;
