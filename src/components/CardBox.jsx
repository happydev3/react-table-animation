import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import Female from '../assets/images/female.jpg';
import Male from '../assets/images/male.jpg';

const CardBox = (props) => {
 
    return (
        <Card className='animation-card'>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe">
                    <img src={props.profile.gender === 'female' ? Female : Male} className='avartar' alt="profileImg"/>
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