import { useState, useEffect } from 'react';
import { Utilities } from '../index';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

function Photos() {
    const { albumId } = useParams();
    const [data, setData] = useState<PhotosRequest[]>();
    const [isloading, setIsLoading] = useState<boolean>(true);
    const [onHover, setOnHover] = useState<boolean>(false);
    const [slide, setSlide] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(data => setData(data))
            .finally(() => setIsLoading(false))
            .catch(reject => console.log(reject));
    }, []);

    if (isloading) return <Utilities.Loading />;

    const handleDelete = (id: number) => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
            method: 'DELETE',
        }).then(() => setData(data => data!.filter(item => item.id !== id)));
        navigate(`/photos/${albumId}`);
    }

    return (
        <>
            <Utilities.ContentTitle title='Photos' subTitle='Explore the World Through Objective Lens' />
            <article className='blog-header pure-g'>
                {data && data.filter((item) => item.albumId === Number(albumId)).map((item, index) => {
                    return (item && index === slide ?
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
                                flexWrap: 'wrap',
                                filter: `brightness(${onHover ? .5 : 1})`,
                            }} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
                                <button className='clean-button action-button' onClick={() => setSlide((slideIndex) => (slideIndex <= 1) ? slideIndex = 1 : slideIndex - 1)} disabled={!data[slide - 1]}>&#10093;</button>
                                <div style={{ opacity: onHover ? 1 : 0 }} >
                                    <button className='clean-button action-button blue-hover' onClick={() => navigate(`/photos/${albumId}/editphoto/${item!.id}`)}>&#x270E;</button>
                                    <button className='clean-button action-button red-hover' onClick={() => handleDelete(item.id)}>&#x2717;</button>
                                </div>
                                <button className='clean-button action-button' onClick={() => setSlide((slideIndex) => (slideIndex > data.length) ? slideIndex = data.length : slideIndex + 1)} disabled={!data[slide + 1]}>&#10092;</button>
                                {onHover && <div style={{
                                    position: 'absolute',
                                    bottom: 20, color: 'white'
                                }}>{item.title}</div>}
                            </div>
                        </div>
                        : '')
                })}


            </article >
            <Utilities.AddButton navigateTo={`/photos/${albumId}/addphoto`} title='Add photo' />
            <Outlet />
        </>
    );
}

export default Photos;
