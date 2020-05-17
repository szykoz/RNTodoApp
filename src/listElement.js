import React from 'react';
import {
StyleSheet,
Text,
View,
TouchableOpacity,
} from 'react-native';
import {useNavigationState, useRoute} from '@react-navigation/native';
import colors from './colors';
import  {ScreenContext}   from './screenContext';
import tempData from '../tempData';


export default TodoList = ({ list, navigation }) => {

    const rout = useNavigationState(state => state);
    const { screen, setScreen } = React.useContext(ScreenContext);  //tu sie dzieje magia ze bottomTabNav znika na kazdym kolejnym skrinie w staku :)
    setScreen(rout.index);

    const completedCounter = list.todos.filter(todo => todo.completed).length;
    const remainingCounter = list.todos.length - completedCounter;
    const data = {list, completedCounter, remainingCounter};
    
    return (
        <TouchableOpacity 
            style={[styles.listContainer, {backgroundColor: list.color}]} 
            onPress={() => navigation.push("TodoDetail", {item: data}) } >
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
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create(
    {
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
        color: colors.white,
        marginBottom: 12       
    },
    count: {
        fontSize: 48,
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    }
});