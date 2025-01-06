import React from 'react';
import ChatBox from '../components/ChatBox';
import { Container, Typography } from '@mui/material';

function Chat() {
    return (
        <Container style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Chat with Our AI
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Type your message below, and the AI will analyze your sentiment.
            </Typography>
            <ChatBox />
        </Container>
    );
}

export default Chat;
