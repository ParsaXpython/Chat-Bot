import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    borderBottom: '1px solid #e5e5e5',
  },
  toolbar: {
    minHeight: '52px',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#1f1f1f',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '20px',
    padding: '4px 12px',
    width: 'auto',
    minWidth: '180px',
  },
  searchMobile: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '20px',
    padding: '4px 12px',
    width: '100%',
    maxWidth: 'calc(100vw - 100px)',
  },
  searchIcon: {
    color: '#9ca3af',
    marginRight: '6px',
    fontSize: '1rem',
    flexShrink: 0,
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    padding: '6px 0',
    fontSize: '0.85rem',
    outline: 'none',
    width: '100%',
    minWidth: 0,
    '&::placeholder': {
      color: '#9ca3af',
    },
  },
  newChatContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 20px',
    backgroundColor: '#ffffff',
  },
  newChatButton: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '40px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#1f1f1f',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    margin: 0,
    padding: 0,
    flexShrink: 0,
  },
  buttonText: {
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: 1,
  },
  // استایل‌های لیست چت‌های اخیر
  recentChatsContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 12px',
  },
  sectionTitle: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: '#9ca3af',
    padding: '12px 16px 4px 16px',
    letterSpacing: '0.5px',
  },
  chatItem: {
    borderRadius: '12px',
    marginBottom: '2px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  chatTitle: {
    fontSize: '0.85rem',
    fontWeight: 400,
    color: '#1f1f1f',
  },
  chatPreview: {
    fontSize: '0.7rem',
    color: '#9ca3af',
  },
}));

export default function ToolBar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // نمونه داده برای چت‌های اخیر
  const [recentChats] = useState([
    { id: 1, title: 'چت درباره React', preview: 'چگونه می‌توانم یک کامپوننت بسازم...', date: 'امروز' },
    { id: 2, title: 'سوال برنامه‌نویسی', preview: 'خطایی در کد من وجود دارد...', date: 'دیروز' },
    { id: 3, title: 'معرفی پروژه جدید', preview: 'این پروژه یک چت‌بات هوشمند است...', date: 'دیروز' },
    { id: 4, title: 'رفع باگ', preview: 'مشکل در اتصال به سرور...', date: '۲ روز پیش' },
    { id: 5, title: 'آموزش Material-UI', preview: 'چگونه از استایل‌ها استفاده کنم...', date: '۳ روز پیش' },
  ]);

  return (
    <div className={classes.root}>
      {/* تولبار اصلی */}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.logo}>
            Chat-Bot
          </Typography>
          
          <div className={isMobile ? classes.searchMobile : classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <input
              className={classes.searchInput}
              placeholder="Search"
            />
          </div>
        </Toolbar>
      </AppBar>

      {/* دکمه new chat */}
      <div className={classes.newChatContainer}>
        <button className={classes.newChatButton}>
          <AddIcon className={classes.icon} />
          <span className={classes.buttonText}>new chat</span>
        </button>
      </div>

      {/* لیست چت‌های اخیر */}
      <div className={classes.recentChatsContainer}>
        <Typography className={classes.sectionTitle}>
          RECENT CHATS
        </Typography>
        <List component="nav" disablePadding>
          {recentChats.map((chat, index) => (
            <React.Fragment key={chat.id}>
              <ListItem 
                button 
                className={classes.chatItem}
                onClick={() => console.log('Opening chat:', chat.title)}
              >
                <ListItemText 
                  primary={
                    <Typography className={classes.chatTitle}>
                      {chat.title}
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.chatPreview}>
                      {chat.preview}
                    </Typography>
                  }
                />
              </ListItem>
              {index < recentChats.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
}