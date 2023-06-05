import React, { useEffect, useState, } from 'react'
import EditUser from './EditUser'
import AddUser from './AddUser'
import './UserList.css';
import axios from 'axios'

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [addModalShow,setAddModalShow] = useState(false);

    const pegaUsuarios = async () => {
        try {
            const resposta = await axios.get('http://localhost:30000/usuarios');
            setUsers(resposta.data);
        } catch (erros) {
            console.log(erros)
        }
    }

    const criaUsuario = async (novoUsuario) => {
        try {
            await axios.post('http://localhost:30000/usuarios',
                novoUsuario);
            pegaUsuarios(); 
        } catch (erros) {
            console.log(erros);
        }
    }
    const deletarUsuario = async (userId) => {
        const respostaConfirm = window.confirm("voce quer realmente deletar esse usuario?");
        if (respostaConfirm) {
            try {
                await axios.delete(`http://localhost:30000/usuarios/${userId}`);
                pegaUsuarios();
            } catch (erros) {
                console.log(erros)
            }
        }
    }


    useEffect(() => {
        pegaUsuarios();
    }, [])

    return (
        <div>
            <h1>Lista De Usuarios</h1>
            <button className='btn btn-primary mb-2' onClick={() => setAddModalShow(true)}>
                Adicionar Usuario
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((users) => (
                        <tr key={users.id}>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>
                                <button>atualizar</button>
                                <button on onClick={() => deletarUsuario(users.id)}>
                                    deletar</button>
                            </td>
                        </tr>   
                    ))}
                </tbody>

            </table>

            {
                addModalShow && (
                    <AddUser
                        handleClose={() => setAddModalShow(false)}
                        addUser={criaUsuario}
                        pegaUsuarios={pegaUsuarios}
                    />
                )
            }

        </div>
    )
}
