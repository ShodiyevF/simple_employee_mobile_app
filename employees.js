import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';

export default function App() {
  const employees = ['sohib', 'komil', 'boshqalar']
  
  const [employeeName, setEmployeeName] = useState('')
  const [name, setName] = useState('')
  function setFullname(value) {
    setEmployeeName(value)
  }
  function test() {
    const finded = employees.find(el => el == employeeName)
    console.log(finded);
    if (finded) {
      setName(employeeName)
    } else {
        Alert.alert(
          'Xatolik',
          'bunday hodim topilmadi',
          [{ text: 'tushunarli' }]
        );
      };
  }
  return (
    <View style={styles.container}>
      <View style={styles.header_wrapper}>
        <Text style={styles.logo}>HR yordamchi</Text>
        <Text style={styles.nav}>Elmakon</Text>
      </View> 

      <View style={styles.employeeWrapper}>
        <Text style={styles.employeeName}>Hodim ismi: <Text style={styles.employee}>{name.length ? name : 'Aniq emas!!!'}</Text></Text>
        <View style={styles.employeeEditWrapper}>
          <TextInput style={styles.inputEmployeeName} keyboardType='url' placeholder='e.g John Doe' onChangeText={(val) => setFullname(val)}/>
          <Button style={styles.saveEmployeeInfoBtn} title='Saqlash' onPress={test}/>
        </View>
      </View>
    </View>
  );
}

const width_proportion = '80%';


const styles = StyleSheet.create({
  container: {
    width: width_proportion,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: '20%',

  },
  header_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 'auto',
  },
  employeeWrapper: {
    marginTop: 20
  },
  employeeName: {
    marginBottom: 5,
  },
  employee: {
    fontWeight: 'bold'
  },
  employeeEditWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  inputEmployeeName: {
    width: '75%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  saveEmployeeInfoBtn: {
    width: 200,
    backgroundColor: 'red',
    color: 'black'
  }

});
