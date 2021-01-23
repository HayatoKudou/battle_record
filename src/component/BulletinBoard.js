import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import Header from './parts/header';
import User from './auth/User';

import { Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    selected_platform: {
        backgroundColor: 'black',
        borderRadius: 0,
    },
}));

export default function BulletinBoard() {

    const classes = useStyles();
    const [tag, setTag] = useState('');
    const [device, set_device] = useState('pc');
    const [selected_platform, set_selected_platform] = useState('all');
    const { register, handleSubmit, errors } = useForm();

    window.onload = function() {
        if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
            set_device('smartphone');
        } else {
            set_device('pc');
        }
    }

    function post(argument){
        var data = {
            playerName: argument.player_name,
            tag: tag,
            comment: argument.comment,
        }
        console.log(data);
    }

    function changeTag(e){
        var value = e.target.value;
        if ( tag.indexOf(value) !== -1) {
            value = tag.replace(','+value, '');
            setTag(value);
        } else {
            setTag(tag + ',' + value);
        }
    }

    return(
        <div>
            {console.log(tag)}
            <Header />
            <div className="select_platform">
                <div className="select_platform_form select_platform_left_form">
                    <div className="select_platform_left_form">
                        <ul>
                            <li className={selected_platform === 'steam' ? classes.selected_platform : ''}
                                onClick={() => {set_selected_platform('steam')}}>
                                <IconButton><i className="fab fa-steam"></i></IconButton>
                            </li>
                            <li className={selected_platform === 'xbox' ? classes.selected_platform : ''}
                                onClick={() => {set_selected_platform('xbox')}}>
                                <IconButton><i className="fab fa-xbox"></i></IconButton>
                            </li>
                            <li className={selected_platform === 'playstation' ? classes.selected_platform : ''}
                                onClick={() => {set_selected_platform('playstation')}}>
                                <IconButton><i className="fab fa-playstation"></i></IconButton>
                            </li>
                            <li className={selected_platform === 'all' ? classes.selected_platform : ''}
                                onClick={() => {set_selected_platform('all')}}>
                                <IconButton><p>ALL</p></IconButton>
                            </li>
                        </ul>
                        {device === 'pc' && (
                        <div className="conditions">
                            <h4>絞り込み</h4>
                            <div>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>VC有り</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>VC無し</span>
                                </label>
                            </div>
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
                            </div>

                            <div>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>エンジョイ勢</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>ガチ勢</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>社会人</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>学生</span>
                                </label>
                            </div>

                            <div>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small" />
                                    <span>その他</span>
                                </label>
                            </div>

                            <div>
                                <h5>ログインユーザー限定</h5>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        disabled={User.isLoggedIn() ? true : false} />
                                    <span>ランクの近い人</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        disabled={User.isLoggedIn() ? true : false} />
                                    <span>レベルの近い人</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        disabled={User.isLoggedIn() ? true : false} />
                                    <span>キルレートの近い人</span>
                                </label>
                            </div>
                        </div>
                        )}
                    </div>

                    <div  className="select_platform_center_form">
                        <form onSubmit={handleSubmit(post)} className="player_name_form">
                            <TextField className="player_name_input" variant="outlined" name="player_name" size="small"
                                error={errors.player_name ? true : false}
                                inputRef={register({ required: true })}
                                helperText={
                                    errors.player_name && <span className="error_message">名前を入力してください。</span>
                                }
                                label={'名前'}
                                defaultValue="ゲストユーザー"
                            />
                            <div className="tag_form">
                                <label><input type="checkbox" value="VC有り" onClick={(e) => changeTag(e)} /><span>VC有り</span></label>
                                <label><input type="checkbox" value="VC無し" onClick={(e) => changeTag(e)} /><span>VC無し</span></label>
                                <label><input type="checkbox" value="協力プレイ" onClick={(e) => changeTag(e)} /><span>協力プレイ</span></label>
                                <label><input type="checkbox" value="フレンド募集" onClick={(e) => changeTag(e)} /><span>フレンド募集</span></label>
                                <label><input type="checkbox" value="クラメン募集" onClick={(e) => changeTag(e)} /><span>クラメン募集</span></label>
                                <label><input type="checkbox" value="ランクマッチ" onClick={(e) => changeTag(e)} /><span>ランクマッチ</span></label>
                                <label><input type="checkbox" value="クイックマッチ" onClick={(e) => changeTag(e)} /><span>クイックマッチ</span></label>
                                <label><input type="checkbox" value="イベントマッチ" onClick={(e) => changeTag(e)} /><span>イベントマッチ</span></label>
                                <label><input type="checkbox" value="エンジョイ勢" onClick={(e) => changeTag(e)} /><span>エンジョイ勢</span></label>
                                <label><input type="checkbox" value="ガチ勢" onClick={(e) => changeTag(e)} /><span>ガチ勢</span></label>
                                <label><input type="checkbox" value="社会人" onClick={(e) => changeTag(e)} /><span>社会人</span></label>
                                <label><input type="checkbox" value="学生" onClick={(e) => changeTag(e)} /><span>学生</span></label>
                            </div>
                            <TextField className="coment_input" variant="outlined" name="comment" multiline rows={device === 'pc' ? 3 : 2}
                                error={errors.comment ? true : false}
                                inputRef={register({ required: true })}
                                helperText={
                                    errors.comment && <span className="error_message">コメントを入力してください。</span>
                                }
                                label={'コメント'}
                            />
                            <Button onClick={handleSubmit(post)} className="post" variant="contained">投稿する</Button>
                        </form>

                        <div className="flame10">
                            <div className="top_form">
                                <h5>ゲストユーザー</h5>
                                <span>10分前</span>
                            </div>
                            <span>ここに文章ここに文章ここに文章ここに文章</span>
                            <div className="bottom_form">
                                <Button variant="contained">返信</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}