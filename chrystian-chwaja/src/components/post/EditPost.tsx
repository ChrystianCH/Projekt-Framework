import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Utilities } from "../index";

function EditPost() {
    const [newPost, setNewPost] = useState<PostsRequest>({ id: 0, title: '', body: '' });
    const [isloading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${Number(window.location.href.slice(-1))}`)
            .then(res => res.json())
            .then(data => setNewPost({ id: data.id, title: data.title, body: data.body}))
            .finally(() => setIsLoading(false));
    }, []);

    if (isloading) return <Utilities.Loading />;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost((prevPost) => { return { ...prevPost, [name]: value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/posts/${newPost.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: newPost.id,
                title: newPost.title,
                body: newPost.body,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        navigate('/posts');
    };

    return (
        <div className="new-post">
            <div className="new-post-header">
                <span>New Post</span>
                <button className="action-button delete-button" onClick={() => navigate('/posts')}>&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className="new-post-form">
                <input placeholder="Title" name="title" onChange={handleChange} className="add-input" value={newPost.title}></input>
                <textarea cols={30} rows={10} placeholder="Description" name="body" onChange={handleChange} className="add-textarea"  value={newPost.body}></textarea>
                <button className="add-button create-button" type="submit">Create</button>
            </form>
        </div>
    );
}

export default EditPost;
