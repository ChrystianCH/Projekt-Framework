import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utilities } from '../index';

function EditAlbum() {
    const [editAlbum, setEditAlbum] = useState<AlbumsRequest>({ id: 0, title: '' });
    const [isloading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${Number(window.location.href.slice(-1))}`)
            .then(res => res.json())
            .then(data => setEditAlbum({ id: data.id, title: data.title }))
            .finally(() => setIsLoading(false))
    }, [window.location.href.slice(-1)]);

    if (isloading) return <Utilities.Loading />;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditAlbum((prevAlbum) => { return { ...prevAlbum, [name]: value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/posts/${editAlbum.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: editAlbum.id,
                title: editAlbum.title,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        navigate('/albums');
    };

    return (
        <div className='new-post'>
            <div className='new-post-header'>
                <span>Edit Album</span>
                <button className='clean-button action-button red-hover' onClick={() => navigate('/albums')}>&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className='new-post-form'>
                <input placeholder='Album' className='add-input' disabled />
                <textarea cols={30} rows={10} placeholder='Title' name='title' onChange={handleChange} className='add-textarea' value={editAlbum.title}></textarea>
                <button className='clean-button create-button blue-hover' type='submit'>Change</button>
            </form>
        </div>
    );
}

export default EditAlbum;
