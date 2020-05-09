import React from 'react';
import {
StyleSheet,
Text,
View,
TouchableOpacity,
KeyboardAvoidingView,
TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from './colors';

export default AddList =({hide}) => {
    
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TouchableOpacity style={{ position: "absolute", top: 32, right: 32 }} onPress={hide}>
                <Icon name="close" size={24} color={Colors.black} />
            </TouchableOpacity>

            <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                <Text style={styles.title}>Create Todo List</Text>

                <TextInput style={styles.input} placeholder="List name?"></TextInput>

                <TouchableOpacity style={styles.create}>
                    <Text style={{color: colors.white, fontWeight: "bold"}}>Create!</Text>
                </TouchableOpacity>

            </View>
            
        </KeyboardAvoidingView>
        );
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            fontSize: 28,
            fontWeight: "bold",
            color: colors.black,
            alignSelf: 'center',
            marginBottom:16
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
        create:
        {
            marginTop: 24,
            height: 50,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.blue
        }
    }
)