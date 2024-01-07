import { useState, useEffect } from 'react';
import { Utilities } from '../index';
import { Outlet, useNavigate } from 'react-router-dom';

function Post() {
    const [data, setData] = useState<ToDosRequest[]>();
    const [isCompleted, setIsCompleted] = useState<boolean>(true);
    const [isloading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(data => setData(data))
            .finally(() => setIsLoading(false))
            .catch(reject => console.log(reject));;
    }, []);

    if (isloading) return <Utilities.Loading />;

    const handleDelete = (id: number) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        }).then(() => setData(data => data!.filter(item => item.id !== id)));
        navigate('/toDos');
    };

    return (
        <>
            <Utilities.ContentTitle title='Tasks' subTitle='Harmonize your day and maximize your productivity' />
            {data && <button className='clean-button blue-hover' onClick={() => { setIsCompleted(!isCompleted); navigate('/toDos') }}>Show completed</button> }
            {data && data.length ? data.filter((item) => item.completed !== isCompleted).map((item) => {
                return (item ?
                    <div className='blog-posts pure-g' key={item.id}>
                        <div className='pure-u-1 pure-u-md-1-2'>
                            <article className='blog-post'>
                                <div className='blog-post-title'>
                                    <span style={item.completed ? { color: 'green' } : { color: 'red' }}>{item.completed ? 'Completed' : 'Not completed'}</span>
                                    <span>
                                        <button className='clean-button action-button blue-hover' onClick={() => navigate(`/toDos/editToDo/${item.id}`)}>&#x270E;</button>
                                        <button className='clean-button action-button red-hover' onClick={() => handleDelete(item.id)}>&#x2717;</button>
                                    </span>
                                </div>
                                <p className='blog-post-date'>{item.title.toUpperCase()}</p>
                            </article>
                        </div>
                    </div>
                    : '');
            }) : <Utilities.ZeroState title='Hurray, You are very organized' />}
            <Utilities.AddButton navigateTo='/toDos/addtoDo' title='Task' />
            <Outlet />
        </>
    );
}

export default Post;
