import React, { useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';

import './App.css';
import schema from './validation/formSchema';
import Form from './components/Form';
import User from './components/User';

//Initial Values
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  tos: false,
}

const initialFormErros = {
  name: '',
  email: '',
  password: '',
  tos: '',
}

const initialUsers = [];
const initialDisabled = false;

function App() {
  /// STATES ///
  const [ users, setUsers ] = useState(initialUsers);
  const [ formValues, setFormValues ] = useState(initialFormValues);
  const [ formErrors, setFormErrors ] = useState(initialFormErros);
  const [ disabled, setDisabled ] = useState(initialDisabled);

  /// USER RELATED HELPERS ///

  
  const createNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then( res => {
        setUsers([res.data, ...users]);
        setFormValues(initialFormValues);
      })
      .catch( err => {
        console.log(err);
        setFormValues(initialFormValues);
      })
  }


  /// EVENT HANDLERS ///
  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then( () => setFormErrors({...formErrors, [name]: ''}))
    .catch( err => setFormErrors({...formErrors, [name]: err.errors}))
  }

  const inputChange = ( name, value ) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos,
    }
    createNewUser(newUser);
  }

  /// SIDE EFFECTS ///

  useEffect(() => {
    schema.isValid(formValues)
    .then(valid => setDisabled(!valid))
  }, [formValues])

  /// RETURNED ///
  return (
    <div className="container">
      <header><h1>User Sign Up!</h1></header>
      
      <Form 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users && users.map( user => {
          return (
            <User 
              key={user.name}
              details={user}
            />
          )
        })
      }
      
    </div>
  );
}

export default App;
