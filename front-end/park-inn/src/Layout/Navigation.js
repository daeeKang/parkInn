import React from 'react';

// styles
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';

// dependencies
import {
    AppBar, Divider, Drawer, Toolbar, Typography, Button,
    IconButton, List, ListItem, ListItemIcon, ListItemText,
    Grid, Paper,
} from '@material-ui/core';

// icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EventIcon from '@material-ui/icons/Event';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  hide: {
    display: 'none',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },

  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  
}));

const MyAppBar = styled(AppBar)({
  background: '#152238',
});

// const MyButton = style(Button)({
//     textTransform: 'capitalize';

// });

const MyTypography = styled(Typography)({
  color: '#fff',
  htmlFontSize: 10,
  textTransform: 'capitalize',
});

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
        {/* <CssBaseline /> */}
        <MyAppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                <MenuIcon />
                </IconButton>
                <h3>Navigation</h3>
            </Toolbar>
        </MyAppBar>

        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>

            <Divider />
                <List>
                    <ListItem button>
                    <ListItemIcon> <HomeIcon /> </ListItemIcon>
                    <ListItemText primary="Home" />
                    </ListItem>

                    <ListItem button>
                    <ListItemIcon> <AssessmentIcon /> </ListItemIcon>
                    <ListItemText primary="Statistics" />
                    </ListItem>

                    <ListItem button>
                    <ListItemIcon> <DriveEtaIcon /> </ListItemIcon>
                    <ListItemText primary="View Lots" />
                    </ListItem>
                </List>
            
            <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon> <EventIcon /> </ListItemIcon>
                        <ListItemText primary="Booking Calendar" />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon> <AnnouncementIcon /> </ListItemIcon>
                        <ListItemText primary="Announcements" />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon> <ReportProblemIcon /> </ListItemIcon>
                        <ListItemText primary="Report Incident" />
                    </ListItem>
                </List>
        </Drawer>
        
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            <Typography paragraph>
                bitch wtf is this doing bitch wtf is this doing bitch wtf is this doing
                bitch wtf is this doing bitch wtf is this doing bitch wtf is this doing
                bitch wtf is this doing bitch wtf is this doing bitch wtf is this doing
                bitch wtf is this doing bitch wtf is this doing bitch wtf is this doing
                bitch wtf is this doing bitch wtf is this doing bitch wtf is this doing
                bitch wtf is this doing bitch wtf is this doing bitch wtf is this doing
                bitch wtf is this doing bitch wtf is this doing bitch wtf is this doing
                bitch wtf is this doing bitch wtf is this doing bitch wtf is this doing
                bitch wtf is this doing bitch wtf is this doing bitch wtf is this doing
            </Typography>
            
            {/* <Grid container justify="center" align="center">
                <Grid item sm>Left Pane</Grid>
                <Grid item sm>Right pane</Grid>
            </Grid>

            <h1>test</h1> */}
        </main>
    </div>
  );
}