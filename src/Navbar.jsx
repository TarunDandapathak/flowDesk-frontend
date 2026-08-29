import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { NavLink } from 'react-router-dom';
import { MessageCircleMore } from 'lucide-react';

const drawerWidth = 240;

const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, to: '/app/deshboard' },
    { text: 'Tasks', icon: <FormatListNumberedIcon />, to: '/app/tasks' },
    { text: 'Timer', icon: <AccessTimeIcon />, to: '/app/timer' },
    { text: 'About', icon: <InfoOutlinedIcon />, to: '/app/about' },
    {text: 'Feedback', icon: <MessageCircleMore />, to: '/app/feedback'}
];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#0F0E17',
                color: '#A7A9BE',
            }}
        >
            {/* App Header & Logo */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                    sx={{
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span className="material-symbols-outlined iconBolt me-3 flex items-center justify-center">
                        bolt
                    </span>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF', flexGrow: 1 }}>
                    FlowDesk
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

            {/* Navigation List */}
            <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            component={NavLink}
                            to={item.to}
                            sx={{
                                borderRadius: '10px',
                                color: '#A7A9BE',
                                '&.active': {
                                    backgroundColor: 'rgba(127, 86, 217, 0.2)',
                                    color: '#9E77ED',
                                    '& .MuiListItemIcon-root': {
                                        color: '#9E77ED',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: 'inherit',
                                    minWidth: '40px',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* Bottom Exiting Action */}
            <Box sx={{ p: 2 }}>
                <IconButton sx={{ color: '#A7A9BE' }}>
                    <ExitToAppIcon />
                </IconButton>
            </Box>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Mobile Header Bar */}
            <AppBar
                component="nav"
                elevation={0}
                sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    '@media (min-width: 768px)': {
                        display: 'none',
                    },
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ color: '#fff' }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Navigation Drawers */}
            <Box
                component="nav"
                sx={{
                    '@media (min-width: 768px)': {
                        width: drawerWidth,
                        flexShrink: 0,
                    },
                }}
            >
                {/* Mobile Temporary Drawer */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: 'block',
                        '@media (min-width: 768px)': {
                            display: 'none',
                        },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#0F0E17',
                            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop Permanent Sidebar */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: 'none',
                        '@media (min-width: 768px)': {
                            display: 'block',
                        },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#0F0E17',
                            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;