import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import TempScreen from '../screens/TempScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen
            name= "Home"
            component={HomeScreen}
            options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="home" color={'#333'} size={size} />
                ),
            }}
            />
            <Tab.Screen
                name="Report"
                component={TempScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="information-variant" color={'#333'} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Statistics"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="information-variant" color={'#333'} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="information-variant" color={'#333'} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
        
    </NavigationContainer>
  )
}

export default Navigation