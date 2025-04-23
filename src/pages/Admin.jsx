import './admin.css'
import { useState, useEffect} from 'react'

import {auth, db} from '../firebaseConnection'
import { signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        async function loadTarefas(){
          const userDetail = localStorage.getItem("@detailUser")
          setUser(JSON.parse(userDetail))
        }
    
        loadTarefas();
      }, [])
    

    async function handleRegister(e) {
        e.preventDefault();
        
        if(tarefaInput === '') {
            alert('Digite a tarefa ...')
            return;
        }

        await addDoc(collection(db,'tarefas'),{
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            alert('tarefa registrada')
            setTarefaInput('')
        })
        .catch((error) => {
            alert('Erro ao registrar ' + error )
        })
    }



    async function handleLogout() {
        await signOut(auth);
    }

    return (
            <div className='admin-container'>
                <h1>Minhas Tarefas</h1>

                <form onSubmit={handleRegister} className='form'>
                    <textarea
                        placeholder='Digite a sua tarefa'
                        value={tarefaInput}
                        onChange={(e) => setTarefaInput(e.target.value)}
                    />

                    <button type='submit' className='reg'>Registrar Tarefa</button>
                </form>

                <article>
                    <p>Estudar Js</p>
                    <div className='botoes'>
                        <button className='btnE'>Editar</button>
                        <button className='btnC'>Concluir</button>
                    </div>
                </article>

                <button className='btn-logout' onClick={handleLogout}>Sair</button>
            </div>
    )
}
