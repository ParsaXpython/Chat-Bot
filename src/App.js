import React, { useState } from "react";
import './styles/App.css';
import { Grid, makeStyles } from "@material-ui/core";
import SimpleNavbar from "./components/Navbar";
import Input from "./components/Input";
import ChatContainer from "./components/ChatContainer";

const useStyles = makeStyles((theme) => ({
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#fafafa',
      width: '100%',
    },
    chatArea: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      overflow: 'hidden',
    },
}));

export default function App() {
    const classes = useStyles();
    
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: 'سلام! من چت‌بات هستم. چطور می‌توانم به شما کمک کنم؟',
            timestamp: Date.now()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async (message) => {
        const userMessage = {
            sender: 'user',
            text: message,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const response = await fetch('/api/send', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            });

            if (!response.ok) throw new Error(response.statusText);
            
            const data = await response.json();
            if (data.message.startsWith('ERR:')) {
                console.error('خطا در ارسال پیام:', error);
                const errorResponse = {
                    sender: 'ai',
                    text: 'Please enter your question correctly...',
                    timestamp: Date.now()
                };
                setMessages(prev => [...prev, errorResponse]);
            } else {
                const aiResponse = {
                    sender: 'ai',
                    text: data.message,
                    timestamp: Date.now()
                };
                setMessages(prev => [...prev, aiResponse]);    
            }
        } catch (error) {
            console.error('خطا در ارسال پیام:', error);
            const errorResponse = {
                sender: 'ai',
                text: 'متاسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.',
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    return ( 
        <Grid container style={{ height: '100vh', margin: 0, width: '100%' }}>
            <Grid item xs={12} className={classes.mainContent}>
                <SimpleNavbar />
                <div className={classes.chatArea}>
                    <ChatContainer messages={messages} isTyping={isTyping} />
                </div>
                <Input onSendMessage={handleSendMessage} placeholder="Type your question..."/>
            </Grid>
        </Grid>
    );
}