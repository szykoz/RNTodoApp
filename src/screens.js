import React from 'react';
import {
StyleSheet,
Text,
View,
TouchableOpacity
} from 'react-native';
import { AuthContext } from './context';
import  colors  from './colors';
import Icon from 'react-native-vector-icons/AntDesign'


const ScreenContainer = ({ children }) => {
    return(
    <View style={styles.container}>{children}</View>
    );
}

export const Todos = ({ navigation }) => {
    return (
        <ScreenContainer>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.divider} />
                    <Text style={styles.title}>
                    Todo <Text style={{ fontWeight: '100', color: colors.blue}}>Lists</Text>
                    </Text>
            </View>  
            <View style={{marginVertical: 48}}>
                <TouchableOpacity style={styles.addList}>
                    <Icon size={24} color={colors.lightBlue} name="plus" />
                </TouchableOpacity>
                <Text style={styles.add}>Add List</Text>
                
            </View>
            

            {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('TodoList',{name: 'Shopping List'})} >
                <Text>Todo</Text>
            </TouchableOpacity> */}
            
        </ScreenContainer>
    );
}

export const TodoList = () => {
    return (
        <ScreenContainer>
            <Text> Todo List </Text>                    
        </ScreenContainer>
    )
}

export const Profile = () => {
    const { signOut } = React.useContext(AuthContext);
    
    return (
        <ScreenContainer>
            <Text> My Name </Text>
            <TouchableOpacity
            style={[styles.button,{backgroundColor: '#D61A3C'}]}
            onPress={()=> {signOut()}} >
            <Text style={{color:'white', fontWeight:'bold'}}>Log out</Text>
            </TouchableOpacity>
        </ScreenContainer>
    );
}

export const Splash = () => (
    <ScreenContainer>
      <Text>Loading...</Text>
    </ScreenContainer>
  );


export const SignIn = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);
    return (
        <ScreenContainer>
            <Text>sign in screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => signIn() } >
                <Text>Sign in</Text>
            </TouchableOpacity>
            <Text>New member? Create an account!</Text>
            <TouchableOpacity
                style={[styles.button,{backgroundColor:'#8E8E93'}]}
                onPress={() => navigation.push("CreateAccount")} >
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </ScreenContainer>
    );
}

export const CreateAccount = () => {
    const { signUp } = React.useContext(AuthContext);
    return (
        <ScreenContainer>
            <Text>Register screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => signUp()} >
                    <Text>Create an account</Text>
                </TouchableOpacity>
        </ScreenContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#C7C7CC',
        padding: 15,
        borderRadius: 10,
        margin: 20
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 2,
        flex: 1,
        alignSelf: 'center'
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        color: colors.black,
        paddingHorizontal: 48
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    add: {
        color: colors.lightBlue,
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 8
    }
});