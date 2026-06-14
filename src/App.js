import React, { useState, useEffect, useRef } from "react";
import './styles/App.css';
import { Grid, makeStyles, Drawer, Hidden } from "@material-ui/core";
import SimpleNavbar from "./components/Navbar";
import ToolBar from "./components/ToolBar";
import Input from "./components/Input";
import ChatContainer from "./components/ChatContainer";

const useStyles = makeStyles((theme) => ({
    rightSide: {
        borderRight: '0.1rem solid gray',
        height: "100vh",
    },
    drawerPaper: {
        width: '280px',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#fafafa',
    },
    chatArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0, // این خیلی مهم است
        overflow: 'hidden',
    },
}));

export default function App() {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: 'سلام! من چت‌بات هستم. چطور می‌توانم به شما کمک کنم؟',
            timestamp: Date.now()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const handleTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchMove = (e) => {
            touchEndX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            if (touchStartX.current < 50 && 
                touchEndX.current > touchStartX.current + 50 && 
                !drawerOpen) {
                setDrawerOpen(true);
            }
            if (touchEndX.current < touchStartX.current - 50 && drawerOpen) {
                setDrawerOpen(false);
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [drawerOpen]);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleSendMessage = async (message) => {
        const userMessage = {
            sender: 'user',
            text: message,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        setTimeout(() => {
            const aiResponse = {
                sender: 'ai',
                text: `پاسخ به: "${message}"`,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return ( 
        <>
            <Grid container>
                <Hidden xsDown>
                    <Grid item md={3} className={classes.rightSide}>
                        <ToolBar />
                    </Grid>
                </Hidden>

                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <ToolBar />
                </Drawer>

                <Grid item xs={12} md={9} className={classes.mainContent}>
                    <SimpleNavbar />
                    <div className={classes.chatArea}>
                        <ChatContainer messages={messages} isTyping={isTyping} />
                    </div>
                    <Input onSendMessage={handleSendMessage} placeholder="Type your question..."/>
                </Grid>
            </Grid>
        </> 
    );
}