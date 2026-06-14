import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e5e5',
    padding: '16px 20px',
  },
  inputWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '24px',
    padding: '8px 8px 8px 16px',
    transition: 'all 0.2s ease',
    '&:focus-within': {
      borderColor: '#c4c4c4',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
  },
  textarea: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    padding: '8px 0',
    resize: 'none',
    fontFamily: 'inherit',
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: 'transparent',
    '&::placeholder': {
      color: '#9ca3af',
    },
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginLeft: '8px',
  },
  attachButton: {
    padding: '8px',
    color: '#9ca3af',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  sendButton: {
    backgroundColor: '#1f1f1f',
    color: '#ffffff',
    padding: '8px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#333333',
      transform: 'scale(1.05)',
    },
    '&.active': {
      backgroundColor: '#0066cc', // آبی وقتی متن وجود دارد
    },
  },
  sendIcon: {
    fontSize: '1.2rem',
    transform: 'rotate(90deg)', // چرخاندن فلش به سمت بالا
  },
}));

export default function Input({ onSendMessage, placeholder = "Send a message..." }) {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // تنظیم خودکار ارتفاع textarea با محتوای متن
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(message);
      setMessage('');
      // ریست ارتفاع textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isMessageEmpty = !message.trim();

  return (
    <div className={classes.container}>
      <div className={classes.inputWrapper}>
        {/* متن در سمت چپ */}
        <textarea
          ref={textareaRef}
          className={classes.textarea}
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
        />
        
        {/* دکمه‌ها در سمت راست */}
        <div className={classes.buttonContainer}>
          {/* دکمه آپلود فایل (اختیاری) */}
          <IconButton 
            className={classes.attachButton} 
            size="small"
            aria-label="attach file"
          >
            <AttachFileIcon style={{ fontSize: '1.1rem', transform: 'rotate(45deg)' }} />
          </IconButton>

          {/* دکمه ارسال/فلش به سمت بالا */}
          <IconButton 
            className={`${classes.sendButton} ${!isMessageEmpty ? 'active' : ''}`}
            onClick={handleSend}
            disabled={isMessageEmpty}
            size="small"
            aria-label="send message"
            style={!isMessageEmpty ? { backgroundColor: '#0066cc' } : {}}
          >
            <SendIcon className={classes.sendIcon} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}