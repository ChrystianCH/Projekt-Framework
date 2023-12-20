import { useState, useEffect } from 'react';
import { Utilities } from '../index';
import { Outlet, useNavigate } from 'react-router-dom';

function Photos() {
    const [data, setData] = useState<PhotosRequest[]>();
    const [isloading, setIsLoading] = useState<boolean>(true);
    const [slide, setSlide] = useState<number>(1);
    const [onHover, setOnHover] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(data => setData(data))
            .finally(() => setIsLoading(false));
    }, []);

    if (isloading) return <Utilities.Loading />;

    const item = (data && data.length) && data.find((item) => item.id === slide);

    const handleDelete = (id: number) => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
            method: 'DELETE',
        }).then(() => setData(data => data!.filter(item => item.id !== id)));
        navigate('/photos');
        setSlide((value) => (value > data!.length) ? value = data!.length : value + 1)
    }

    return (
        <>
            <Utilities.ContentTitle title='Photos' subTitle='Explore the World Through Objective Lens' />
            <article className='blog-header pure-g'>
                {item ?
                    <div className='pure-u-1 forms-container' key={item.id} >
                        <div className='blog-subtitle' style={{
                            backgroundImage: `url(${item.url})`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: 300,
                            height: 300,
                            alignItems: 'center',
                            backgroundSize: 'cover',
                            borderRadius: 5,
                            filter: `brightness(${onHover ? .5 : 1})`,
                        }} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
                            {data[item.id - 1] &&
                                <button className='clean-button action-button' onClick={() => setSlide((value) => (value <= 1) ? value = 1 : value - 1)}>&#10093;</button>
                            }
                            <div style={{ opacity: onHover ? 1 : 0 }} >
                                <button className='clean-button action-button blue-hover' onClick={() => navigate(`/photos/editphoto/${item.id}`)}>&#x270E;</button>
                                <button className='clean-button action-button red-hover' onClick={() => handleDelete(item.id)}>&#x2717;</button>
                            </div>
                            <button className='clean-button action-button' onClick={() => setSlide((value) => (value > data.length) ? value = data.length : value + 1)}>&#10092;</button>
                        </div>
                    </div>
                    : <Utilities.ZeroState title='Hurray, You are not attention seeker' />
                }
            </article >
            <Utilities.AddButton navigateTo='/photos/addphoto' title='Add photo' />
            <Outlet />
        </>
    );
}

export default Photos;
