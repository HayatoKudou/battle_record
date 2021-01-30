import User from '../auth/User';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        backgroundColor: theme.palette.background.paper,
    },
    list_title: {
        textAlign: 'center',
    },
    list_title_span: {
        fontWeight: 'bold',
        fontSize: '20px',
        borderBottom: 'dotted 1px',
        paddingBottom: '15px',
    },
    list_checked: {
        color: '#1976d2',
        padding: '5px 0 0 0 !important',
    },
    list_nochecked: {
        padding: '0 0 0 30px !important',
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function SideList(){

    const classes = useStyles();

    return(
        <div className={classes.list}>
            <List>
                <ListItemText className={classes.list_title} primary={
                    <Typography type="body2" className={classes.list_title_span}>{"gamer-lab"}</Typography>
                }/>
                <ListItemLink href="/">
                    <ListItemText className={classes.list_checked} primary="Apex Legends エーペックスレジェンズ掲示板" />
                </ListItemLink>
                {User.isLoggedIn() ?
                <div>
                    <ListItemLink onClick={() => {User.logout();window.location.reload();}} className={classes.list_nochecked}>
                        <ListItemText primary="ログアウト" />
                    </ListItemLink>
                </div>
                :
                <div>
                    <ListItemLink href="/register" className={classes.list_nochecked}>
                        <ListItemText primary="ユーザー登録" />
                    </ListItemLink>
                    <ListItemLink href="/login" className={classes.list_nochecked}>
                        <ListItemText primary="ログイン" />
                    </ListItemLink>
                </div>
                }
            </List>
        </div>
    )
};