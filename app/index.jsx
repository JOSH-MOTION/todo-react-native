import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Task from './components/Task';
import { useState } from 'react';

const index = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* todays task */}
      <View style={styles.taskwrapper}>
      <Text style={styles.sectionTitle}> Today's Task</Text>
      <View style={styles.items}>
{/* this is the item */}
{
  taskItems.map((item, index) => {
    return ( 
      <TouchableOpacity key={index} onPress={()=>{
        completeTask(index)
      }} >
        <Task text={item} />
      </TouchableOpacity>
    )
  })
} 
      </View>
      </View>

      {/* write a task */}
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a task'} onChangeText={text => setTask(text)} value={task} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
            </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
     </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskwrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },

  writeTaskWrapper:{ 
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },

  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },

  addText:{
    fontSize: 35,
  },
})