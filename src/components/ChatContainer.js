import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 16px',
    backgroundColor: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    height: '100%',
    width: '100%',
    minHeight: 0,
    // ===== فقط اینجا وسط‌چین می‌شود =====
    [theme.breakpoints.up('md')]: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px 32px',
      height: 'calc(100% - 32px)',
      marginTop: '16px',
      marginBottom: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '900px',
    },
  },
  // ========== پیام کاربر ==========
  userMessage: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: '12px',
    width: '100%',
  },
  userContent: {
    maxWidth: '70%',
    backgroundColor: '#007aff',
    color: '#ffffff',
    borderRadius: '18px',
    padding: '10px 16px',
    borderBottomRightRadius: '4px',
    order: 1,
  },
  userAvatar: {
    order: 2,
    width: '32px',
    height: '32px',
    flexShrink: 0,
    backgroundColor: '#1f1f1f',
  },
  // ========== پیام ربات ==========
  aiMessage: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '12px',
    width: '100%',
  },
  aiContent: {
    maxWidth: '70%',
    backgroundColor: '#f1f0f0',
    color: '#1f1f1f',
    borderRadius: '18px',
    padding: '10px 16px',
    borderBottomLeftRadius: '4px',
  },
  aiAvatar: {
    width: '32px',
    height: '32px',
    flexShrink: 0,
    backgroundColor: '#0066cc',
  },
  // ========== متن و زمان ==========
  messageText: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    color: 'inherit',
  },
  timestamp: {
    fontSize: '0.65rem',
    opacity: 0.7,
    marginTop: '4px',
    textAlign: 'right',
  },
  timestampAI: {
    fontSize: '0.65rem',
    opacity: 0.7,
    marginTop: '4px',
    textAlign: 'left',
  },
  // ========== تایپینگ ==========
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#f1f0f0',
    borderRadius: '18px',
    borderBottomLeftRadius: '4px',
    width: 'fit-content',
  },
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#9ca3af',
    borderRadius: '50%',
    animation: '$bounce 1.4s infinite ease-in-out',
    '&:nth-child(1)': { animationDelay: '-0.32s' },
    '&:nth-child(2)': { animationDelay: '-0.16s' },
  },
  '@keyframes bounce': {
    '0%, 80%, 100%': { transform: 'scale(0)' },
    '40%': { transform: 'scale(1)' },
  },
}));

export default function ChatContainer({ messages, isTyping }) {
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={classes.container}>
      {messages.map((msg, index) => (
        <div key={index}>
          {msg.sender === 'user' ? (
            <div className={classes.userMessage}>
              <div className={classes.userContent}>
                <Typography className={classes.messageText}>
                  {msg.text}
                </Typography>
                <div className={classes.timestamp}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
              <Avatar className={classes.userAvatar}>
                <PersonIcon />
              </Avatar>
            </div>
          ) : (
            <div className={classes.aiMessage}>
              <Avatar className={classes.aiAvatar}>
              </Avatar>
              <div className={classes.aiContent}>
                <Typography className={classes.messageText}>
                  {msg.text}
                </Typography>
                <div className={classes.timestampAI}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className={classes.aiMessage}>
          <Avatar className={classes.aiAvatar}>
            <SmartToyIcon />
          </Avatar>
          <div className={classes.typingIndicator}>
            <div className={classes.dot} />
            <div className={classes.dot} />
            <div className={classes.dot} />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}