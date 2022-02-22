import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Tabs from './Tabs'
//screens
import DetailScreen from '../screens/DetailScreen'
import NewAssetScreen from '../screens/NewAssetScreen'
import { View } from 'react-native'

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Root"
            >
                <Stack.Screen name="Root" component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Assets" component={NewAssetScreen}
                    options={{
                        title: 'Add New Asset',
                        headerStyle: {
                            backgroundColor: '#121212',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router