import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utilities } from '../index';

function EditPost() {
    const [editToDo, setEditToDo] = useState<ToDosRequest>({ id: 0, title: '', completed: false });
    const [isloading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${Number(window.location.href.slice(-1))}`)
            .then(res => res.json())
            .then(data => setEditToDo({ id: data.id, title: data.title, completed: data.completed }))
            .finally(() => setIsLoading(false));
    }, [window.location.href.slice(-1)]);

    if (isloading) return <Utilities.Loading />;

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setEditToDo((prevToDo) => { return { ...prevToDo, [name]: type === 'checkbox' ? checked : value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/todos/${editToDo.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: editToDo.id,
                title: editToDo.title,
                completed: editToDo.completed,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        navigate('/toDos');
    };

    return (
        <div className='new-post'>
            <div className='new-post-header'>
                <span>Edit Task</span>
                <button className='clean-button action-button red-hover' onClick={() => navigate('/toDos')}>&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className='new-post-form'>
                <label htmlFor="default-remember">
                    <input type="checkbox" id="default-remember" name='completed' onChange={handleChange} checked={editToDo.completed} /> Done
                </label>
                <textarea cols={30} rows={10} name='title' onChange={handleChange} className='add-textarea' value={editToDo.title}></textarea>
                <button className='clean-button create-button blue-hover' type='submit'>Change</button>
            </form>
        </div>
    );
}

export default EditPost;
