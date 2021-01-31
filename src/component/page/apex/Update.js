import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '95%',
        margin: '0 auto',
        marginTop: '30px',
    },
    grid: {padding: '5px !important'},
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Update(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={3} sm={3}>                    
                  <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid className={classes.grid} item xs={6} sm={6}>                    
                    <div>
                        <p>Apex Legends最新情報</p>
                        <p>最終更新日</p>
                        <Paper className={classes.paper}>
                            Apex Legends（エーペックス レジェンズ）の攻略Wikiです。最新のアップデートやパッチノートの情報の他にも、最強ランキングやイベント情報なども掲載しているのでぜひご覧ください。
                        </Paper>
                        <div className="table_of_contents">
                            <ul>
                                <li><ArrowRightIcon/>新キャラのフューズ参戦</li>
                                <li><ArrowRightIcon/>新武器30-30リピーター追加</li>
                                <li><ArrowRightIcon/>金マガジン追加</li>
                                <li><ArrowRightIcon/>キングスキャニオンの地形が変更</li>
                            </ul>
                        </div>
                    </div>
                  <Paper className={classes.paper}>xs=12 sm=6</Paper>
                </Grid>
                <Grid className={classes.grid} item xs={3} sm={3}>
                  <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
          </Grid>
        </div>
    )
}