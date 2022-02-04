import './FormSignUp.scss';
import { useState } from 'react';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import Button from "../Button/Button";

// env variable = REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL;

const FormSignUp = () => {
    const [username, setUserName] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [isSingnUpError, setIsSignUpError] = useState(false);
    const [errorMeassage, setErrorMessage] = useState('');
    const history = useHistory();


    // function for registration new user
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const name = e.target.name.value;
        const password = e.target.password.value;

        axios.post(`${API_URL}`, {
            username: username,
            name: name,
            password: password
        })
            .then((res) => {
                history.push('/signin');
                e.target.reset();
            })
            .catch((err) => {
                const error = err.response.data
                setIsSignUpError(true);
                setErrorMessage(error);
                console.log(`Post request for userInfo: ${err}. ${err.response.data}`);
            })
    }

    return (
        <div className='sign-up'>
            <h1 className='sign-up__title'>Sign Up</h1>
            {isSingnUpError && (
                <p className='sign-up__error-message'>{errorMeassage}</p>
            )}
            <form className='sign-up__form' onSubmit={handleSubmit}>
                <div className='sign-up__form-container'>
                    <label className='sign-up__label' htmlFor='username'></label>
                    <input className='sign-up__input' type="text" name="username" id='username' placeholder='Username' onChange={e => setUserName(e.target.value)} />
                </div>
                <div className='sign-up__form-container'>
                    <label className='sign-up__label' htmlFor='name'></label>
                    <input className='sign-up__input' type="text" name="name" id='name' placeholder='Name' onChange={e => setName(e.target.value)} />
                </div>
                <div className='sign-up__form-container'>
                    <label className='sign-up__label' htmlFor='password'></label>
                    <input className='sign-up__input' type="password" name="password" id='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                </div>
                <Button title='Sign Up' type='submit' value='Submit' />
            </form>
            <div className='sign-up__add-info'>
                <p className='sign-up__question'>Already have an account?</p>
                <Link to='/signin' className='sign-up__link'>
                    <p className='sign-up__sing-in-link'>Sign In</p>
                </Link>
            </div>
        </div>
    );
}

export default FormSignUp;

