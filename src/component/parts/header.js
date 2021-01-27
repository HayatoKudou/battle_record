import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import User from '../auth/User';
import { diffDate } from '../../common';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';

import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title_pc: {
        flexGrow: 1,
    },
    title_smartphone: {
        width: '50%',
    },
    userName_pc: {
        fontSize: 15,
    },
    userName_smart: {
        fontSize: 13,
    },
    list: {
        width: 250,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    header_icons: {
        display: 'flex',
    },
    header_icon_smart: {
        padding: '7px',
    }
}));

export default function MenuAppBar() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [left_open, set_left_open] = useState(false);
    const [badge_open, set_badge_open] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function clearNotice(){
        var data = {
            user_id: User.isLoggedIn() ? JSON.parse(User.getLocalStorage('user')).id  : localStorage.getItem("user") === null ? null : JSON.parse(User.getLocalStorage('user')).id,
        }
        fetch('http://battle_record_api/api/clear_notice', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
            } else {
                return response.json().then(data => {
                    if('errors' in data){
                        console.log(data.errors);
                    } else {
                        User.set('notice', data.notice);
                    }
                });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const sideList = (
        <div className={classes.list}>
          <List>
            <Link to="/">
              <ListItem button>
                <ListItemText primary="Apex Legends エーペックスレジェンズ掲示板" />
              </ListItem>
            </Link>
            {User.isLoggedIn() ?
            <div>
            <Link to="/logout">
                <ListItem button>
                    <ListItemText primary="ログアウト" />
                </ListItem>
            </Link>
            </div>
            :
            <div>
            <Link to="/register">
                <ListItem button>
                    <ListItemText primary="ユーザー登録" />
                </ListItem>
            </Link>
            <Link to="/login">
                <ListItem button>
                    <ListItemText primary="ログイン" />
                </ListItem>
            </Link>
            </div>
            }
          </List>
        </div>
     );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => set_left_open(true)}>
                        <MenuIcon />
                    </IconButton>

                    <Drawer open={left_open} onClose={() => set_left_open(false)}>
                      <div
                        tabIndex={0}
                        role="button"
                        onClick={() => set_left_open(false)}
                        onKeyDown={() => set_left_open(false)}
                      >
                        {sideList}
                      </div>
                    </Drawer>

                    <Typography variant="h6" className={User.get('device') === 'pc' ? classes.title_pc : classes.title_smartphone + ' header_title'}>
                        {'Apex Legends エーペックスレジェンズ掲示板'}
                    </Typography>
                    <div>
                        <div className={classes.header_icons}>
                            <IconButton className={User.get('device') === 'smartphone' ? classes.header_icon_smart : ''} aria-label="show 17 new notifications" color="inherit" onClick={() => {set_badge_open(true);clearNotice()}}>
                            <Badge badgeContent={JSON.parse(User.getLocalStorage('notice')) != null ? JSON.parse(User.getLocalStorage('notice')).length : 0} color="secondary" max={99}>
                                <MailIcon  />
                            </Badge>

                            {badge_open && (
                                JSON.parse(User.getLocalStorage('notice')) != null && JSON.parse(User.getLocalStorage('notice')).length !== 0 ? (
                                    <ClickAwayListener onClickAway={() => set_badge_open(false)}>
                                        <Paper className="paper">
                                            {JSON.parse(User.getLocalStorage('notice')).map(key => (
                                                <div key={key.id}>
                                                    {diffDate(key.created_at) + ': '}{key.notice}
                                                </div>
                                            ))}
                                        </Paper>
                                    </ClickAwayListener>)
                                :
                                (<ClickAwayListener onClickAway={() => set_badge_open(false)}>
                                    <Paper className="paper">お知らせはありません。</Paper>
                                </ClickAwayListener>)
                            )}

                            </IconButton>
                            <IconButton
                                className={User.get('device') === 'smartphone' ? classes.header_icon_smart : ''}
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                                <span className={User.get('device') === 'pc' ? classes.userName_pc : classes.userName_smart}>
                                    {User.isLoggedIn() ?
                                        JSON.parse(User.getLocalStorage('user')).name.length > 15 ?
                                        JSON.parse(User.getLocalStorage('user')).name.substr(0, 15) + '...' : JSON.parse(User.getLocalStorage('user')).name
                                    :
                                        'ゲストユーザー'
                                    }
                                </span>
                            </IconButton>
                        </div>
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
                                    <MenuItem onClick={() => {User.logout();window.location.reload();}}>ログアウト</MenuItem>
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