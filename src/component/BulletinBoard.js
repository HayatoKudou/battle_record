import React, { useState, useMemo } from 'react';
import { useForm } from "react-hook-form";
import {　useLocation　} from 'react-router-dom';

import Header from './parts/header';
import User from './auth/User';
import {serverUrl, dateFormat, diffDate, zeroPadding} from '../common';

import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TwitterIcon from '@material-ui/icons/Twitter';

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
        // padding: '15px 0 0 0 !important',
        width: '100%',
        height: '91%',
    },
    block: {
        display: 'block',
    },
    none: {
        display: 'none',
    }
}));


export default function BulletinBoard() {

    let location = useLocation();

    window.onload = function() {
        var data = {
            user_id: localStorage.getItem("user") !== null ? JSON.parse(User.getLocalStorage('user')).id : null,
        }
        fetch(serverUrl + '/api/apex_get_articles', {
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
                        set_filtered_articles(data.articles);
                    }
                });
            }
        }).catch(error => {
            set_error(error);
        })
    }

    const classes = useStyles();
    const { register, handleSubmit, errors, reset } = useForm();

    const [error, set_error] = useState('');
    const [reply_id, set_reply_id] = useState('');
    const [reply_name, set_reply_name] = useState('');
    const [selected_platform, set_selected_platform] = useState('all'); //絞り込み用
    const [post_tag, set_post_tag] = useState(''); //投稿用
    const [filter_tag, set_filter_tag] = useState([]); //絞り込み用
    const [keyword, set_keyword] = useState([]); //絞り込み用
    const [post_platform, set_post_platform] = useState(''); //投稿用
    const [articles, set_articles] = useState(typeof location.state !== 'undefined' ? location.state.articles : []); //絞り込み前
    const [filtered_articles, set_filtered_articles] = useState([]); //絞り込み後
    const [detail_display, set_detail_display] = useState(false); //絞り込み後

    function filter(data = null){
        var from_data = data ? data : articles;
        var filterd_data = from_data.filter(row => {
            //プラットフォームで絞り込み
            if (filterQuery.platform){
                if(filterQuery.platform === 'pc' && !row.platform_pc){
                    return false;
                } else if(filterQuery.platform === 'xbox' && !row.platform_xbox){
                    return false;
                } else if(filterQuery.platform === 'playstation' && !row.platform_playstation){
                    return false;
                }
            }
            //タグで絞り込み
            if (filterQuery.tag){
                var skip = false
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
            //キーワードで絞り込み
            if(filterQuery.keyword){
                if ( !row.comment.includes(keyword) && !row.user_name.includes(keyword) ) {
                    return false;
                }
            }
            //IDで絞り込み
            if(filterQuery.reply){
                if(filterQuery.reply !== row.reply_id && filterQuery.reply !== row.id){
                    return false;
                }
            }
            return row;
        });
        return filterd_data;
    }

    //検索条件
    const [filterQuery, setFilterQuery] = useState({});

    useMemo(() => {
        var tmpArticle = filter();
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
        if(window.confirm("投稿しますか?")){
            var data = {
                reply_id: reply_id,
                player_id: User.isLoggedIn() ? JSON.parse(User.getLocalStorage('user')).id  : localStorage.getItem("user") === null ? null : JSON.parse(User.getLocalStorage('user')).id,
                player_name: argument.player_name,
                platform: post_platform,
                tag: post_tag,
                comment: argument.comment
            }
            fetch(serverUrl + '/api/apex_post', {
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
                            var tmpArticle = filter(data.articles);
                            set_filtered_articles(tmpArticle);
                            reset({ comment: "" });
                            set_reply_id('');
                            set_reply_name('');
                            //ゲストユーザーのローカル保存
                            if('guest_user' in data){
                                User.setArr('user', data.guest_user);
                            }
                        }
                    });
                }
            }).catch(error => {
                set_error(error);
            })
        }
    }

    //記事削除
    function deleteArticle(article_id){
        if(window.confirm("削除しますか?")){
            var data = {
                article_id: article_id,
                user_id:  JSON.parse(User.getLocalStorage('user')).id,
            }
            fetch(serverUrl + '/api/apex_delete_article', {
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
                            var tmpArticle = filter(data.articles);
                            set_filtered_articles(tmpArticle);
                        }
                    });
                }
            }).catch(error => {
                set_error(error);
            })
        }
    }

    //twitter投稿
    function sendTwitter(comment){
        var url = document.location.href;
        
        if (comment != "") {
            if (comment.length > 140) {
                //文字数制限
                alert("テキストが140字を超えています");
            } else {
                //投稿画面を開く
                url = "http://twitter.com/share?url=" + escape(url) + "?text=" + comment;
                window.open(url,"_blank","width=600,height=300");
            }
        }
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

    //返信
    function reply(article_id, article_name){
        window.scrollTo(0, 0);
        set_reply_id(article_id);
        set_reply_name(article_name);
    }

    return(
        <div>
            <Header />
            <div className="select_platform">
                <div className="select_platform_form select_platform_left_form">
                    <div className="select_platform_left_form">
                        <ul>
                            <li className={selected_platform === 'pc' ? classes.selected_platform : ''}
                                name="platform" value="pc"
                                onClick={() => handleFilter('platform', 'pc')}>
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
                        {/* {User.get('device') === 'pc' && ( */}
                        <div className="conditions">
                            <h4>絞り込み</h4>
                            {User.get('device') !== 'pc' && (
                                <IconButton className="display_icon" onClick={() => set_detail_display(detail_display ? false : true)}>
                                    {detail_display ? (<i className="fas fa-angle-down"></i>) : (<i className="fas fa-angle-up"></i>)}
                                </IconButton>
                            )}
                            <div className={!detail_display && User.get('device') !== 'pc' ? classes.none : classes.block}>
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
                                    <div className="keyword_search_form">
                                        <input type="search" placeholder="キーワード検索" onChange={(e) => set_keyword(e.target.value)} />
                                        <button onClick={() => handleFilter('keyword', keyword)}>検索</button>
                                    </div>
                                </div>

                                {/* <div>
                                    <h5>ログインユーザー限定</h5>
                                    <label className="bulletinBoard_checkBox_form">
                                        <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                            disabled={User.isLoggedIn() ? false : true} />
                                        <span>ランクの近い人</span>
                                    </label>
                                    <label className="bulletinBoard_checkBox_form">
                                        <Checkbox className="bulletinBoard_checkBox" color="primary"　size="small"
                                            disabled={User.isLoggedIn() ? false : true} />
                                        <span>レベルの近い人</span>
                                    </label>
                                </div> */}
                            </div>
                        </div>
                        {/* )} */}
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
                                <label>
                                    <input type="checkbox" value="pc" onClick={(e) => changePlatform(e)} />
                                    <span className="platform">pc</span>
                                </label>
                                <label>
                                    <input type="checkbox" value="xbox" onClick={(e) => changePlatform(e)} />
                                    <span className="platform">xbox</span>
                                </label>
                                <label>
                                    <input type="checkbox" value="playstation" onClick={(e) => changePlatform(e)} />
                                    <span className="platform">playstation</span>
                                </label>
                                <br/>
                                <label><input type="checkbox" value="tag_vc_yes" onClick={(e) => changeTag(e)} /><span>VC有り</span></label>
                                <label><input type="checkbox" value="tag_vc_no" onClick={(e) => changeTag(e)} /><span>VC無し</span></label>
                                <label><input type="checkbox" value="tag_cooperation" onClick={(e) => changeTag(e)} /><span>協力プレイ</span></label>
                                <label><input type="checkbox" value="tag_friend" onClick={(e) => changeTag(e)} /><span>フレンド募集</span></label>
                                <label><input type="checkbox" value="tag_clan" onClick={(e) => changeTag(e)} /><span>クラメン募集</span></label>
                                <label><input type="checkbox" value="tag_rank" onClick={(e) => changeTag(e)} /><span>ランクマッチ</span></label>
                                <label><input type="checkbox" value="tag_quick" onClick={(e) => changeTag(e)} /><span>クイックマッチ</span></label>
                                <label><input type="checkbox" value="tag_event" onClick={(e) => changeTag(e)} /><span>イベントマッチ</span></label>
                                <label><input type="checkbox" value="tag_enjoy" onClick={(e) => changeTag(e)} /><span>エンジョイ勢</span></label>
                                <label><input type="checkbox" value="tag_seriously" onClick={(e) => changeTag(e)} /><span>ガチ勢</span></label>
                                <label><input type="checkbox" value="tag_society" onClick={(e) => changeTag(e)} /><span>社会人</span></label>
                                <label><input type="checkbox" value="tag_student" onClick={(e) => changeTag(e)} /><span>学生</span></label>
                            </div>
                            {reply_id !== '' &&
                                <div className="reply_id">
                                    <Typography color="error">
                                        {'[返信 to=' + zeroPadding(reply_id,5) + '] ' + reply_name + 'さん'}
                                        <i onClick={() => set_reply_id('')} className="far fa-times-circle"></i>
                                    </Typography>
                                </div>
                            }
                            <TextField className="coment_input" variant="outlined" name="comment" multiline rows={User.get('device') === 'pc' ? 3 : 2}
                                error={errors.comment ? true : false}
                                inputRef={register({ required: true })}
                                helperText={
                                    errors.comment && <span className="error_message">コメントを入力してください。</span>
                                }
                                label={'コメント'}
                            />
                            <Button onClick={handleSubmit(post)} className="post" variant="contained" color="primary">投稿する</Button>
                            <div className="clear_condition">
                                <Button className="clear_condition_button" variant="contained" onClick={() => setFilterQuery('')} >絞り込みを解除</Button>
                            </div>                            
                        </form>

                        {Object.keys(filtered_articles).map(key => {
                            return (
                                <div className="article_flame" key={key}>
                                    {(filtered_articles[key].reply_id !== null && filtered_articles[key].reply_id !== '' ) &&
                                        <p className="article_reply">{'>>> ' + zeroPadding(filtered_articles[key].reply_id,5)}</p>
                                    }
                                    <div className="top_form">
                                        <h5>{zeroPadding(filtered_articles[key].id,5) + ': ' +filtered_articles[key].user_name}</h5>
                                        {filtered_articles[key].platform_all ? (<p className="all_icon">ALL</p>) :
                                        filtered_articles[key].platform_pc ? (<i className="fab fa-steam"></i>) :
                                        filtered_articles[key].platform_xbox ? (<i className="fab fa-xbox"></i>) :
                                        filtered_articles[key].platform_playstation ? (<i className="fab fa-playstation"></i>) : ''}
                                        <span>{diffDate(filtered_articles[key].created_at)}</span>
                                    </div>
                                    <p className="comment">{filtered_articles[key].comment}</p>

                                    {(filtered_articles[key].tag_vc_yes || filtered_articles[key].tag_vc_no || filtered_articles[key].tag_cooperation || 
                                    filtered_articles[key].tag_friend || filtered_articles[key].tag_clan || filtered_articles[key].tag_rank || filtered_articles[key].tag_quick ||
                                    filtered_articles[key].tag_event || filtered_articles[key].tag_enjoy || filtered_articles[key].tag_seriously || filtered_articles[key].tag_society ||
                                    filtered_articles[key].tag_student) ? (
                                        <div className="bottom_form">
                                            <div className="tag_boxs">
                                                {filtered_articles[key].tag_vc_yes ? (<div className="tag_box"><p>#VC有り</p></div>) : ''}
                                                {filtered_articles[key].tag_vc_no ? (<div className="tag_box"><p>#VC無し</p></div>) : ''}
                                                {filtered_articles[key].tag_cooperation ? (<div className="tag_box"><p>#VC協力プレイ</p></div>) : ''}
                                                {filtered_articles[key].tag_friend ? (<div className="tag_box"><p>#フレンド募集</p></div>) : ''}
                                                {filtered_articles[key].tag_clan ? (<div className="tag_box"><p>#クラメン募集</p></div>) : ''}
                                                {filtered_articles[key].tag_rank ? (<div className="tag_box"><p>#ランクマッチ</p></div>) : ''}
                                                {filtered_articles[key].tag_quick ? (<div className="tag_box"><p>#クイックマッチ</p></div>) : ''}
                                                {filtered_articles[key].tag_event ? (<div className="tag_box"><p>#イベントマッチ</p></div>) : ''}
                                                {filtered_articles[key].tag_enjoy ? (<div className="tag_box"><p>#エンジョイ勢</p></div>) : ''}
                                                {filtered_articles[key].tag_seriously ? (<div className="tag_box"><p>#ガチ勢</p></div>) : ''}
                                                {filtered_articles[key].tag_society ? (<div className="tag_box"><p>#社会人</p></div>) : ''}
                                                {filtered_articles[key].tag_student ? (<div className="tag_box"><p>#学生</p></div>) : ''}
                                            </div>
                                        </div>
                                        
                                    ) : ''}

                                    <div className="action_form">
                                        {localStorage.getItem("user") !== null &&
                                        (JSON.parse(User.getLocalStorage('user')).id === filtered_articles[key].user_id) && (
                                            <div className="action_icon_form">
                                                <TwitterIcon className="delete_icon" onClick={() => sendTwitter(filtered_articles[key].comment)} />
                                                <DeleteForeverIcon className="delete_icon" onClick={() => deleteArticle(filtered_articles[key].id)} />
                                            </div>
                                        )}
                                        {filtered_articles[key].reply_count !== 0 &&
                                            (<Button onClick={() => handleFilter('reply', filtered_articles[key].id)} variant="contained" color="secondary">{filtered_articles[key].reply_count + '件返信があります'}</Button>)
                                        }
                                        <Button onClick={() => reply(filtered_articles[key].id, filtered_articles[key].user_name)} variant="contained" color="primary">返信</Button>
                                    </div>

                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}