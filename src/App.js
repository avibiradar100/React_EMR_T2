import './App.css';
import { useState } from 'react';
import { registerUser } from './Api/Api';

function App() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    occupation: '',
    gender: '',
    languages: [],
  })

  const [formError, setFormError] = useState({})

  const onChangeHandler = (event) => {

    if (event.target.name === 'languages') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.languages.push(event.target.value)
      } else {
        copy.languages = copy.languages.filter(el => el !== event.target.value)
      }

      setFormData(copy)

    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))
    }

    setFormError(()=>({

      ...formError,
      [event.target.name]:""
    }))
  }


  const validateForm = () => {
    let err = {}

    if (formData.username === '') {
      err.username = 'please Enter username!'
    }
    if (formData.email === '') {
      err.email = 'please Enter email!'
    } else {
      let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!regex.test(formData.email)) {
        err.email = 'Email is Invalid!'
      }
    }
    if (formData.phone.length !==10) {
      err.phone = 'Phone no is incorrect'
    }
    if (formData.password === '') {
      err.password = 'please Enter password!'
    } else {

        if (formData.password.length < 6) {
          err.password = 'Password should greater than 6 characters!'
        }
      }

    if (formData.occupation === '') {
      err.occupation = 'please Provide Occupation!'
    }
    if (formData.gender === '') {
      err.gender = 'please Select Gender!'
    }
    if (formData.languages.length < 1) {
      err.languages = 'Any one language required!'
    }

    setFormError({ ...err })

    return Object.keys(err).length < 1;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    registerUser(formData)
    validateForm()
  }
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <h1>Registration Form</h1>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" aria-label='username' className="form-control" name="username" onChange={onChangeHandler} value={formData.username} />
          <span className='non-valid'>{formError.username}</span>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" aria-label='email' className="form-control" name="email" onChange={onChangeHandler} value={formData.email} />
          <span className='non-valid'>{formError.email}</span>
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="textbox" aria-label='phone'className="form-control" name="phone" onChange={onChangeHandler} value={formData.phone} />
          <span className='non-valid'>{formError.phone}</span>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" aria-label='password'className="form-control" name="password" onChange={onChangeHandler} value={formData.password} />
          <span className='non-valid'>{formError.password}</span>
        </div>
        <div className="form-group">
          <label htmlFor="occupation" className="form-label">Occupation</label>
          <select className="form-select" aria-label='occupation' name="occupation" onChange={onChangeHandler} value={formData.occupation}>
            <option aria-label='' value=""></option>
            <option aria-label='student' value="student">Student</option>
            <option aria-label='employee' value="employee">Employee</option>
            <option aria-label='other' value="other">Other</option>
          </select>
          <span className='non-valid'>{formError.occupation}</span>
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">Gender</label>
          <div>
            <div>
              <input type="radio" name="gender" value="male" aria-label='male' onChange={onChangeHandler} checked={formData.gender === 'male'} />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input type="radio" name="gender" value="female" aria-label='female' onChange={onChangeHandler} checked={formData.gender === 'female'} />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input type="radio" name="gender" value="other" aria-label='other' onChange={onChangeHandler} checked={formData.gender === 'other'} />
              <label htmlFor="other">Other</label>
            </div>
            <span className='non-valid'>{formError.gender}</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="languages" className="form-label">Languages</label>
          <div>
            <div>
              <input type="checkbox" aria-label='html' name="languages" value="html" onChange={onChangeHandler} checked={formData.languages.indexOf('html') !== -1} />
              <label htmlFor="html">HTML</label>
            </div>
            <div>
              <input type="checkbox" aria-label='css' name="languages" value="css" onChange={onChangeHandler} checked={formData.languages.indexOf('css') !== -1} />
              <label htmlFor="css">CSS</label>
            </div>
            <div>
              <input type="checkbox" aria-label='javascript' name="languages" value="javascript" onChange={onChangeHandler} checked={formData.languages.indexOf('javascript') !== -1} />
              <label htmlFor="javascript">Javascript</label>
            </div>
          </div>
          <span className='non-valid'>{formError.languages}</span>
        </div>
        <div className="form-group">
          <button className="btn" aria-label='submit' type="submit" >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
