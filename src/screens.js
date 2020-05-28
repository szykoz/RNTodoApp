import React, { useEffect } from 'react';
import {
StyleSheet,
Text,
View,
TouchableOpacity,
FlatList,
Modal
} from 'react-native';
import  { AuthContext }  from './authContext';
import  colors  from './colors';
import Icon from 'react-native-vector-icons/AntDesign'
import tempData from '../tempData';
import AddListModal from './addListModal';
import ListElement from './listElement';


const ScreenContainer = ({ children }) => {
    return(
    <View style={styles.container}>{children}</View>
    );
}


export const Todos = ({navigation}) => {
    const [isShowing, setIsShowing] = React.useState(false);
    const [lists, setLists] = React.useState(tempData);

    function toggle() {
        setIsShowing(!isShowing);
    }  

    const addList = (title, color) => {        
        setLists( [...lists,{id: lists.length+1, name: title, color: color, todos: []}] );
    };      

    // const renderList = (navigation) => {
    //     return <ListElement list={lists} navigation={navigation}/>
    // }

    return (
        <ScreenContainer>
            <Modal animationType="slide" visible={isShowing} onRequestClose={() => toggle()}>
                <AddListModal hide={toggle} addList={addList}/>
            </Modal>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.divider} />
                    <Text style={styles.title}>
                    Todo <Text style={{ fontFamily: 'sans-serif-thin', color: colors.blue}}>Lists</Text>
                    </Text>
            </View>

            <View style={{marginVertical: 32}}>
                <TouchableOpacity 
                    style={styles.addList} 
                    onPress= {() => toggle()} >
                    <Icon size={24} color={colors.blue} name="plus" />
                </TouchableOpacity>
                <Text style={styles.add}>Add List</Text>                
            </View>

            <View style={{height: 280, paddingLeft: 32}}>
                {//<TouchableOpacity
                //onPress={() => alert(JSON.stringify(lists))}><Text>hej</Text></TouchableOpacity>
                }
                 <FlatList 
                    data={lists} 
                    keyExtractor={item => item.name} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <ListElement list={item} navigation={navigation}/>}
                />
            </View>
            
        </ScreenContainer>
    );
}


//const updateList = (list) => {};


export const Profile = () => {
    const { signOut } = React.useContext(AuthContext);
    
    return (
        <ScreenContainer>
            <Text> My Name </Text>
            <TouchableOpacity
            style={[styles.button,{backgroundColor: '#D61A3C'}]}
            onPress={()=> {signOut()}} >
            <Text style={{color:colors.white, fontWeight:'bold'}}>Log out</Text>
            </TouchableOpacity>
        </ScreenContainer>
    );
}


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
                onPress={() => navigation.navigate('CreateAccount')} >
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
        alignItems: 'center',
        backgroundColor: colors.white
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
        fontSize: 58,
        fontWeight: 'bold',
        color: colors.black,
        paddingHorizontal: 20
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.blue,
        borderRadius: 4,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    add: {
        color: colors.blue,
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 8
    }

});