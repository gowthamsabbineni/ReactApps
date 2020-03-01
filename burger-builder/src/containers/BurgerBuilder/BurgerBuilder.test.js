import React from 'react'
import {configure, shallow}from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
configure({adapter: new Adapter()})
describe('Burger Builder',()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder setIngredients={()=>{}}/>)
    })

    it('should render build controls when receive ingredients',()=>{
        wrapper.setProps({ingredients:{salad:0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})