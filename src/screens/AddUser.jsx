import { Modal,Form,Button } from 'react-bootstrap';
import React, { useState } from 'react'

export default function AddUser({ addUser, handleClose, pegarUsuarios }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.prevantDefault();
        const novoUsuario =
        {
            name: nome,
             email: email,
             password: senha,
        };

        await AddUser(novoUsuario);
        setNome('');
        setEmail('');
        setSenha('');
        handleClose();
    }

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Adicionar Usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control
                            type="text"
                            value={nome}
                            onChange={(valor) => setNome(valor.traget.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(valor) => setEmail(valor.traget.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control
                            type="password"
                            value={senha}
                            onChange={(valor) => setSenha(valor.traget.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Adicionar Novo Usuario
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
