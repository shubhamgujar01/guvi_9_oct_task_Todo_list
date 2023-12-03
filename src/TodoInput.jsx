import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';



const TodoInput = () => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [updName, setUpdName] = useState('');
    const [updDesc, setUpdDesc] = useState('');
    const [todoArr, setTodoArr] = useState([]);
    const [status, setStatus] = useState('All')
    const [comp, setComp] = useState(false)
    const [compArr, setCompArr] = useState([])

    function addHandler() {
        setTodoArr([...todoArr, {
            name: name,
            desc: desc,
            checked: false,
            done: false
        }]);
        setName('');
        setDesc('');

    }

    function dltHandler(id) {
        for (var i = 0; i < todoArr.length; i++) {
            if (i === id) {
                todoArr.splice(i, 1)
            }
        }

        setTodoArr([...todoArr])
    }

    function dltHandlerComp(id) {
        for (var i = 0; i < compArr.length; i++) {
            if (i === id) {
                compArr.splice(i, 1)
            }
        }

        setTodoArr([...compArr])
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function handleShow(id) {
        setShow(true)
        for (var i = 0; i < todoArr.length; i++) {
            if (i === id) {
                setUpdName(todoArr[i].name)
                setUpdDesc(todoArr[i].desc)
            }
        }

        for (var i = 0; i < compArr.length; i++) {
            if (i === id) {
                setUpdName(compArr[i].name)
                setUpdDesc(compArr[i].desc)
            }
        }
    }

    function handleEdit(id) {
        setShow(false);

        for (var i = 0; i < todoArr.length; i++) {
            if (i === id) {
                todoArr[i].name = updName;
                todoArr[i].desc = updDesc;
            }
        }
        setTodoArr(todoArr);
    }

    function doneHandler(id) {
        const updatedTodoArr = [...todoArr];
        updatedTodoArr[id].done = true;
        setTodoArr(updatedTodoArr);
    }

    function notDoneHandler(id) {
        const updatedTodoArr = [...todoArr];
        updatedTodoArr[id].done = false;
        setTodoArr(updatedTodoArr);
    }

    function compHandler() {

        const completedTasks = todoArr.filter((task) => {
            if (task.done === true) {
                return task
            }
        })

        setCompArr(completedTasks)

        setComp(true)
        setStatus('Completed')
    }

    function allHandler() {
        setComp(false)
        setStatus('All')
    }

    return (
        <Container>
            <Row>
                <Col lg={4} md={6} sm={12} xs={12}>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Todo name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        style={{ borderColor: 'ccf5d3' }}
                    />
                </Col>
                <Col lg={4} md={6} sm={12} xs={12}>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Todo description"
                        value={desc}
                        onChange={(e) => { setDesc(e.target.value) }}
                        style={{ borderColor: 'ccf5d3 !important' }}
                    />
                </Col>
                <Col lg={4} md={6} sm={12} xs={12}>
                    <Button variant="success" onClick={addHandler} style={{ backgroundColor: '#13ad89' }}>Add Todo</Button>
                </Col>
            </Row>

            <Dropdown style={{ position: 'relative', top: '100px', float: 'left' }}>
                <span style={{ marginRight: '10px' }}>Filter:</span>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {status}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={allHandler}>All</Dropdown.Item>
                    <Dropdown.Item onClick={compHandler}>Completed</Dropdown.Item>
                    
                </Dropdown.Menu>
            </Dropdown>

            <Row style={{ position: 'relative', top: '150px' }}>
                {comp ? (compArr.map((elem, index) => (
                    <Col key={index} lg={4} md={6} sm={12} xs={12}>
                        <Card style={{ width: '18rem', marginTop: '20px', height: '250px', backgroundColor: '#ccf5d3' }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'left' }}>Name: {elem.name}</Card.Title>
                                <Card.Text style={{ textAlign: 'left' }}>Description: {elem.desc}</Card.Text>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Dropdown as={ButtonGroup}>
                                        Status:
                                        <Button variant="success" style={{ backgroundColor: "#fd8082" }}>{elem.done ? 'Completed' : 'Not completed'}</Button>
                                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" style={{ backgroundColor: "#fd8082", borderColor: "fd8082" }} />
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1" onClick={() => doneHandler(index)}>Completed</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2" onClick={() => notDoneHandler(index)}>Not Completed</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div style={{ marginTop: '50px', float: 'right' }}>
                                    <Button variant="primary" style={{ backgroundColor: '#13ad89', marginRight: '10px' }} onClick={() => handleShow(index)}>Edit</Button>
                                    <Button variant="danger" onClick={() => dltHandlerComp(index)} style={{ backgroundColor: '#d05e1f' }}>Delete</Button>
                                </div>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update the todo list</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Todo name"
                                            value={updName}
                                            onChange={(e) => { setUpdName(e.target.value) }}
                                            style={{ borderColor: 'ccf5d3' }}
                                        />

                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Todo name"
                                            value={updDesc}
                                            onChange={(e) => { setUpdDesc(e.target.value) }}
                                            style={{ borderColor: 'ccf5d3' }}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => handleEdit(index)}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                            </Card.Body>
                        </Card>
                    </Col>
                ))) :


                    todoArr.map((elem, index) => (
                        <Col key={index} lg={4} md={6} sm={12} xs={12}>
                            <Card style={{ width: '18rem', marginTop: '20px', height: '250px', backgroundColor: '#ccf5d3' }}>
                                <Card.Body>
                                    <Card.Title style={{ textAlign: 'left' }}>Name: {elem.name}</Card.Title>
                                    <Card.Text style={{ textAlign: 'left' }}>Description: {elem.desc}</Card.Text>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Dropdown as={ButtonGroup}>
                                            Status:
                                            <Button variant="success" style={{ backgroundColor: "#fd8082" }}>{elem.done ? 'Completed' : 'Not completed'}</Button>
                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" style={{ backgroundColor: "#fd8082", borderColor: "fd8082" }} />
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1" onClick={() => doneHandler(index)}>Completed</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2" onClick={() => notDoneHandler(index)}>Not Completed</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div style={{ marginTop: '50px', float: 'right' }}>
                                        <Button variant="primary" style={{ backgroundColor: '#13ad89', marginRight: '10px' }} onClick={() => handleShow(index)}>Edit</Button>
                                        <Button variant="danger" onClick={() => dltHandler(index)} style={{ backgroundColor: '#d05e1f' }}>Delete</Button>
                                    </div>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Update the todo list</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Todo name"
                                                value={updName}
                                                onChange={(e) => { setUpdName(e.target.value) }}
                                                style={{ borderColor: 'ccf5d3' }}
                                            />

                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Todo name"
                                                value={updDesc}
                                                onChange={(e) => { setUpdDesc(e.target.value) }}
                                                style={{ borderColor: 'ccf5d3' }}
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={() => handleEdit(index)}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }

            </Row>
        </Container>
    )
}

export default TodoInput;
