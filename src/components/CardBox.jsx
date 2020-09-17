import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import Female from '../assets/images/female.jpg';
import Male from '../assets/images/male.jpg';

const useStyles = makeStyles((theme) => ({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    }
}));

const CardBox = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card className='animation-card'>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe">
                    <img src={props.profile.gender === 'female' ? Female : Male} className='avartar'/>
                </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.profile.name}
                subheader={props.profile.ID}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.profile.address}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button>Share</Button>
                <Button>Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default CardBox;