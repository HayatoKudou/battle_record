import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import Header from './header';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

export default function UserSearch() {

    const [selected_platform, set_selected_platform] = useState('playstation');
    const [playerName, set_playerName] = useState('');
    const [result_data, set_result_data] = useState('');
    const [error_data, set_error_data] = useState('');

    const { register, handleSubmit, watch, errors } = useForm();

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

    //ユーザー検索
    function searchApexPlayer(argument){
        var data = {
            playerName: argument.player_name,
        }
        fetch('http://battle_record_api/api/searchApexPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if(data === 404){
                set_error_data('ユーザーが見つかりませんでした。');
            } else {
                set_error_data('');
                set_result_data(data);
            }
        }
        )
        .catch(error => set_error_data(error))
    }

    return(
        <div>
            <Header />

            <div className="select_platform">
                <div className="select_platform_form">
                    <ul>
                        <li className={selected_platform === 'steam' ? classes.selected_platform : ''}
                            onClick={() => set_selected_platform('steam')}
                        >
                            <IconButton><i className="fab fa-steam"></i></IconButton>
                        </li>
                        <li className={selected_platform === 'xbox' ? classes.selected_platform : ''}
                            onClick={() => set_selected_platform('xbox')}
                        >
                            <IconButton><i className="fab fa-xbox"></i></IconButton>
                        </li>
                        <li className={selected_platform === 'playstation' ? classes.selected_platform : ''}
                            onClick={() => set_selected_platform('playstation')}
                        >
                            <IconButton><i className="fab fa-playstation"></i></IconButton>
                        </li>
                    </ul>
                    <form onSubmit={handleSubmit(searchApexPlayer)} className="player_name_form">
                        <TextField className="player_name_input" variant="outlined" name="player_name"
                            error={errors.player_name ? true : false}
                            inputRef={register({ required: true })}
                            helperText={
                                error_data != '' ? <span>{error_data}</span> :
                                errors.player_name && <span>プレイヤーIDを入力してください。</span>
                            }
                            label={
                                selected_platform === 'playstation' ? 'playstation Network player Name' :
                                selected_platform === 'xbox' ? 'Xbox Live player Name' : 'player Name'
                            }
                        />
                    </form>
                </div>
            </div>

            <div>
                {result_data !== '' &&
                    <div>
                        <div className="userinfp">
                            <div className="user_avatar_info row">
                                <img className="user_avatar_image" src={result_data.data.platformInfo.avatarUrl} alt="avatarUrl" />
                                {result_data.data.platformInfo.platformSlug === 'battlenet' &&
                                    <i className={'fab fa-steam'}></i>}
                                {result_data.data.platformInfo.platformSlug === 'xbl' &&
                                    <i className={'fab fa-xbox'}></i>}
                                {result_data.data.platformInfo.platformSlug === 'psn' &&
                                    <i className={'fab fa-playstation'}></i>}
                                <span>{result_data.data.platformInfo.platformUserId}</span>
                            </div>

                            <div className="user_apex_data row">
                                <span>{'Level: ' + result_data.data.segments[0].stats.level.displayValue}</span>
                                <span>{'Kills: ' + result_data.data.segments[0].stats.kills.displayValue}</span>
                                <span>{'Damage: ' + result_data.data.segments[0].stats.damage.displayValue}</span>
                                <span>{'RankScore: ' + result_data.data.segments[0].stats.rankScore.displayValue}</span>
                            </div>

                            <div>
                                {/* {Object.keys(result_data.data.segments).map(key => (
                                    <div key={key}>
                                        <img src={result_data.data.segments[key].metadata.imageUrl} alt="imageUrl"/>
                                        <h2>{result_data.data.segments[key].metadata.name}</h2>
                                        <h2>{result_data.data.segments[key].stats.kills.displayValue}</h2>
                                    </div>
                                ))} */}
                            </div>

                        </div>
                    </div>
                }
            </div>

        </div>
    )
}