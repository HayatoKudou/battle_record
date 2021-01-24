import React, { useState, useMemo } from 'react';
import { useForm } from "react-hook-form";

import Header from './parts/header';
import User from './auth/User';

import { Checkbox } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    selected_platform: {
        backgroundColor: 'black',
        borderRadius: 0,
    },
    error_message: {
        fontSize: 17,
        listStyle: 'none',
        marginLeft: 30,
        marginBottom: 15,
        width: '100% !important',
    },
    all: {
        marginTop: 15,
        padding: '15px 0 0 0 !important',
    }
}));

export default function BulletinBoard() {

    window.onload = function() {
        if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
            set_device('smartphone');
        } else {
            set_device('pc');
        }

        fetch('http://battle_record_api/api/apex_get_articles', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => {
            if (!response.ok) {
                set_error(response);
            } else {
                return response.json().then(data => {
                    if('errors' in data){
                        set_error(data.errors);
                    } else {
                        set_articles(data.articles);
                        set_filtered_articles(data.articles);
                    }
                });
            }
        }).catch(error => {
            console.error(error);
        })
    }

    var now_time = Date.now();
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();

    const [error, set_error] = useState('');
    const [device, set_device] = useState('pc');
    const [reply_id, set_reply_id] = useState('');
    const [reply_name, set_reply_name] = useState('');    
    const [selected_platform, set_selected_platform] = useState('all');
    const [post_tag, set_post_tag] = useState(''); //投稿用
    const [filter_tag, set_filter_tag] = useState([]); //絞り込み用
    const [post_platform, set_post_platform] = useState('');
    const [articles, set_articles] = useState([]);
    const [filtered_articles, set_filtered_articles] = useState([]);

    //検索条件
    const [filterQuery, setFilterQuery] = useState({});

    useMemo(() => {
        var tmpArticle = articles.filter(row => {
            //プラットフォームで絞り込み
            if (filterQuery.platform && row.platform !== filterQuery.platform){
                return false;
            }
            //タグで絞り込み
            if (filterQuery.tag){
                var skip = false
                // console.log(filter_tag);
                for (var i = 0; i < filter_tag.length; i++) {
                    if(filter_tag[i].checked){
                        if(row[filter_tag[i].value] !== 1){
                            skip = true;
                            break;
                        }
                    }
                }
                if(skip){
                    return false;
                }
            }
            return row;
        });
        set_filtered_articles(tmpArticle);
    }, [filterQuery]);

    //絞り込み
    function handleFilter(name, value, checked = null){
        if(name === 'platform'){
            set_selected_platform(value);
        } else if(name === 'tag'){
            var newArr = [...filter_tag];
            if(checked){
                if(filter_tag.length > 0){
                    for (var i = 0; i < filter_tag.length; i++) {
                        if(filter_tag[i]['value'] === value){
                            newArr[i]['checked'] = 0;
                            set_filter_tag(newArr);
                        } else {
                            set_filter_tag([ ...filter_tag, {value, checked: 1} ]);
                        }
                    }
                } else {
                    set_filter_tag([ ...filter_tag, {value, checked: 1} ]);
                }
            } else {
                for (var key = 0; key < filter_tag.length; key++) {
                    if(filter_tag[key]['value'] === value){
                        newArr[key]['checked'] = 0;
                        set_filter_tag(newArr);
                    }
                }
            }
        }
        setFilterQuery({ ...filterQuery, [name]: value });
    };

    //投稿
    function post(argument){
        var data = {
            reply_id: reply_id,
            player_id: User.isLoggedIn() ? JSON.parse(User.getLocalStorage('user')).id  : null,
            player_name: argument.player_name,
            platform: selected_platform,
            tag: post_tag,
            comment: argument.comment
        }
        fetch('http://battle_record_api/api/apex_post', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                set_error(response);
            } else {
                return response.json().then(data => {
                    if('errors' in data){
                        set_error(data.errors);
                    } else {
                        set_articles(data.articles);
                        set_filtered_articles(filtered_articles);
                    }
                });
            }
        }).catch(error => {
            console.error(error);
        })
    }

    function changeTag(e){
        var value = e.target.value;
        if ( post_tag.indexOf(value) !== -1) {
            value = post_tag.replace(','+value, '');
            set_post_tag(value);
        } else {
            set_post_tag(post_tag + ',' + value);
        }
    }

    function changePlatform(e){
        var value = e.target.value;
        if ( post_platform.indexOf(value) !== -1) {
            value = post_platform.replace(','+value, '');
            set_post_platform(value);
        } else {
            set_post_platform(post_platform + ',' + value);
        }
    }

    function replay(article_id, article_name){
        window.scrollTo(0, 0);
        set_reply_id(article_id);
        set_reply_name(article_name);
    }

    //0埋め
    function zeroPadding(num,length){
        return ('0000000000' + num).slice(-length);
    }

    return(
        <div>
            <Header />
            <div className="select_platform">
                <div className="select_platform_form select_platform_left_form">
                    <div className="select_platform_left_form">
                        <ul>
                            <li className={selected_platform === 'steam' ? classes.selected_platform : ''}
                                name="platform" value="steam"
                                onClick={() => handleFilter('platform', 'steam')}>
                                <IconButton><i className="fab fa-steam"></i></IconButton>
                            </li>
                            <li className={selected_platform === 'xbox' ? classes.selected_platform : ''}
                                onClick={() => handleFilter('platform', 'xbox')}>
                                <IconButton><i className="fab fa-xbox"></i></IconButton>
                            </li>
                            <li className={selected_platform === 'playstation' ? classes.selected_platform : ''}
                                onClick={() => handleFilter('platform', 'playstation')}>
                                <IconButton><i className="fab fa-playstation"></i></IconButton>
                            </li>
                            <li className={selected_platform === 'all' ? classes.selected_platform : ''}
                                onClick={() => handleFilter('platform', 'all')}>
                                <IconButton className={classes.all}><p>ALL</p></IconButton>
                            </li>
                        </ul>
                        {device === 'pc' && (
                        <div className="conditions">
                            <h4>絞り込み</h4>
                            <div>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_vc_yes', e.target.checked)} />
                                    <span>VC有り</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_vc_no', e.target.checked)} />
                                    <span>VC無し</span>
                                </label>
                            </div>
                            <div>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_cooperation', e.target.checked)} />
                                    <span>協力プレイ</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_friend', e.target.checked)} />
                                    <span>フレンド募集</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_clan', e.target.checked)} />
                                    <span>クラメン募集</span>
                                </label>
                            </div>

                            <div>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_rank', e.target.checked)} />
                                    <span>ランクマッチ</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_quick', e.target.checked)} />
                                    <span>クイックマッチ</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_event', e.target.checked)} />
                                    <span>イベントマッチ</span>
                                </label>
                            </div>

                            <div>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_enjoy', e.target.checked)} />
                                    <span>エンジョイ勢</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_seriously', e.target.checked)} />
                                    <span>ガチ勢</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_society', e.target.checked)} />
                                    <span>社会人</span>
                                </label>
                                <label className="bulletinBoard_checkBox_form">
                                    <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                        onClick={(e) => handleFilter('tag', 'tag_student', e.target.checked)} />
                                    <span>学生</span>
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
                            {error !== '' && (
                                <Typography color="error">
                                    {Object.keys(error).map(key => (
                                        <li key={key} className={classes.error_message}>{error[key]}</li>
                                    ))}
                                </Typography>
                            )}
                            <TextField className="player_name_input" variant="outlined" name="player_name" size="small"
                                error={errors.player_name ? true : false}
                                inputRef={register({ required: true })}
                                helperText={
                                    errors.player_name && <span className="error_message">名前を入力してください。</span>
                                }
                                label={'名前'}
                                defaultValue={User.isLoggedIn() ? JSON.parse(User.getLocalStorage('user')).name : 'ゲストユーザー'}
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
                                <br/>
                                <label>
                                    <input type="checkbox" value="steam" onClick={(e) => changePlatform(e)} />
                                    <span>steam</span>
                                </label>
                                <label>
                                    <input type="checkbox" value="xbox" onClick={(e) => changePlatform(e)} />
                                    <span>xbox</span>
                                </label>
                                <label>
                                    <input type="checkbox" value="playstation" onClick={(e) => changePlatform(e)} />
                                    <span>playstation</span>
                                </label>
                            </div>
                            {reply_id !== '' &&
                                <div className="reply_id">
                                    <Typography>
                                        {'[返信 to=' + zeroPadding(reply_id,5) + '] ' + reply_name + 'さん'}
                                        <i onClick={() => set_reply_id('')} className="far fa-times-circle"></i>
                                    </Typography>                                 
                                </div>                                
                            }
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

                        {Object.keys(filtered_articles).map(key => (
                            <div className="flame10" key={key}>
                                {(filtered_articles[key].reply_id !== null && filtered_articles[key].reply_id !== '' ) &&
                                    <p className="replay_id">{'>>> ' + filtered_articles[key].reply_id}</p>
                                }
                                <div className="top_form">
                                    <h5>{zeroPadding(filtered_articles[key].id,5) + '　' +filtered_articles[key].user_name}</h5>
                                    <span>{filtered_articles[key].created_at}</span>
                                </div>
                                <span>{filtered_articles[key].comment}</span>
                                <div className="bottom_form">
                                    <Button onClick={() => replay(filtered_articles[key].id, filtered_articles[key].user_name)} variant="contained">返信</Button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}