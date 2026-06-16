import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#f7f7f8', // رنگ خاکستری بسیار روشن (مثل DeepSeek)
    boxShadow: 'none', // بدون سایه
    borderBottom: '1px solid #e4e4e7', // یک خط حاشیه بسیار کمرنگ (مثل DeepSeek)
  },
  toolbar: {
    minHeight: '52px', // ارتفاع مناسب
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#1f1f1f', // رنگ مشکی ملایم
    letterSpacing: '-0.2px',
  },
  spacer: {
    flexGrow: 1,
  },
  // اگر می‌خواهید متن کوچکی سمت راست داشته باشید (اختیاری)
  rightText: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
}));

export default function SimpleNavbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/* لوگو/اسم برنامه */}
          <Typography className={classes.logoText}>
            Chat Bot with RiveScript ( ParsaXpython )
          </Typography>
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}