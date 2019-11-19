import React from 'react'
import {Button, StyleSheet, TextInput, View} from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center', //入力フォームをセンターに
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
})

export default class AddContactForm extends React.Component {
  state = {
    name: '',
    phone: '',
    isFormValid: false, // 入力検査の真偽
  }

  /* もう一つの書き方
  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name || this.state.phone !== prevState.phone) {
      this.validateForm()
    }
  }
  */

  // 第二引数に validateForm を
  handleNameChange = name => {
    this.setState({name}, this.validateForm)
  }

  handlePhoneChange = phone => {
    if (+phone >= 0 && phone.length <= 10) {
      this.setState({phone}, this.validateForm)
    }
  }

  // 入力検査
  validateForm = () => {
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3) {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }
  
  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }

  // isFormValid が true のとき submit が押せる
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleNameChange}
          placeholder="Name"
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handlePhoneChange}
          placeholder="Phone"
        />
        <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid}/> 
      </View>
    )
  }
}
