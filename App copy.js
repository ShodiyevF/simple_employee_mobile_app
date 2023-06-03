import { useState, useRef } from 'react';
import { StyleSheet, Text , View, FlatList, TouchableOpacity, TextInput, Image} from 'react-native';

export default function App() {
  const inputRef = useRef(null);
  const [newEmployee, setNewEmployee] = useState('')
  const [inputValue, setInputValue] = useState('')

  const [employee, setEmployee] = useState([
    {id: 1, title: 'Fayzulloh'},
    {id: 2, title: 'Abdulatif'},
    {id: 3, title: 'Abdulaziz'},
    {id: 4, title: 'Abdulhakim'},
    {id: 5, title: 'Abdulloh'},
  ])

  function deleteEmployee(id){
    setEmployee(() => {
      return employee.filter(el => el.id != id)
    })
  }

  function setEmployeeNameFunction(value) {
    setNewEmployee(value)
  }
  function setNewEmployeeFunction() {
    setEmployee([...employee, {id: employee.length + 1, title: newEmployee}])
  }
  function editEmployeeNameFunction(id) {
    setInputValue('')
    const findedEmployee = employee.find(el => el.id = id)
    console.log(id);
    console.log(findedEmployee);
    setInputValue(findedEmployee.title)
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_wrapper}>
        <Text style={styles.logo}>HR yordamchi</Text>
      </View>

      <View style={styles.addEmployeeWrapper}>  
        <TextInput style={styles.addEmployeeInput} ref={inputRef} value={inputValue} placeholder='Hodim ismi' onChangeText={(value) => setEmployeeNameFunction(value)}/>
        <TouchableOpacity style={styles.addEmployeeButton} onPress={setNewEmployeeFunction}>
            <Text style={styles.addEmployeeButtonText}>Qo'shish</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={employee}
        keyExtractor={(item) => item.id}
        style={styles.employeeList}
        renderItem={({item, index}) => {
          const borderBottomStyle = index === employee.length - 1 ? [styles.employeeTextWrapper, styles.removeBorderBottom] : styles.employeeTextWrapper;
          return (
            <View style={borderBottomStyle}>
              <Text style={styles.employeeText}>{item.title}</Text>
              <View style={styles.employeeEditingWrapper}>
                <TouchableOpacity style={styles.editingEmployeeWrapper} onPress={() => editEmployeeNameFunction(item.id)}>
                  <Image source={require('./assets/user-pen-solid.png')} style={styles.employeeEditImage}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editEmployeeWrapper} onPress={() => deleteEmployee(item.id)}>
                  <Image source={require('./assets/trash-solid.png')} style={styles.employeeDeleteImage}/>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  removeBorderBottom: {
    borderBottomWidth: 0
  },
  
  container: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: '20%',
  },
  header_wrapper: {
    marginBottom: 20
  },
  addEmployeeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20
  },
  addEmployeeInput: {
    width: 'auto',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    flexGrow: 1,
    marginRight: 20
  },
  addEmployeeButton: {
    backgroundColor: 'rgba(30,144,255,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4
  },
  addEmployeeButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  employeeList: {
    height: '50%',
    padding: 15,
    backgroundColor: '#1d77ab',
    borderRadius: 10
  },
  employeeTextWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  employeeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  employeeEditingWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  editingEmployeeWrapper: {
    marginRight: 10
  },
  employeeEditImage: {
    width: 30,
    height: 25,
    resizeMode: 'cover',
  },
  employeeDeleteImage: {
    width: 20,
    height: 25,
    resizeMode: 'cover',
  }
});