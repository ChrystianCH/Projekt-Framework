import { useState, useEffect } from 'react';
import { Utilities } from '../index';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Album() {
    const [data, setData] = useState<AlbumsRequest[]>();
    const [isloading, setIsLoading] = useState<boolean>(true);
    const [photos, setPhotos] = useState<PhotosRequest[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(reject => console.log(reject));
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(data => setPhotos(data))
            .finally(() => setIsLoading(false))
            .catch(reject => console.log(reject));
    }, []);

    if (isloading) return <Utilities.Loading />;

    const handleDelete = (id: number) => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
            method: 'DELETE',
        }).then(() => setData(data => data!.filter(item => item.id !== id)));
        navigate('/albums');
    }
    return (
        <>
            <Utilities.ContentTitle title='Albums' subTitle='Echoes of Moments, Unforgettable' />
            <div style={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'space-around',
            }}
            >
                {data && data.length ? data.map((item) => {
                    return (item ?
                        <div className="pure-u-1-4" style={{ border: '1px solid black', marginBottom: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={item.id} >
                            <div style={{ height: 160, width: 190, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center' }}>{photos && photos.filter(photo => photo.albumId === item.id).map((photo) => (photo ? <img key={photo.id} src={photo.url} height={20} width={20}></img> : <Utilities.ZeroState title='No Content' />))}</div>
                            <div>
                                <div className='clean-button blue-hover'style={{ overflow: 'hidden', textOverflow: 'clip', whiteSpace: 'nowrap', width: 170 }} onClick={() =>  navigate(`/photos/${item.id}`)}>
                                    {item.title}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-around'
                                }}>
                                    <button className='clean-button blue-hover' onClick={() => navigate(`/albums/editalbum/${item.id}`)}>Edit</button>
                                    <button className='clean-button red-hover' onClick={() => handleDelete(item.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                        : <Utilities.ZeroState title='No Content' />);
                }) : <Utilities.ZeroState title='Hurray, You are not attention seeker' />}
            </div>
            <Utilities.AddButton navigateTo='/albums/addalbum' title='Add Album' />
            <Outlet />
        </>
    );
}

export default Album;
