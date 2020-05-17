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

import Icon from 'react-native-vector-icons/AntDesign'


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
          
          {/* <View style={[styles.section, styles.header, {borderBottomColor: color}]}>
            <View>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.taskCount}>
                  {completedCounter} of {remainingCounter+completedCounter} tasks
                </Text>
            </View>
          </View> */}
          <View style={[styles.section,{flex: 3}]}>
            <FlatList 
              keyExtractor={(item) => item.title} 
              data={list.todos} 
              renderItem={({ item }) => ( 
              <Text style={styles.title}>{item.title}</Text>
              )}
              contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64}}
          />
          </View>

          <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior="height" >
                <TextInput style={[styles.input, {borderColor: color}]} />
                <TouchableOpacity style={[styles.addTodo, {backgroundColor: color}]}>
                    <Icon name="plus" size={16} color={colors.white} />
                </TouchableOpacity>
          </KeyboardAvoidingView>
    
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
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "bold"
    },
    footer: {
      paddingHorizontal: 32,
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
    }
});