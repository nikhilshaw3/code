import React from 'react'
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import bookDonateScreen from '../screens/bookDonateScreen'
import bookRequestScreen from '../screens/bookRequestScreen'

export const AppTabNavigator = createBottomTabNavigator({
DonateBooks : {
screens: bookDonateScreen,
navigationOptions: {
tabBarIcon :<Image source={require('../assets/request-list.png')} 
style={{width: 20,height: 20}}
/>,
tabBarLabel: "Donate books",
}
},

RequestBooks : {
    screens: bookRequestScreen,
    navigationOptions: {
    tabBarIcon :<Image source={require('../assets/request-book.png')} 
    style={{width: 20,height: 20}}
    />,
    tabBarLabel: "Request books",
    }
    }

})