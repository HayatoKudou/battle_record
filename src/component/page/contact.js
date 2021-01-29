import React, { useState, useMemo } from 'react';
import { useForm } from "react-hook-form";
import Header from '../parts/header';
import { makeStyles } from '@material-ui/core/styles';
import { serverUrl } from '../../common';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    aleart: {
        marginTop: '20px',
    },
    form: {
        width: '80%',
        margin: '0 auto',
    },
    form_input: {
        width: '100%',
        margin: '20px 0 0 0',
    },
    post_button: {
        width: '100%',
        margin: '20px 0 0 0',
    },
    error_message: {
        fontSize: 17,
        listStyle: 'none',
        marginLeft: 30,
        marginBottom: 15,
        width: '100% !important',
    },
}));

export default function Contact(){

    const { register, handleSubmit, errors, reset } = useForm();
    const classes = useStyles();
    const [error, set_error] = useState('');
    const [success_aleart, set_success_aleart] = useState('');

    function post(data){
        if(window.confirm("送信しますか?")){
            fetch(serverUrl + '/api/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    set_error(response);
                } else {
                    return response.json().then(data => {
                        console.log(data);
                        if('errors' in data){
                            set_error(data.errors);
                            set_success_aleart('');
                        } else {
                            set_error('');
                            set_success_aleart(data.message);
                        }
                    });
                }
            }).catch(error => {
                set_error(error);
            })
        }
    }

    return(
        <div>
            <Header />
            <form onSubmit={handleSubmit(post)} className={classes.form}>

                {success_aleart !== '' && (
    				<Typography component="h1" variant="h5" className={classes.aleart}>
                        <Alert severity="success">{success_aleart}</Alert>                
                    </Typography>
                )}
                {error !== '' && (
                    <Typography color="error" component="h1" variant="h5" className={classes.aleart}>
                        {Object.keys(error).map(key => (
                            <Alert key={key} severity="error">{error[key]}</Alert>
                        ))}
                    </Typography>
                )}

                <TextField variant="outlined" name="email" size="small" className={classes.form_input}
                    error={errors.email ? true : false}
                    inputRef={register({ pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}/ })}
                    helperText={
                        errors.email && <span className="error_message">メールアドレスの形式が正しくありません。</span>
                    }
                    label={'メールアドレス(任意)'}
                />
                <TextField variant="outlined" name="contents" multiline rows={3} className={classes.form_input}
                    error={errors.contents ? true : false}
                    inputRef={register({ required: true })}
                    helperText={
                        errors.contents && <span className="error_message">お問い合わせ内容を入力してください。</span>
                    }
                    label={'お問い合わせ内容'}
                />

                <Button onClick={handleSubmit(post)} className={classes.post_button} variant="contained" color="primary">
                    送信する
                </Button>
            </form>
        </div>
    )
}