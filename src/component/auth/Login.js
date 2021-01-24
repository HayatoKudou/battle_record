import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import User from './User';

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login() {

    const history = useHistory();
	const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const [error, set_error] = useState('');

    function setLogin(argument) {
        var data = {
            email: argument.email,
            password: argument.password,
        }
        fetch('http://battle_record_api/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                set_error('ユーザーが見つかりません');
            } else {
                return response.json().then(userInfo => {
                    if('errors' in userInfo){
                        set_error(userInfo.errors);
                    } else {
                        User.set('api_token', userInfo.token);
                        User.setArr('user', userInfo.user);
                        User.login();
                        history.push('/');
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
				<Typography component="h1" variant="h5">ログイン画面</Typography>
                {error !== '' && (
                    <Typography color="error">{error}</Typography>
                )}
				<form onSubmit={handleSubmit(setLogin)} className="player_name_form">
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="メールアドレス"
						name="email"
						autoComplete="email"
						autoFocus
						error={errors.email || error !== '' ? true : false}
						inputRef={register({ required: true })}
						helperText={
							errors.email && <span>メールアドレスを入力してください。</span>
						}
					/>
					<TextField
						variant="outlined"
						margin="normal"
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
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="パスワードを保存する"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>ログイン
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								パスワードを忘れた場合
							</Link>
						</Grid>
						<Grid item>
							<Link href="/register" variant="body2">
								アカウントを作成する
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}