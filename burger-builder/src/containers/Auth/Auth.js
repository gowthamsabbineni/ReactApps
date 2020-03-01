import React , {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionCreators from '../../store/actions/actionsRef';
import {checkValidity} from '../../shared/validation';
class Auth extends Component {
    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email ID'
                },
                value: '',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            },
        },
        isSignup: true
    }
    componentDidMount =()=>{
        if(!this.props.buildingBurger && this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }
    inputChanged =(event, controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls:updatedControls
        })
    }
    submitHandler=(event)=>{
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const isSignup = this.state.isSignup;
        this.props.onSubmit(email,password,isSignup);
    }
    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignup: !prevState.isSignup
            }
        })
    }
    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {
                    formElementsArray.map(elm => {
                        return <Input key={elm.id}
                            elementType={elm.config.elementType}
                            elementConfig={elm.config.elementConfig}
                            value={elm.config.value}
                            inValid={!elm.config.valid}
                            shouldValidate={elm.config.validation}
                            touched={elm.config.touched}
                            changed={(event) => this.inputChanged(event, elm.id)}
                        />
                    })
                }
                <Button buttonType="Success">{this.state.isSignup? 'SIGNUP': 'SIGNIN' }</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button buttonType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup? 'SIGNIN': 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        onSubmit:(email,password,isSignup)=>{dispatch(actionCreators.auth(email,password,isSignup))},
        onSetAuthRedirectPath:()=>dispatch(actionCreators.setAuthRedirectPatch('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);