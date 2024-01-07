import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function AddComment() {
    const { postId } = useParams();
    const [newComment, setNewComment] = useState<CommentsRequest>({ id: 0, body: '', email: '', name: '', postId: Number(postId)});
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewComment((prevComment) => { return { ...prevComment, [name]: value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/comments', {
            method: 'POST',
            body: JSON.stringify({
                name: newComment.name,
                body: newComment.body,
                postId: newComment.postId,
                email: window.localStorage.getItem('token'),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        navigate(`/comments/${newComment.postId}`);
    };

    return (
        <div className='new-post'>
            <div className='new-post-header'>
                <span>New Commment</span>
                <button className='action-button red-hover clean-button' onClick={() => navigate(-1)}>&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className='new-post-form'>
                <input placeholder='Name' name='name' onChange={handleChange} className='add-input'/>
                <textarea cols={30} rows={10} placeholder='Description' name='body' onChange={handleChange} className='add-textarea'></textarea>
                <button className='clean-button create-button blue-hover' type='submit'>Create</button>
            </form>
        </div>
    );
}

export default AddComment;
