import React, { useEffect } from 'react';
import {
StyleSheet,
Text,
View,
TouchableOpacity,
FlatList,
Modal,
TextInput,
Image
} from 'react-native';
import  { AuthContext }  from '../contexts/authContext';
import  colors  from './colors';
import Icon from 'react-native-vector-icons/AntDesign'
import AddListModal from './addListModal';
import ListElement from './listElement';
import {TodoGlobalState} from '../contexts/todoContext';

const ScreenContainer = ({ children }) => {
    return(
    <View style={styles.container}>{children}</View>
    );
}

export const Todos = ({navigation}) => {
    const [isShowing, setIsShowing] = React.useState(false);

    const [lists, setLists] = React.useContext(TodoGlobalState);

    function toggle() {
        setIsShowing(!isShowing);
    }

    const addList = (title, color) => { 
        setLists(lists => ([...lists, {id: lists.length+1, name: title, color: color, todos: []}]));
    };

    const deleteList = (index) => {
        lists.splice(index,1);
        setLists(lists.map(item => {
            return item.id === lists.id ? lists : item;
          }));
    }

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
                <FlatList 
                    data={lists} 
                    keyExtractor={(_,index) => index.toString()} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => <ListElement list={item} navigation={navigation} deleteList={deleteList} index={index}/>}
                />
            </View>            
        </ScreenContainer>
    );
}


export const Profile = () => {
        const { signOut} = React.useContext(AuthContext);    
    return (
        <ScreenContainer>
            <View style={{marginBottom: 48}}>
            <Text style={{fontSize: 36}}> Hi, User </Text>
            </View>
            <TouchableOpacity
                style={[styles.button,{backgroundColor: '#D61A3C', marginBottom: 4}]}
                onPress={()=> {signOut()}}>
                <Icon name="poweroff" size={36} style={{color: colors.white}}/>
            </TouchableOpacity>
            <Text style={{color: "#D61A3C", fontWeight: 'bold'}}>Log Out</Text>
        </ScreenContainer>
    );
}


export const SignIn = ({ navigation }) => {
        const { signIn } = React.useContext(AuthContext);
        const [login, setLogin] = React.useState("");
        const [password, setPassword] = React.useState("");
    return (
        <ScreenContainer>
            <View style={{alignItems: 'center', paddingBottom: 24}}>
                <Image source={require('./images/user.png')} style={{width:140, height: 140, resizeMode: 'contain'}} />
            </View>
            <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                <TextInput style={styles.input} placeholder="Login" onChangeText={text => setLogin(text)}></TextInput>
                <TextInput style={styles.input} placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry={true}></TextInput>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if(login!="" && password!="") {
                        signIn(login)
                    } else {
                        alert("You must enter LOGIN and PASSWORD!")
                    }
                 }}>
                <Icon name="plus" size={18} color={colors.white}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 18}}>New member? </Text>
                <TouchableOpacity 
                    style={{color: "448AFF"}}
                    onPress={() => navigation.navigate('CreateAccount')}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: "#448AFF"}}>Create an account!</Text>
                </TouchableOpacity>
            </View>           
        </ScreenContainer>
    );
}

export const CreateAccount = () => {
        const { signUp } = React.useContext(AuthContext);
        const [login, setLogin] = React.useState("");
        const [password, setPassword] = React.useState("");
        const [password2, setPassword2] = React.useState("")
    return (
        <View style={{flex: 1, alignItems: 'flex-start'}}>
            <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                <Text style={styles.authTitle}>Enter your username</Text>
                <TextInput style={styles.input} placeholder="Login" onChangeText={text => setLogin(text)}></TextInput>
                <Text style={styles.authTitle}>Enter your password</Text>
                <TextInput style={styles.input} placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry={true}></TextInput>
                <Text style={styles.authTitle}>Re-enter your password</Text>
                <TextInput style={styles.input} placeholder="Password" onChangeText={text => setPassword2(text)} secureTextEntry={true}></TextInput>
            </View>
            <TouchableOpacity
                style={[styles.button,{backgroundColor: "#448AFF", marginHorizontal: 32, marginTop: 24}]}
                onPress={() => {
                    if(login!="" && password!="" && password === password2){
                        signUp()
                    } else {
                        alert("Check your creditentials")
                    }
                }}>
                <Text style={{color: colors.white, fontWeight: 'bold'}}>Create an account</Text>
            </TouchableOpacity>
        </View>
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
        backgroundColor: "#448AFF",
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24
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
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height:50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    authTitle: {
        fontSize: 21, 
        color: "#448AFF", 
        marginTop: 32,
        fontWeight: 'bold',
        paddingHorizontal: 20
    }

});