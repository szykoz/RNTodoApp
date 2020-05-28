import React from 'react';
import {
StyleSheet,
Text,
View,
TouchableOpacity,
} from 'react-native';
import colors from './colors';
//import tempData from '../tempData';


export default ListElement = ({ list, navigation }) => {

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
        {/*onPress={() => alert(JSON.stringify(list))}><Text>klik</Text> */}
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