import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import Header from './parts/header';

import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

export default function BulletinBoard() {

    const [selected_platform, set_selected_platform] = useState('playstation');
    const [error_data, set_error_data] = useState('');

    const { register, handleSubmit, errors } = useForm();

    const useStyles = makeStyles((theme) => ({
        selected_platform: {
            backgroundColor: 'black',
            borderRadius: 0,
        },
        margin: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    function write(argument){
        var data = {
            playerName: argument.player_name,
            comment: argument.comment,
        }
        console.log(data);
    }

    return(
        <div>
            <Header />

            <div className="select_platform">
                <div className="select_platform_form">
                    <div className="select_platform_left_form">                        
                        <ul>
                            <li className={selected_platform === 'steam' ? classes.selected_platform : ''}
                                onClick={() => set_selected_platform('steam')}
                            >
                                <IconButton>
                                    <i className="fab fa-steam"></i>
                                </IconButton>
                            </li>
                            <li className={selected_platform === 'xbox' ? classes.selected_platform : ''}
                                onClick={() => set_selected_platform('xbox')}
                            >
                                <IconButton>
                                    <i className="fab fa-xbox"></i>
                                </IconButton>
                            </li>
                            <li className={selected_platform === 'playstation' ? classes.selected_platform : ''}
                                onClick={() => set_selected_platform('playstation')}
                            >
                                <IconButton>
                                    <i className="fab fa-playstation"></i>
                                </IconButton>
                            </li>
                        </ul>
                        <div className="conditions">
                            <h4>絞り込み</h4>
                            <div>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>協力プレイ</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>フレンド募集</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>クラメン募集</span>
                                </label>
                            </div>

                            <div>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>ランクマッチ</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>クイックマッチ</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>イベントマッチ</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>その他</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(write)} className="player_name_form">
                        <TextField className="player_name_input" variant="outlined" name="player_name" size="small"
                            error={errors.player_name ? true : false}
                            inputRef={register({ required: true })}
                            helperText={
                                errors.player_name && <span>名前を入力してください。</span>
                            }
                            label={'名前'}
                            defaultValue="ゲストユーザー"
                        />
                        <TextField className="coment_input" variant="outlined" name="comment" rows={4}
                            error={errors.comment ? true : false}
                            inputRef={register({ required: true })}
                            helperText={
                                errors.comment && <span>コメントを入力してください。</span>
                            }
                            label={'コメント'}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}