import Header from './Header'
import { uuid } from 'uuidv4'
import { useState, useEffect } from 'react';
import AddContact from './AddContact'
import ContactList from './ContactList'
import './App.css';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts'
  const addContactHandler = (contact) => {
    setContacts([...contacts, {id: uuid(), ...contact}])
    
  }
  const [contacts, setContacts] = useState([])
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  }

  useEffect(() =>{
  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (retriveContacts) setContacts(retriveContacts)
  },[])
  
  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  },[contacts])
  
  
  return (
    <div className='ui container'>
      <Header />
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>
    </div>
  );
}

export default App;
