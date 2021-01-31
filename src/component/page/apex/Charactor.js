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

export default function Charactor(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={3} sm={3}>
                  <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid className={classes.grid} item xs={6} sm={6}>
                    <Paper>
                        <div className="page_title">
                            <h1>【Apex Legends】最強キャラランキング</h1>
                            <span className="update_date">最終更新日: 2021年**月**日</span>
                            <p className="page_detail">
                                Apex Legends（エーペックス レジェンズ）の攻略Wikiです。最新のアップデートやパッチノートの情報の他にも、最強ランキングやイベント情報なども掲載しているのでぜひご覧ください。
                            </p>
                        </div>
                        <div className="table_of_contents">
                            <ul>
                                <li className="table_of_contents_title">目次: 最強キャラランキング</li>
                                <li><ArrowRightIcon/>新キャラ評価</li>
                                <li><ArrowRightIcon/>Sランク</li>
                                <li><ArrowRightIcon/>Aランク</li>
                                <li><ArrowRightIcon/>Bランク</li>
                                <li><ArrowRightIcon/>Cランク</li>
                                <li><ArrowRightIcon/>キャラ評価基準</li>
                            </ul>
                        </div>
                       

                        {/* <div className="new_character">
                            <h2>新キャラ評価</h2>
                            <table>
                                <tr>
                                    <th>キャラ</th>
                                    <th>キングスキャニオン</th>
                                    <th>ワールズエッジ</th>
                                    <th>オリンパス</th>
                                    <th>点数</th>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/gibraltar.png" alt=""/>
                                        <p>ジブラルタル</p>
                                    </td>
                                    <td>S</td>
                                    <td>S</td>
                                    <td>S</td>
                                    <td>10/10点</td>
                                </tr>
                            </table>
                        </div> */}

                        <div className="new_character">
                            <h2>Sランクキャラ</h2>
                            <table>
                                <tr>
                                    <th><h3>キャラ</h3></th>
                                    <th><h3>キングスキャニオン</h3></th>
                                    <th><h3>ワールズエッジ</h3></th>
                                    <th><h3>オリンパス</h3></th>
                                    <th><h3>点数</h3></th>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/wraith.png" alt=""/>
                                        <p>レイス</p>
                                    </td>
                                    <td><span className="s_rank">S</span></td>
                                    <td><span className="s_rank">S</span></td>
                                    <td><span className="s_rank">S</span></td>
                                    <td><span className="rank_score">10/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/gibraltar.png" alt=""/>
                                        <p>ジブラルタル</p>
                                    </td>
                                    <td><span className="s_rank">S</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="s_rank">S</span></td>
                                    <td><span className="rank_score">9.7/10点</span></td>
                                </tr>
                            </table>
                            <p></p>
                        </div>


                        <div className="new_character">
                            <h2>Aランクキャラ</h2>
                            <table>
                                <tr>
                                    <th><h3>キャラ</h3></th>
                                    <th><h3>キングスキャニオン</h3></th>
                                    <th><h3>ワールズエッジ</h3></th>
                                    <th><h3>オリンパス</h3></th>
                                    <th><h3>点数</h3></th>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/bloodhound.png" alt=""/>
                                        <p>ブラッドハウンド</p>
                                    </td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="s_rank">S</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="rank_score">9.3/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/horizon.png" alt=""/>
                                        <p>ホライゾン</p>
                                    </td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="s_rank">S</span></td>
                                    <td><span className="rank_score">9.3/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/lifeline.png" alt=""/>
                                        <p>ライフライン</p>
                                    </td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="rank_score">9/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/crypto.png" alt=""/>
                                        <p>クリプト</p>
                                    </td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="rank_score">9/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/bangalore.png" alt=""/>
                                        <p>バンガロール</p>
                                    </td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="rank_score">9/10点</span></td>
                                </tr>
                            </table>
                        </div>

                        <div className="new_character">
                            <h2>Bランクキャラ</h2>
                            <table>
                                <tr>
                                    <th><h3>キャラ</h3></th>
                                    <th><h3>キングスキャニオン</h3></th>
                                    <th><h3>ワールズエッジ</h3></th>
                                    <th><h3>オリンパス</h3></th>
                                    <th><h3>点数</h3></th>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/pathfinder.png" alt=""/>
                                        <p>パスファインダー</p>
                                    </td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="b_rank">B</span></td>
                                    <td><span className="b_rank">B</span></td>
                                    <td><span className="rank_score">7/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/revenant.png" alt=""/>
                                        <p>レブナント</p>
                                    </td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="b_rank">C</span></td>
                                    <td><span className="rank_score">7/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/caustic.png" alt=""/>
                                        <p>コースティック</p>
                                    </td>
                                    <td><span className="b_rank">B</span></td>
                                    <td><span className="s_rank">S</span></td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="rank_score">6.3/10点</span></td>
                                </tr>
                            </table>
                        </div>

                        <div className="new_character">
                            <h2>Cランクキャラ</h2>
                            <table>
                                <tr>
                                    <th><h3>キャラ</h3></th>
                                    <th><h3>キングスキャニオン</h3></th>
                                    <th><h3>ワールズエッジ</h3></th>
                                    <th><h3>オリンパス</h3></th>
                                    <th><h3>点数</h3></th>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/wattson.png" alt=""/>
                                        <p>ワットソン</p>
                                    </td>
                                    <td><span className="b_rank">B</span></td>
                                    <td><span className="a_rank">A</span></td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="rank_score">6/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/octane.png" alt=""/>
                                        <p>オクタン</p>
                                    </td>
                                    <td><span className="b_rank">B</span></td>
                                    <td><span className="b_rank">B</span></td>
                                    <td><span className="b_rank">B</span></td>
                                    <td><span className="rank_score">6/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/rover.png" alt=""/>
                                        <p>ローバ</p>
                                    </td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="b_rank">B</span></td>
                                    <td><span className="rank_score">4/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/mirage.png" alt=""/>
                                        <p>ミラージュ</p>
                                    </td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="rank_score">3/10点</span></td>
                                </tr>
                                <tr>
                                    <td className="character_image">
                                        <img src="/apex_image/rampart.png" alt=""/>
                                        <p>ランパート</p>
                                    </td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="c_rank">C</span></td>
                                    <td><span className="rank_score">3/10点</span></td>
                                </tr>
                            </table>
                        </div>


                        <div className="evaluation_criteria">
                            <h2>キャラ評価基準</h2>
                            <table>
                                <tr>
                                    <th>S</th>
                                    <td>現環境でトップクラスの性能を持つキャラ</td>
                                </tr>
                                <tr>
                                    <th>A</th>
                                    <td>汎用性が高く、幅広く活躍のできるキャラ</td>
                                </tr>
                                <tr>
                                    <th>B</th>
                                    <td>キャラの組み合わせやマップ次第で、活躍のできるキャラ</td>
                                </tr>
                                <tr>
                                    <th>C</th>
                                    <td>上記に当てはまらないキャラ。今後のアップデート次第で活躍する可能性は十分にある</td>
                                </tr>
                            </table>
                        </div>

                    </Paper>
                </Grid>
                <Grid className={classes.grid} item xs={3} sm={3}>
                  <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
          </Grid>
        </div>
    )
}