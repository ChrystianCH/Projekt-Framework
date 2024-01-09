import { useState, useEffect } from 'react';
import { Utilities } from '../index';
import { Outlet, useNavigate } from 'react-router-dom';

function Post() {
    const [posts, setPosts] = useState<PostsRequest[]>();
    const [comments, setComments] = useState<CommentsRequest[]>()
    const [isloading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(reject => console.log(reject));
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(data => setComments(data))
            .finally(() => setIsLoading(false))
            .catch(reject => console.log(reject));
    }, []);

    if (isloading) return <Utilities.Loading />;

    const handleDelete = (id: number) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        }).then(() => setPosts(data => data!.filter(item => item.id !== id)));
        navigate('/posts');
    }

    return (
        <>
            <Utilities.ContentTitle title='Posts' subTitle='Thoughts and musings on various topics' />
            {posts && posts.length ? posts.map((item) => {
                return (item ?
                    <div className='blog-posts pure-g' key={item.id}>
                        <div className='pure-u-1 pure-u-md-1-2'>
                            <article className='blog-post'>
                                <div className='blog-post-title'>
                                    <span>Post {item.id} {comments && <button className='clean-button blue-hover' onClick={() => navigate(`/comments/${item.id}`)} style={{ fontSize: 15 }}>({comments.filter((comment) => comment.postId === item.id).length}) Comments</button>}</span>
                                    <span>
                                        <button className='clean-button action-button blue-hover' onClick={() => navigate(`/posts/editpost/${item.id}`)}>&#x270E;</button>
                                        <button className='clean-button action-button red-hover' onClick={() => handleDelete(item.id)}>&#x2717;</button>
                                    </span>
                                </div>
                                <p className='blog-post-date'>{item.title.toUpperCase()}</p>
                                <p className='blog-post-content'>
                                    {item.body}
                                </p>
                            </article>
                        </div>
                    </div>
                    : <Utilities.ZeroState title='No Content' />);
            }) : <Utilities.ZeroState title='Hurray, You are not attention seeker' />}
            <Utilities.AddButton navigateTo='/posts/addpost' title='Add post' />
            <Outlet />
        </>
    );
}

export default Post;
