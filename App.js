import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text , View, FlatList, TouchableOpacity, TextInput, Image, Alert} from 'react-native';

let domain1 = `172.20.10.3`
domain1 = `192.168.1.94`

export default  function App() {
  const inputRef = useRef(null);
  
  const [inputValue, setInputValue] = useState('')
  const [newEmployee, setNewEmployee] = useState('')
  const [employee, setEmployee] = useState()

  const getUsers = async () => {
    const getUsersPesponse = await fetch(`http://${domain1}:3001/api/users`)
    const getUsersData = await getUsersPesponse.json()
    setEmployee(getUsersData)
  };
  useEffect(() => {
    getUsers();
  }, []);

  const postUsers = async () => {
    const getUsersPesponse = await fetch(`http://${domain1}:3001/api/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: newEmployee
      })
    })
    const getUsersData = await getUsersPesponse.json()
    if (getUsersData.status == 200) {
      Alert.alert(
        `Qo'shildi`,
        `Hodim muvaffaqiyatli qo'shildi`,
        [{ text: 'OK' }]
      );
      setInputValue('')
      getUsers()
    } else if(getUsersData.status == 400){
      Alert.alert(
        `Xato`,
        `Bunday hodim allaqachon qo'shilgan`,
        [{ text: 'OK' }]
      );
    }
  };

  const deleteUsers = async (id) => {
    const deleteUserPesponse = await fetch(`http://${domain1}:3001/api/users`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })

    const deleteUserData = await deleteUserPesponse.json()
    if (deleteUserData.status == 200) {
      Alert.alert(
        `O'chirildi`,
        `Hodim muvaffaqiyatli o'chirildi`,
        [{ text: 'OK' }]
      );
      getUsers()
    }
  }

  const editUser = async (id) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const user = employee.find(el => el.user_id == id)
    setInputValue(user.user_name)
    const editUserResponse = await fetch(`http://${domain1}:3001/api/users`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        name: newEmployee
      })
    })
    const editUserData = await editUserResponse.json()

  }

  function setEmployeeNameFunction(value) {
    setNewEmployee(value)
    setInputValue(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_wrapper}>
        <Text style={styles.logo}>HR yordamchi</Text>
      </View>

      <View style={styles.addEmployeeWrapper}>  
        <TextInput style={styles.addEmployeeInput} ref={inputRef} value={inputValue} placeholder='Hodim ismi' onChangeText={(value) => setEmployeeNameFunction(value)}/>
        <TouchableOpacity style={styles.addEmployeeButton} onPress={postUsers}>
            <Text style={styles.addEmployeeButtonText}>Qo'shish</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={employee}
        keyExtractor={(item) => item.user_id}
        style={styles.employeeList}
        renderItem={({item, index}) => {
          const borderBottomStyle = index === employee.length - 1 ? [styles.employeeTextWrapper, styles.removeBorderBottom] : styles.employeeTextWrapper;
          return (
            <View style={borderBottomStyle}>
              <Text style={styles.employeeText}>{item.user_name}</Text>
              <View style={styles.employeeEditingWrapper}>
                {/* <TouchableOpacity style={styles.editingEmployeeWrapper} onPress={() => editUser(item.user_id)}>
                  <Image source={require('./assets/user-pen-solid.png')} style={styles.employeeEditImage}/>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.editEmployeeWrapper} onPress={() => deleteUsers(item.user_id)}>
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
  logo:{
    fontSize: '15%'
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