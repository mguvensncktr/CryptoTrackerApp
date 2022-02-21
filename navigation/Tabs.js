import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import { Entypo, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    backgroundColor: '#181818',
                    borderTopColor: '#181818',
                },
                tabBarShowLabel: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Entypo name="home" size={focused ? 30 : 26} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Watchlist"
                component={WatchlistScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome name="star" size={focused ? 30 : 26} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;