import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SmartToyIcon from '@material-ui/icons/SmartPhone';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 16px',
    backgroundColor: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    height: '100%',
    width: '100%',
    minHeight: 0, // کلیدی برای flex
  },
  userMessage: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    width: '100%',
  },
  userContent: {
    maxWidth: '70%',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '20px',
    padding: '12px 16px',
    borderBottomRightRadius: '4px',
  },
  aiMessage: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '12px',
    width: '100%',
  },
  aiContent: {
    maxWidth: '70%',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '20px',
    padding: '12px 16px',
    borderBottomLeftRadius: '4px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    flexShrink: 0,
  },
  avatarAI: {
    backgroundColor: '#0066cc',
  },
  avatarUser: {
    backgroundColor: '#1f1f1f',
  },
  messageText: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    color: '#1f1f1f',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  timestamp: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    marginTop: '4px',
    textAlign: 'right',
  },
  timestampAI: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    marginTop: '4px',
    textAlign: 'left',
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',
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
              <Avatar className={`${classes.avatar} ${classes.avatarUser}`}>
                <PersonIcon />
              </Avatar>
            </div>
          ) : (
            <div className={classes.aiMessage}>
              <Avatar className={`${classes.avatar} ${classes.avatarAI}`}>
                <SmartToyIcon />
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
          <Avatar className={`${classes.avatar} ${classes.avatarAI}`}>
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