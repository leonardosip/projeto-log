import './home.css'
import { useState } from 'react';

import { Link } from 'react-router-dom'

import {auth} from '../firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from 'react-router-dom';

function Home() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();


     async function handleLogin(e){
        e.preventDefault();
        
        if(email !== '' && password !== ''){

            await signInWithEmailAndPassword(auth, email, password)

            .then(() => {
                navigate('/admin', {replace: true})
            })
            .catch((error) => {
                alert('erro ao fazer o login' + error.message)
            })

        }else{
            alert('Erro ao fazer o login: ')
        }

    }




    return (

        <div className='home-container'>

            <h1>Controle de tarefas</h1>
            <span> Gerencie as suas tarefas de forma facil</span>

            <form className='form' onSubmit={handleLogin}>
                <input type='text'
                    className='put1'
                    placeholder='Digite o seu email..'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} /> <br />

                <input type='password'
                    autoComplete='off'
                    placeholder='Digite sua senha..'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} /> <br />

                <button type='submit' className='entry'> Entrar </button>


            </form>

            <Link to='/register' className='linque'>
                Nao possui uma conta? Cadastre-se
            </Link>


        </div>
    )
}

export default Home;