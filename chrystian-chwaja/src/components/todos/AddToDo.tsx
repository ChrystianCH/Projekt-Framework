import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddToDo() {
    const [newToDo, setNewToDo] = useState<ToDosRequest>({ id: 0, title: '', completed: false });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewToDo((prevToDo) => { return { ...prevToDo, [name]: value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                title: newToDo.title,
                completed: newToDo.completed,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        navigate('/todos');
    };

    return (
        <div className='new-post'>
            <div className='new-post-header'>
                <span>New Task</span>
                <button className='action-button red-hover clean-button' onClick={() => navigate('/todos')}>&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className='new-post-form'>
                <textarea cols={30} rows={10} placeholder='Description' name='title' onChange={handleChange} className='add-textarea' value={newToDo.title}></textarea>
                <button className='clean-button create-button blue-hover' type='submit'>Create</button>
            </form>
        </div>
    );
}

export default AddToDo;
