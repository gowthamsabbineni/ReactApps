import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    // componentWillMount =()=>{
    //     //Used to get data through query params..when there is no redux.
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         //['salad','1']
    //         if(param[0] !== "price"){
    //             ingredients[param[0]] = +param[1]
    //         }
    //         else{
    //             price = param[1];
    //         }

    //     }
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary =
                (<div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients}
                        checkoutCancel={this.checkoutCancelledHandler}
                        checkoutContinue={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>)

        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);