import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DarwerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props) =>{
    return(
    <header className={classes.Toolbar}>
        <DarwerToggle clicked={props.darwerToggleClicked}/>
        <div className={classes.Logo}>
                <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
    )
}
export default toolbar;