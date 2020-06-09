import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Keyboard,
  Animated
} from 'react-native';
import colors from './colors';
import { Swipeable } from 'react-native-gesture-handler';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { TodoGlobalState } from '../contexts/todoContext';


export default TodoDetail = (props) => {


  const { route, navigation } = props;
  const { item } = route.params;
  let { list, completedCounter, remainingCounter } = item;
  const { color } = list;
  const [lists, setLists] = React.useContext(TodoGlobalState);
  const [text, setText] = React.useState("");
  const [completedTasks, setCompletedTasks] = React.useState(completedCounter);
  const [allTasks, setAllTasks] = React.useState(remainingCounter + completedCounter);


  navigation.setOptions({
    headerStyle: {
      backgroundColor: color
    },
    headerTintColor: 'white'
  });

  const updateList = () => {
    setLists(lists.map(item => {
      return item.id === list.id ? list : item;
    }));
  }

  const toggleTodoCompleted = (index) => {

    list.todos[index].completed = !list.todos[index].completed;
    list.todos[index].completed ? setCompletedTasks(completedTasks + 1) : setCompletedTasks(completedTasks - 1)

    updateList();
  }
  const addTodo = () => {
    if (text) {
      list.todos.push({ title: text, completed: false });
      setAllTasks(allTasks + 1);
      updateList();
      setText("");
      Keyboard.dismiss();
    }
    
  }

  const deleteTodo = (index) => {
    let deleted = list.todos.splice(index,1);
    //alert(JSON.stringify(deleted));
    updateList();

    if(deleted[0].completed) {
      setAllTasks(allTasks-1);
      setCompletedTasks(completedTasks-1);
    }
    else {
      setAllTasks(allTasks-1);
    }
  }

  const RightActions = (dragX, index) => {
    const trans = dragX.interpolate({
      inputRange: [-50, -10, 0],
      outputRange: [0, 10, 20]
    });
    return (
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Animated.View style={styles.deleteButton}>        
          <Animated.Text style={[{ color: colors.white, fontWeight: 'bold' },{
              transform: [{ translateX: trans }],
            }]}>
          <AntDesign name="minus" size={16} color={colors.white} />
            </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }


  return (

    <View style={styles.container}>
      <View style={[styles.section, { flex: 1 }]}>
        <FlatList
          keyExtractor={(item, index) => item.title + index}
          data={list.todos}
          renderItem={({ item, index }) => (
            <Swipeable renderRightActions={(_, dragX) => RightActions(dragX, index)}>
              <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => { toggleTodoCompleted(index); }}>
                  <Fontisto
                    name={item.completed ? 'checkbox-active' : 'checkbox-passive'}
                    size={24} color={item.completed ? colors.green : colors.black}
                    style={{ width: 38 }}
                  />
                </TouchableOpacity>
                <Text style={[styles.todo, { textDecorationLine: item.completed ? 'line-through' : 'none', color: item.completed ? colors.gray : colors.black }]}>{item.title}</Text>
              </View>
            </Swipeable>
          )}
          contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 32 }}
        />
      </View>

      <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior="height" >
        <TextInput style={[styles.input, { borderColor: color }]} onChangeText={text => setText(text)} value={text} maxLength={35}/>
        <TouchableOpacity style={[styles.addTodo, { backgroundColor: color }]} onPress={() => addTodo()}>
          <AntDesign name="plus" size={16} color={colors.white} />
        </TouchableOpacity>

      </KeyboardAvoidingView>
      <View style={[styles.section, styles.header, { borderBottomColor: color }, { marginBottom: 24 }, { marginHorizontal: 24 }]}>
        <Text style={styles.taskCount}>
          {completedTasks} of {allTasks} tasks
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
    },
    deleteButton: {
      flex: 1,
      backgroundColor: colors.red,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      paddingHorizontal: 20,
      marginVertical: 10      

    }
  });