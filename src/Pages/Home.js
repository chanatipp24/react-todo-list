import { useState, useEffect, useRef } from "react"
import { v1 as uuid } from "uuid";


export default function Home() {
    const [eid, setID] = useState("")
    const [locallist, setLocalList] = useState([])
    const [list, setTodoList] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});
    const ref = useRef(null);

    useEffect(() => {
        const data = window.localStorage.getItem('MY_TODO_LIST');
        // if (data !== null) setTodoList(JSON.parse(data));
        if (data !== null) {
            setLocalList(JSON.parse(data))
            setTodoList(JSON.parse(data))
        }
    }, []);

    useEffect(() => {
        // window.localStorage.setItem('MY_TODO_LIST', JSON.stringify(list));
        window.localStorage.setItem('MY_TODO_LIST', JSON.stringify(locallist));
    }, [locallist])

    let inputHandler = (e) => {
        // Handle text input filter then set data without setting to local storage
        var lowerCase = e.target.value.toLowerCase();
        const filteredData = locallist.filter((el) => {
            if (lowerCase === '') {
                return el;
            }
            else {
                return el.text.toLowerCase().includes(lowerCase)
            }
        })
        setTodoList(filteredData);
    };

    const handleUpdateClick = () => {
        const updatedItem = list.map((todo) => {
            return todo.id === currentTodo.id ? currentTodo : todo;
        });
        setIsEditing(false);
        setTodoList(updatedItem);
        setLocalList(updatedItem)
    }


    const handleEditClick = (item) => {
        setIsEditing(true);
        setID(item.id)
        setCurrentTodo({ ...item });
    }

    const onTodoChange = (e) => {
        setCurrentTodo({ ...currentTodo, text: e.target.value });
    }


    const submit = (e) => {
        e.preventDefault()
        const data = {
            "id": uuid(),
            "text": e.target.item.value,
            "status": "true"
        };
        ref.current.value = "";

        setTodoList([data, ...list])
        setLocalList([data, ...list])
    }

    const handleStatus = (id) => {
        const filteredItems = list.map(item => {
            item.id === id && (item.status = !item.status)
            return item
        })
        setTodoList(filteredItems)
        setLocalList(filteredItems)
    }

    const handleDelete = (id) => {
        const filteredItems = list.filter(i => i.id !== id);
        setTodoList(filteredItems)
        setLocalList(filteredItems)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>What to do</h1>
                    <form onSubmit={submit}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name="item" ref={ref} required />
                            <button className="btn btn-outline-secondary" type="submit" id="submit">Add new</button>
                        </div>
                    </form>
                    <br />
                </div>
            </div>

            <h1>To do list</h1>
            <div className="row">
                <div className="col-6 mb-2">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            onChange={inputHandler}
                        />
                    </form>
                </div>
            </div>
            <div className="todo-list">
                <ul className="list-unstyled list-group ">
                    {list.map((item, i) => (
                        <li key={i} className="unstyled list-group-item mb-2" style={{ textAlign: 'left' }}>
                            <div className="row">
                                <div className="col-12 col-lg-6 fs-3 text-break" style={{ ...(!item.status ? { textDecoration: 'line-through' } : {}) }}>
                                    {(eid == item.id && isEditing
                                        ? <div className="mb-3"><input type="text" className="form-control" value={currentTodo.text} onChange={e => onTodoChange(e)} /></div>
                                        : <p className="fs-1">{item.text}</p>
                                    )}
                                </div>
                                <div className="col-12 col-lg-6 btn-group">
                                    <button className={"btn " + (item.status == false ? "btn-success" : "btn-secondary")} onClick={() => handleStatus(item.id)} >{item.status == false ? "Complete" : "Pending"}</button>
                                    <button className={"btn " + (eid == item.id && isEditing ? "btn-warning" : "btn-primary")}
                                        onClick={(!isEditing ? () => handleEditClick(item) : () => handleUpdateClick())}
                                        disabled={!item.status}>
                                        {(eid == item.id && isEditing ? "Update" : "Edit")}
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}