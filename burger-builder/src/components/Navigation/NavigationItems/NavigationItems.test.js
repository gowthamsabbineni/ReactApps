import React from 'react'
import {configure, shallow}from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure({adapter: new Adapter()})
describe('Navigation Items',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>);
    })
    it('should render two navigationItems if it\'s not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
    it('should render three navigationItems if it\'s not authenticated', ()=>{
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
    it('should render logout if it\'s authenticated', ()=>{
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
})