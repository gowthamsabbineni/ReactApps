import React,{Component} from 'react'
import Aux from '../AuxComponent/AuxComponent';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class layout extends Component {
    state ={
        showSideDrawer: false
    }
    SideDrawerCloseHandler =()=>{
        this.setState({
            showSideDrawer: false
        })
    }
    SideDrawerToggleHandler =()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render(){

    return (
        <Aux>
            <Toolbar 
            isAuth = {this.props.isAuthenticated}
            darwerToggleClicked={this.SideDrawerToggleHandler}/>
            <SideDrawer 
            isAuth = {this.props.isAuthenticated}
            closed={this.SideDrawerCloseHandler} opened={this.SideDrawerOpenHandler} showSideDrawer={this.state.showSideDrawer}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    )
    }
}
const mapStateToProps =(state)=>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(layout)