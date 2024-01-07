import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddAlbum() {
    const [newAlbum, setNewAlbum] = useState<AlbumsRequest>({ id: 0, title: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewAlbum((prevAlbum) => { return { ...prevAlbum, [name]: value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/albums', {
            method: 'POST',
            body: JSON.stringify({
                title: newAlbum.title,
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
                <span>New Album</span>
                <button className='action-button red-hover clean-button' onClick={() => navigate(-1)}>&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className='new-post-form'>
                <input placeholder='Album' className='add-input' disabled/>
                <textarea cols={30} rows={10} placeholder='Title' name='title' onChange={handleChange} className='add-textarea'></textarea>
                <button className='clean-button create-button blue-hover' type='submit'>Create</button>
            </form>
        </div>
    );
}

export default AddAlbum;
