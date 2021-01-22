import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import Header from './parts/header';
import Platform from './parts/platform';
import User from './auth/User';

// import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
// import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

export default function BulletinBoard() {

    const [tag, setTag] = useState('');
    const [device, set_device] = useState('pc');

    const { register, handleSubmit, errors } = useForm();

    window.onload = function() {
        if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
            set_device('smartphone');
        } else {
            set_device('pc');
        }
    }

    function write(argument){
        var data = {
            playerName: argument.player_name,
            comment: argument.comment,
        }
        console.log(data);
    }

    function changeTag(e){
        var value = e.target.outerText;
        if ( tag.indexOf(value) !== -1) {
            value = tag.replace(','+value, '');
            setTag(value);
        } else {
            setTag(tag + ',' + value);
        }
    }

    return(
        <div>
            {console.log(User.get('id'))}
            <Header />
            <div className="select_platform">
                <div className="select_platform_form select_platform_left_form">
                    <div className="select_platform_left_form">
                        <Platform />
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
                            <div className="tag_form">
                                <Button className={tag.indexOf('VC有り') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>VC有り</Button>
                                <Button className={tag.indexOf('VC無し') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>VC無し</Button>
                                <Button className={tag.indexOf('協力プレイ') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>協力プレイ</Button>
                                <Button className={tag.indexOf('フレンド募集') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>フレンド募集</Button>
                                <Button className={tag.indexOf('クラメン募集') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>クラメン募集</Button>
                                <Button className={tag.indexOf('ランクマッチ') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>ランクマッチ</Button>
                                <Button className={tag.indexOf('クイックマッチ') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>クイックマッチ</Button>
                                <Button className={tag.indexOf('イベントマッチ') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>イベントマッチ</Button>
                                <Button className={tag.indexOf('エンジョイ勢') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>エンジョイ勢</Button>
                                <Button className={tag.indexOf('ガチ勢') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>ガチ勢</Button>
                                <Button className={tag.indexOf('社会人') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>社会人</Button>
                                <Button className={tag.indexOf('学生') !== -1 ? "tag_checked" : ''} variant="outlined" size="small" color="primary" onClick={(e) => changeTag(e)}>学生</Button>
                            </div>
                            <TextField className="coment_input" variant="outlined" name="comment" multiline rows={device === 'pc' ? 4 : 2}
                                error={errors.comment ? true : false}
                                inputRef={register({ required: true })}
                                helperText={
                                    errors.comment && <span>コメントを入力してください。</span>
                                }
                                label={'コメント'}
                            />
                            <Button className="post" variant="contained">投稿する</Button>
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