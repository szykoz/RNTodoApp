import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { SignIn, CreateAccount, Todos, Profile, TodoList, Splash } from './src/screens';
import { AuthContext } from './src/context';


const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} options={{title: 'Sign In'}} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{title: 'Create Account'}}/>
    </AuthStack.Navigator>
  );
}

const TodoStack = createStackNavigator();

const TodoStackScreen = () => {
  return(
    <TodoStack.Navigator initialRouteName="Todos">
      <TodoStack.Screen name="Todos" component={Todos} options={{headerShown: false}} />
      <TodoStack.Screen 
        name="TodoList" 
        component={TodoList}
        options={({ route }) => ({
          title: route.params.name
        })} />
    </TodoStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const Tabs = createMaterialBottomTabNavigator();

const TabScreen = () => {
  return(
    <Tabs.Navigator>
      <Tabs.Screen name="Todos" component={TodoStackScreen} />
      <Tabs.Screen name="Profile" component={ProfileStackScreen} />
    </Tabs.Navigator>
  );
}

const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen name="App" component={TabScreen} />
    ) : 
    (
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);

function App () {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, []);

  if(isLoading) {
    return (
      <Splash />
    );
  } 
    
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <RootStackScreen userToken={userToken} />
    </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;