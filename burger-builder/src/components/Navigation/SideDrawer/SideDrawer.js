import React from 'react';
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import Aux from '../../../hoc/AuxComponent/AuxComponent';
import Backdrop from '../../UI/Backdrop/Backdrop';
const sideDrawer = (props) => {
    
    return (
        <Aux>
            <Backdrop show={props.showSideDrawer} clicked={props.closed}/>
            <div className={props.showSideDrawer ? 
                [classes.SideDrawer, classes.Open].join(" ") : [classes.SideDrawer, classes.Close].join(" ")  }
                onClick={props.closed}
                >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
        
    )
}
export default sideDrawer;