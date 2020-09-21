import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Pagination from '@material-ui/lab/Pagination';
import CardBox from '../components/CardBox';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import NativeSelect from '@material-ui/core/NativeSelect';
import profiledbs from './profiles.js';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    width: {
        width: '400px'
    },
    root: {
        '& > *': {
          marginTop: theme.spacing(3),
          display: 'flex',
          justifyContent: 'center'
        }
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    }
}));

const animations = [
    'zoomIn',
    'zoomInDown',
    'zoomInLeft',
    'zoomInRight',
    'zoomInUp',
    'fadeInLeft',
    'fadeInRight',
    'fadeInTopLeft',
    'fadeInTopRight'
]

const AnimationTable = () => {
    const classes = useStyles();
    const [count, setCount] = React.useState((profiledbs.data.length%12 ? 1 : 0) + parseInt(profiledbs.data.length/12));
    const [gender, setGender] = React.useState('all');
    const [profiles, setProfiles] = React.useState(profiledbs.data.slice(0,12));
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    });

    const filterChange = (e) => {
        setGender(e.target.value);
        setPage(1);
        if(e.target.value === 'all') {
            setProfiles(profiledbs.data.slice(0,12));
        } else {
            setProfiles(profiledbs.data.filter((profile) => e.target.value === profile.gender).slice(0,12));
        }
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        if(newPage === 1) {
            if(gender === 'all') {
                setProfiles(profiledbs.data.slice(0,12));
            } else {
                setProfiles(profiledbs.data.filter((profile) => gender === profile.gender).slice(0,12));
            }
        } else if(newPage > 1) {
            if(gender === 'all') {
                setProfiles(profiledbs.data.slice(13+(newPage-2)*12, 1+newPage*12));
            } else {
                setProfiles(profiledbs.data.filter((profile) => gender === profile.gender).slice(13+(newPage-2)*12, 1+newPage*12));
            }
        }
    }

    const textSearch = (e) => {
        setPage(1);
        const filterProfile = profiledbs.data.filter((profile) => profile.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || profile.address.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || profile.ID.indexOf(e.target.value) !== -1 || profile.gender.indexOf(e.target.value.toLowerCase()) !== -1);
        if(gender === 'all') {
            setProfiles(filterProfile.slice(0,12));
        } else {
            setProfiles(filterProfile.filter((profile) => profile.gender === gender).slice(0,12));
        }
    }

    return (
        <>
            <Card className="mb-2 pl-2 pr-2 pb-1 pt-1" style={{background: 'transparent'}}>
                <div className="float-right">
                    <TextField
                        className={classes.margin, classes.width}
                        id="input-with-icon-textfield"
                        label="Search"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Search />
                            </InputAdornment>
                        ),
                        }}
                        onChange={textSearch}
                    />
                    <NativeSelect
                        value={gender}
                        onChange={(e) => filterChange(e)}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-helper',
                        }}
                        className={classes.formControl}
                        >
                        <option value="all">All</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </NativeSelect>
                </div>
            </Card>
            {
                loading 
                ? 
                <div className="loader-4"></div>
                :
                <>
                {
                    profiles.length === 0
                    ?
                    <div style={{width: '100%', display: 'flex'}}>
                        <h1 style={{margin: 'auto'}}>Nothing...</h1>
                    </div>
                    :
                    <div className="row">
                        {
                            profiles.map((profile, index) => {
                                return (
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 col-xs-12" key={index}>
                                            <div style={{animationName: `${['zoomOutDown','zoomOutUp', 'zoomOut'][Math.round(Math.random()*2)]}, ${animations[Math.round(Math.random()*8)]}`, animationDuration: '1000ms, 500ms', animationDelay: '0ms, 1000ms', animationTimingFunction: 'ease-in, ease-out', animationIterationCount: '1, 1'}}>
                                                <CardBox profile={profile}/>
                                            </div>
                                        </div>
                                )
                            })
                        }
                    </div>
                }
                </>
            }
            
            <div className={classes.root}>
                {
                    gender !== 'all'
                    ? 
                    <>
                        {
                            profiledbs.data.filter((profile) => profile.gender === gender).length === 0
                            ?
                            null
                            :
                            <Pagination count={count} color="primary" page={page} boundaryCount={2} onChange={handlePageChange}/>
                        }
                    </>
                    :
                    <>
                        {
                            profiledbs.data.length === 0
                            ?
                            null
                            :
                            <Pagination count={count} color="primary" page={page} boundaryCount={2} onChange={handlePageChange}/>
                        }
                    </>
                    
                }
            </div>
        </>
    )
}

export default AnimationTable;