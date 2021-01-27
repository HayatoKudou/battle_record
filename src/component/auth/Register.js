import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import {serverUrl} from '../../common';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import User from './User';
import '../../register.css';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    selected_platform: {
        backgroundColor: 'black',
        borderRadius: 0,
    },
}));

export default function Register() {

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const [selected_platform, set_selected_platform] = useState('all');
    const [error, set_error] = useState('');
    const classes = useStyles();

    function sendRegister(argument){
        var data = {
            platform: selected_platform,
            player_id: argument.player_id,
            email: argument.email,
            password: argument.password,
        }
        fetch(serverUrl + '/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                set_error(response);
            } else {                
                return response.json().then(userInfo => {
                    if('errors' in userInfo){
                        set_error(userInfo.errors);
                    } else {
                        User.setArr('user', userInfo.user);
                        User.login();
                        history.push('/', {articles: userInfo.articles});
                    }
                });
            }
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">アカウント作成</Typography>
                {error !== '' && (
                    <Typography color="error">
                        {Object.keys(error).map(key => (
                            <li key={key}>{error[key]}</li>
                        ))}
                    </Typography>
                )}
                <form onSubmit={handleSubmit(sendRegister)} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <div className="select_platform_register">
                            <ul>
                                <li className={selected_platform === 'origin' ? classes.selected_platform : ''}
                                    onClick={() => {set_selected_platform('origin')}}>
                                    <IconButton><i className="fab fa-steam"></i></IconButton>
                                </li>
                                <li className={selected_platform === 'xbl' ? classes.selected_platform : ''}
                                    onClick={() => {set_selected_platform('xbl')}}>
                                    <IconButton><i className="fab fa-xbox"></i></IconButton>
                                </li>
                                <li className={selected_platform === 'psn' ? classes.selected_platform : ''}
                                    onClick={() => {set_selected_platform('psn')}}>
                                    <IconButton><i className="fab fa-playstation"></i></IconButton>
                                </li>
                                <li className={selected_platform === 'all' ? classes.selected_platform : ''}
                                    onClick={() => {set_selected_platform('all')}}>
                                    <IconButton><p>ALL</p></IconButton>
                                </li>
                            </ul>
                        </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="player_id"
                                variant="outlined"
                                required
                                fullWidth
                                id="PSN ID"
                                label={
                                    selected_platform === 'origin' ? 'origin ID' :
                                    selected_platform === 'xbl' ? 'xbox ID' :
                                    selected_platform === 'psn' ? 'PSN ID' : 'ニックネーム'
                                }
                                autoFocus
                                error={errors.player || error !== '' ? true : false}
                                inputRef={register({ required: true })}
                                helperText={
                                    errors.email && (
                                        <span>
                                            {selected_platform === 'origin' ? 'origin ID' :
                                            selected_platform === 'xbl' ? 'xbox ID' :
                                            selected_platform === 'psn' ? 'PSN ID' : 'ニックネーム'}
                                        </span>
                                    )
                                }
                               />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="メールアドレス"
                                name="email"
                                autoComplete="email"
                                error={errors.email || error !== '' ? true : false}
                                inputRef={register({ required: true })}
                                helperText={
                                    errors.email && <span>メールアドレスを入力してください。</span>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="パスワード"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={errors.password || error !== '' ? true : false}
                                inputRef={register({ required: true })}
                                helperText={
                                    errors.password && <span>メールアドレスを入力してください。</span>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        アカウントを作成
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                アカウントをお持ちの場合
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}