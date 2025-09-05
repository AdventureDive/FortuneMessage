import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
interface Props {
    setShowHeader: (value: boolean) => void;
    familyId: number,
}

const Activity = observer((props: Props) => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Load tasks from storage on app start
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Error loading activity:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.log('Error saving activity:', error);
    }
  };

  const addTask = () => {
    if (!form.title || !form.description || !form.dueDate || !form.image)
      return;

    let updatedTasks;
    if (editingId) {
      // Edit existing
      updatedTasks = tasks.map((task) =>
        task.id === editingId ? { ...form, id: editingId } : task
      );
      setEditingId(null);
    } else {
      // Add new
      updatedTasks = [...tasks, { ...form, id: Date.now().toString() }];
    }

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setForm({ title: '', description: '', dueDate: '', image: '' });
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const startEditing = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      image: task.image,
    });
    setEditingId(task.id);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        {editingId ? 'Edit Activity' : 'Activity'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Activity"
        placeholderTextColor="#f4a6edff"
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#f4a6edff"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date"
        placeholderTextColor="#f4a6edff"
        value={form.dueDate}
        onChangeText={(text) => setForm({ ...form, dueDate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Event QR Code URL"
        placeholderTextColor="#f4a6edff"
        value={form.image}
        onChangeText={(text) => setForm({ ...form, image: text })}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>
          {editingId ? 'Save Changes' : 'Add Activity'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.header}>Activities</Text>
      {tasks.length === 0 ? (
        <Text style={styles.emptyState}>No activity planned</Text>
      ) : (
        tasks.map((item) => (
          <View key={item.id} style={styles.taskCard}>
            <Image source={{ uri: item.image }} style={styles.taskImage} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskDueDate}>Due: {item.dueDate}</Text>
            </View>
            <View style={styles.taskActions}>
              <TouchableOpacity
                onPress={() => startEditing(item)}
                style={{ marginRight: 10 }}>
                <FontAwesome name="edit" size={20} color="#f47e07ff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <FontAwesome name="trash" size={20} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e6f2ff',//'red'
    padding: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: 'magenta',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ef0dc2ff',
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5e6f2ff',
    color: '#0a0a0aff',
  },
  addButton: {
    backgroundColor: '#f5e6f2ff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'magenta',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'magenta',
  },
  emptyState: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#f885d2ff',
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#f5e6f2ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#f311c9ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  taskImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#780fe8ff',
  },
  taskDescription: {
    color: '#6b67eeff',
    marginVertical: 4,
  },
  taskDueDate: {
    color: '#ac28f9ff',
    fontWeight: '600',
  },
  taskActions: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Activity;
