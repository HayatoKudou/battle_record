import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import User from '../auth/User';

export default function Platform() {

    const [selected_platform, set_selected_platform] = useState('all');

    const useStyles = makeStyles((theme) => ({
        selected_platform: {
            backgroundColor: 'black',
            borderRadius: 0,
        },
    }));
    const classes = useStyles();

    return(
        <ul>
            <li className={selected_platform === 'steam' ? classes.selected_platform : ''}
                onClick={() => {set_selected_platform('steam');User.set('platform', 'steam')}}
            >
                <IconButton>
                    <i className="fab fa-steam"></i>
                </IconButton>
            </li>
            <li className={selected_platform === 'xbox' ? classes.selected_platform : ''}
                onClick={() => {set_selected_platform('xbox');User.set('platform', 'xbox')}}
            >
                <IconButton>
                    <i className="fab fa-xbox"></i>
                </IconButton>
            </li>
            <li className={selected_platform === 'playstation' ? classes.selected_platform : ''}
                onClick={() => {set_selected_platform('playstation');User.set('platform', 'playstation')}}
            >
                <IconButton>
                    <i className="fab fa-playstation"></i>
                </IconButton>
            </li>
            <li className={selected_platform === 'all' ? classes.selected_platform : ''}
                onClick={() => {set_selected_platform('all');User.set('platform', 'all')}}
            >
                <IconButton>
                    <p>ALL</p>
                </IconButton>
            </li>
        </ul>
    )
}