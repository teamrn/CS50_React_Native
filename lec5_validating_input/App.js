import React from 'react';
import { Button, SectionList, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'

import contacts, { compareNames } from './contacts'
import Row from './Row'
import ContactsList from './ContactsList'
import AddContactForm from './AddContactForm'

export default class App extends React.Component {
  state = {
    showContacts: false,
    showForm: false,
    contacts: contacts,
  }

  addContact = newContact => {
    this.setState(prevState => ({showForm: false, contacts: [...prevState.contacts, newContact]}))
  }  

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  sort = () => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].sort(compareNames),
    }))
  }

  showForm = () => {
    this.setState({showForm: true})
  }

  render() {
    if (this.state.showForm) return <AddContactForm onSubmit={this.addContact} />
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="add contact" onPress={this.showForm} />
        {this.state.showContacts && <ContactsList contacts = {this.state.contacts} />}
      </View>      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    paddingTop: Constants.statusBarHeight,
  },
});
