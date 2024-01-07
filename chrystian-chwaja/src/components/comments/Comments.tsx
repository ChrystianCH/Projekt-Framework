import { useState, useEffect } from 'react';
import { Utilities } from '../index';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

function Comments() {
    const [data, setData] = useState<CommentsRequest[]>();
    const [isloading, setIsLoading] = useState<boolean>(true);
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(data => setData(data))
            .finally(() => setIsLoading(false))
            .catch(reject => console.log(reject));
    }, []);

    if (isloading) return <Utilities.Loading />;

    const handleDelete = (id: number) => {
        fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
            method: 'DELETE',
        }).then(() => setData(data => data!.filter(item => item.id !== id)));
        navigate(`/comments/${window.location.href.slice(-1)}`);
    }

    return (
        <>
            <Utilities.ContentTitle title='Comments' subTitle='Speak Up, Shine Bright! Share Your Wisdom Here.' />
            {data && data.length ? data.filter((item) => item.postId === Number(postId)).map((item) => {
                return (item ?
                    <div className='blog-posts pure-g' key={item.id}>
                        <div className='pure-u-1 pure-u-md-1-2'>
                            <article className='blog-post'>
                                <div className='blog-post-title'>
                                    <span>Commented {item.email}</span>
                                    <span>
                                        <button className='clean-button action-button blue-hover' onClick={() => navigate(`/comments/${item.postId}/editcomment/${item.id}`)}>&#x270E;</button>
                                        <button className='clean-button action-button red-hover' onClick={() => handleDelete(item.id)}>&#x2717;</button>
                                    </span>
                                </div>
                                <p className='blog-post-date'>{item.name.toUpperCase()}</p>
                                <p className='blog-post-content'>
                                    {item.body}
                                </p>
                            </article>
                        </div>
                    </div>
                    : '');
            }) : <Utilities.ZeroState title='Hurray, You are not attention seeker' />}

            <Utilities.AddButton navigateTo={`/comments/${window.location.href.slice(-1)}/addcomment`} title='Add comment' />
            <Outlet />
        </>
    );
}


export default Comments;
