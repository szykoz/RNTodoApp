import React, { useState } from 'react';
import {
StyleSheet,
Text,
View,
TouchableOpacity,
KeyboardAvoidingView,
TextInput,
FlatList
} from 'react-native';
import colors from './colors';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'


export default TodoDetail = (props) => {
 

    const { route, navigation } = props;
    const { item } = route.params;
    const { list, completedCounter, remainingCounter } = item;
    const { name, color, todos } = list;
    
    navigation.setOptions({
        headerStyle: {
            backgroundColor: color
        },
    headerTintColor: 'white'});
    
      return (
        <View style={styles.container}>    
        
          <View style={[styles.section,{flex: 1}]}>
          
            <FlatList 
              keyExtractor={(item) => item.title} 
              data={list.todos} 
              renderItem={({ item }) => ( 
                <View style={styles.todoContainer}>
                  <TouchableOpacity>
                    <Fontisto 
                      name={item.completed ? 'checkbox-active' : 'checkbox-passive'} 
                      size={24} color={item.completed ? colors.green : colors.black} 
                      style={{width: 38}} 
                    />
                  </TouchableOpacity>
                  <Text style={[styles.todo, {textDecorationLine: item.completed ? 'line-through' : 'none', color: item.completed ? colors.gray : colors.black}]}>{item.title}</Text>
                </View>
              )}
              contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32}}
            />
          </View>

          <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior="height" >
                <TextInput style={[styles.input, {borderColor: color}]} />
                <TouchableOpacity style={[styles.addTodo, {backgroundColor: color}]}>
                    <AntDesign name="plus" size={16} color={colors.white} />
                </TouchableOpacity>
                
          </KeyboardAvoidingView>
          <View style={[styles.section, styles.header, {borderBottomColor: color},{marginBottom: 24}, {marginHorizontal: 24}]}>
                <Text style={styles.taskCount}>
                  {completedCounter} of {remainingCounter+completedCounter} tasks
                </Text> 
                </View>

    
        </View>
      );
}


const styles = StyleSheet.create(
    {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    section: {
        //flex: 1,
        alignSelf: "stretch"
    },
    header: {
        alignItems: 'center',
        justifyContent: "center",
        //marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.black
    },
    taskCount: {
        // marginTop: 4,
        // marginBottom: 16,
        color: colors.gray,
        fontSize: 14,
        fontWeight: "bold"
    },
    footer: {
      paddingHorizontal: 32,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center'
    },
    input: {
      flex: 1,
      height: 48,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 6,
      marginRight: 8,
      paddingHorizontal: 8
    },
    addTodo: {
      borderRadius: 4,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center'
    },
    todoContainer: {
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: "center"
    },
    todo: {
      color: colors.black,
      fontWeight: "bold",
      fontSize: 16
    }
});