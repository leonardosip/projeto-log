import './admin.css'
import { useState, useEffect} from 'react'

import {auth, db} from '../firebaseConnection'
import { signOut } from 'firebase/auth';
import { addDoc, collection, 
    onSnapshot, 
    query, orderBy, where,
    doc, deleteDoc, updateDoc
 } from 'firebase/firestore';

export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState ({});

    useEffect(() => {
        async function loadTarefas(){
          const userDetail = localStorage.getItem("@detailUser")
          setUser(JSON.parse(userDetail))

          if(userDetail){
            const data = JSON.parse(userDetail);

            const tarefaRef = collection(db, 'tarefas')
            const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid))
            
            const unsub = onSnapshot (q, (snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        userUid: doc.data().userUid
                    })
                })
                setTarefas(lista);
            })
         }
        }
    
        loadTarefas();
      }, [])
    

    async function handleRegister(e) {
        e.preventDefault();
        
        if(tarefaInput === '') {
            alert('Digite a tarefa ...')
            return;
        }


        if(edit?.id){
            handleUpdateTarefa();
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



    async function deleteTarefa(id) {
        const docRef = doc(db,'tarefas', id)
        await deleteDoc(docRef)
    }

    function editTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item);
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, 'tarefas', edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            alert('Tarefa Atualizada ..')
            setTarefaInput('');
            setEdit({})
        })
        .catch(() => {
            alert('erro ao atualizar')
        })
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

                    {Object.keys(edit) . length > 0 ? (
                        <button type='submit' className='reg'>Atualizar Tarefa</button>
                    ): (
                        <button type='submit' className='reg'>Registrar Tarefa</button>
                    )}
                </form>

                {tarefas.map ((item) => (
                    <article key={item.id}>
                    <p>{item.tarefa}</p>
                    <div className='botoes'>


                        <button 
                        className='btnE'
                        onClick={() => editTarefa(item)}
                        >Editar</button>


                        <button
                         className='btnC'
                        onClick={ () => deleteTarefa(item.id)}
                        >
                            Concluir
                        </button>
                    </div>
                </article>
                ))}

                <button className='btn-logout' onClick={handleLogout}>Sair</button>
            </div>
    )
}
