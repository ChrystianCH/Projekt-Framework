import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utilities } from '../index';

function EditComment() {
    const [editComment, setEditComment] = useState<CommentsRequest>({ id: 0, name: '', body: '', postId: 0, email: '' });
    const [isloading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments/${Number(window.location.href.slice(-1))}`)
            .then(res => res.json())
            .then(data => setEditComment({ id: data.id, name: data.name, body: data.body, postId: data.postId, email: data.email }))
            .finally(() => setIsLoading(false));
    }, [window.location.href.slice(-1)]);

    if (isloading) return <Utilities.Loading />;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditComment((prevComment) => { return { ...prevComment, [name]: value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/comments/${editComment.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: editComment.id,
                name: editComment.name,
                body: editComment.body,
                postId: editComment.postId,
                email: window.localStorage.getItem('token'),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        navigate(`/comments/${editComment.postId}`);
    };

    return (
        <div className='new-post'>
            <div className='new-post-header'>
                <span>Edit Comment</span>
                <button className='clean-button action-button red-hover' onClick={() => navigate(`/comments/${editComment.postId}`)}>&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className='new-post-form'>
                <input name='name' onChange={handleChange} className='add-input' value={editComment.name} />
                <textarea cols={30} rows={10} name='body' onChange={handleChange} className='add-textarea' value={editComment.body}></textarea>
                <button className='clean-button create-button blue-hover' type='submit'>Change</button>
            </form>
        </div>
    );
}

export default EditComment;
