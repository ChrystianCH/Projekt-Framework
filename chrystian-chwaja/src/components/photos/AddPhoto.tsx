import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddPhoto() {
    const [newPhoto, setNewPhoto] = useState<PhotosRequest>({ id: 0, title: '', url: '', albumId: 0 });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPhoto((prevPost) => { return { ...prevPost, [name]: value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/photos', {
            method: 'POST',
            body: JSON.stringify({
                title: newPhoto.title,
                url: newPhoto.url,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        navigate('/photos');
    };

    return (
        <div className='new-post'>
            <div className='new-post-header'>
                <span>New Photo</span>
                <button className='action-button red-hover clean-button' onClick={() => navigate(-1)}>&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className='new-post-form'>
                <input placeholder='Title' name='title' onChange={handleChange} className='add-input'/>
                <textarea cols={30} rows={10} placeholder='Photo url' name='url' onChange={handleChange} className='add-textarea'></textarea>
                <button className='clean-button create-button blue-hover' type='submit'>Create</button>
            </form>
        </div>
    );
}

export default AddPhoto;
