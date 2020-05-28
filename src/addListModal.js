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
import colors from './colors';
//import tempData from '../tempData';


export default AddList =({hide, addList}) => {

    const backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#FF8C00"];

    const[text, setText] = React.useState("");
    const[color, setColor] = React.useState(backgroundColors[1]);    
    
    const renderColors = () => {        
        
        return backgroundColors.map(col => {
            return (
                <TouchableOpacity
                    key={col}
                    style={[styles.colorSelect, {backgroundColor: col}]}
                    onPress={() => setColor(col)}>
                </TouchableOpacity>
            );
        }); 
    }
    
    return(
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <TouchableOpacity style={{ position: "absolute", top: 32, left: 32 }} onPress={hide}>
                <Icon name="close" size={24} color={colors.black} />
            </TouchableOpacity>

            <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                <Text style={styles.title}>Create Todo List</Text>

                <TextInput style={styles.input} placeholder="List name?" onChangeText={text => setText(text)}></TextInput>
                <View style={{flexDirection: 'row', paddingTop:30, justifyContent: 'space-between'}}>{renderColors()}</View>

                <TouchableOpacity 
                    style={ [styles.create, {backgroundColor: color} ]} 
                    onPress={() => {
                        addList(text, color);
                        hide();
                        }
                    }>
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
        },
        colorSelect: {
            width: 30,
            height: 30,
            borderRadius: 4
        }
    }
)