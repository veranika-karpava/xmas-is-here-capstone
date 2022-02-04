import './FormSignIn.scss';
import axios from "axios";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from "../Button/Button";

// env variable = REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL;

const FormSignIn = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [isSingnInError, setIsSignInError] = useState(false);
    const [errorMeassage, setErrorMessage] = useState('');
    const history = useHistory();

    // function for logIn user
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        axios.post(`${API_URL}/signin`, {
            username: username,
            password: password
        })
            .then((res) => {
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('userId', res.data.user.id);
                history.push('/dashboard');
                e.target.reset();
            })
            .catch((err) => {
                const error = err.response.data
                setIsSignInError(true);
                setErrorMessage(error);
                console.log(`Post request for userInfo: ${err}. ${err.response.data}`);
            })
    }

    return (
        <section className='sign-in'>
            <h1 className='sign-in__title'>Sign In</h1>
            {isSingnInError && (
                <p className='sign-in__error-message'>{errorMeassage}</p>
            )}
            <form className='sign-in__form' onSubmit={handleSubmit}>
                <div className='sign-in__form-container'>
                    <label className='sign-in__label' htmlFor='username'></label>
                    <input className='sign-in__input' type="text" name="username" id='username' placeholder='Username' onChange={e => setUserName(e.target.value)} />
                </div>
                <div className='sign-in__form-container'>
                    <label className='sign-in__label' htmlFor='password'></label>
                    <input className='sign-in__input' type="password" name="password" id='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                </div>
                <Button title='Sign In' type='submit' value='Submit' />
            </form>
        </section>
    );
}

export default FormSignIn;

