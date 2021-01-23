import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Link } from 'react-router-dom';
import User from '../auth/User';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    userName: {
        fontSize: 15,
    }
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title + ' header_title'}>
                        Apex Legends エーペックスレジェンズ掲示板
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                            <span className={classes.userName}>
                                {User.isLoggedIn() ?                                    
                                    JSON.parse(User.getLocalStorage('user')).name
                                :
                                    'ゲストユーザー'
                                }
                            </span>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            {User.isLoggedIn() === true ? (
                                <div>
                                    {/* <MenuItem><Link to="/profile" className="route_link">プロフィール</Link></MenuItem> */}
                                    <MenuItem onClick={() => User.logout()}>ログアウト</MenuItem>
                                </div>)
                                :
                                (<div>
                                    <MenuItem><Link to="/register" className="route_link">ユーザー登録</Link></MenuItem>
                                    <MenuItem><Link to="/login" className="route_link">ログイン</Link></MenuItem>
                                </div>
                                )}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}