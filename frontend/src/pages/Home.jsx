import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';

function Home() {
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" gutterBottom>
                Welcome to the Sentiment Analysis Chatbot
            </Typography>
            <Typography variant="h6" gutterBottom>
                Explore how AI can understand emotions through text.
            </Typography>
            <div style={{ marginTop: '30px' }}>
                <Link to="/chat" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" size="large">
                        Start Chatting
                    </Button>
                </Link>
                <Link to="/analytics" style={{ textDecoration: 'none', marginLeft: '15px' }}>
                    <Button variant="outlined" color="secondary" size="large">
                        View Analytics
                    </Button>
                </Link>
            </div>
        </Container>
    );
}

export default Home;
