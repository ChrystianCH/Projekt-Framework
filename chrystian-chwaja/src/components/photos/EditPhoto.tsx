import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utilities } from '../index';

function EditPhoto() {
    const [editPost, setEditPost] = useState<PhotosRequest>({ id: 0, title: '', url: '', albumId: 0 });
    const [isloading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${Number(window.location.href.slice(-1))}`)
            .then(res => res.json())
            .then(data => setEditPost({ id: data.id, title: data.title, url: data.url, albumId: data.albumId }))
            .finally(() => setIsLoading(false));
    }, [window.location.href.slice(-1)]);

    if (isloading) return <Utilities.Loading />;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditPost((prevPost) => { return { ...prevPost, [name]: value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/photos/${editPost.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: editPost.id,
                title: editPost.title,
                url: editPost.url,
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
                <span>Edit Post</span>
                <button className='clean-button action-button red-hover' onClick={() => navigate(-1)}>&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className='new-post-form'>
                <input name='title' onChange={handleChange} className='add-input' value={editPost.title} />
                <textarea cols={30} rows={10} name='url' onChange={handleChange} className='add-textarea' value={editPost.url}></textarea>
                <button className='clean-button create-button blue-hover' type='submit'>Change</button>
            </form>
        </div>
    );
}

export default EditPhoto;
