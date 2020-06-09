import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SignIn, CreateAccount, Todos, Profile } from './src/screens';
import  TodoDetail  from './src/listElementDetail';
import { AuthContext } from './contexts/authContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './src/colors';
import SplashScreen from 'react-native-splash-screen';
import {TodoGlobalState} from './contexts/todoContext';
import tempData from './tempData';


const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator 
    screenOptions={{
      gestureEnabled: true,
      headerStyle: {
      backgroundColor: "#3F51B5"
      },
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerTintColor: colors.white,
      headerBackTitleVisible:false
    }}
    headerMode='float'>
    <AuthStack.Screen name="SignIn" component={SignIn} options={{title: 'Sign In'}} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{title: 'Sign Up'}}/>
    </AuthStack.Navigator>
  );
}

const TodoStack = createStackNavigator();

const TodoStackScreen = () => {
  
  const [lists, setLists] = React.useState(tempData);
  
  return(
    <TodoGlobalState.Provider value={ [lists, setLists] }>
    <TodoStack.Navigator initialRouteName="Tabs"
      screenOptions={{headerBackTitleVisible: false}} >
      <TodoStack.Screen 
        name="Tabs" 
        component={TabScreen} 
        options={{headerShown: false}} />
      <TodoStack.Screen 
        name="TodoDetail" 
        component={TodoDetail}
        options={({ route }) => ({
          title: route.params.item.list.name
        })}
       />
    </TodoStack.Navigator>
    </TodoGlobalState.Provider>
  );
}

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const Tabs = createBottomTabNavigator();

const TabScreen = () => {
  return(
    <Tabs.Navigator
    initialRouteName= "Todos"
    backBehaviour="initialRoute"
    tabBarOptions={{
      activeTintColor: colors.blue
    }}
    >
      <Tabs.Screen 
        name="Todos" 
        component={Todos}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size}  />
          ),
        }} 
      />
      <Tabs.Screen 
        name="Profile" 
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }} 
      />
    </Tabs.Navigator>
  );
}

const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen name="App" component={TodoStackScreen} />
    ) : 
    (
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);

function App () {

  React.useEffect(() => {
    SplashScreen.hide();
  }, [])

  const [userToken, setUserToken] = React.useState(null);


  const authContext = React.useMemo(() => {
    return {
      signIn: (token) => {
        setUserToken(token);
      },
      signUp: (token) => {
        setUserToken(token);
      },
      signOut: () => {
        setUserToken(null);
      }
    };
  }, []);
  
    
  return (
    <AuthContext.Provider value={authContext}>      
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;