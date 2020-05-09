import React, { useEffect } from 'react';
import {
StyleSheet,
Text,
View,
TouchableOpacity,
FlatList,
Modal
} from 'react-native';
import { AuthContext } from './context';
import  colors  from './colors';
import Icon from 'react-native-vector-icons/AntDesign'
import tempData from '../tempData';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AddList from './addListModal';


const ScreenContainer = ({ children }) => {
    return(
    <View style={styles.container}>{children}</View>
    );
}

export const Todos = ({ navigation }) => {
    const [isShowing, setIsShowing] = React.useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }    

    return (
        <ScreenContainer>
            <Modal animationType="slide" visible={isShowing} onRequestClose={() => toggle()}>
                <AddList hide={toggle}/>
            </Modal>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.divider} />
                    <Text style={styles.title}>
                    Todo <Text style={{ fontFamily: 'sans-serif-thin', color: colors.blue}}>Lists</Text>
                    </Text>
            </View>

            <View style={{marginVertical: 48}}>
                <TouchableOpacity 
                    style={styles.addList} 
                    onPress= {() => toggle()} >
                    <Icon size={24} color={colors.lightBlue} name="plus" />
                </TouchableOpacity>
                <Text style={styles.add}>Add List</Text>                
            </View>

            <View style={{height: 275, paddingLeft: 32}}>
                <FlatList 
                    data={tempData} 
                    keyExtractor={item => item.name} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <TodoList list={item} /> }
                />
            </View>
            

            {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('TodoList',{name: 'Shopping List'})} >
                <Text>Todo</Text>
            </TouchableOpacity> */}
            
        </ScreenContainer>
    );
}

export const AddTodo = () => {
    return (
        <ScreenContainer>
            <Text> dodaj notakte nie</Text>
        </ScreenContainer>
    )
}

export const TodoList = ({list}) => {
    const completedCounter = list.todos.filter(todo => todo.completed).length;
    const remainingCounter = list.todos.length - completedCounter;
    return (
        <View style={[styles.listContainer, {backgroundColor: list.color}]}>
            <Text style={styles.listTitle} numberOfLines={1}> 
                {list.name} 
            </Text>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.count}>{remainingCounter}</Text>
                <Text style={styles.subtitle}>Remaining</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.count}>{completedCounter}</Text>
                <Text style={styles.subtitle}>Completed</Text>
            </View>    
        </View>
    );
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
        fontSize: 50,
        fontWeight: 'bold',
        color: colors.black,
        paddingHorizontal: 20
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
    },
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 12       
    },
    count: {
        fontSize: 48,
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white
    }

});