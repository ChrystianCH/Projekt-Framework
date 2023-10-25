import React, { useEffect, useState } from "react";

type AlbumRequest = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumNailUrl?: string,
}
// type PostRequest = {
//     userId: number,
//     id: number,
//     title: string,
//     body: string,
// }

function Content(props: any) {

    const [data, setData] = useState<AlbumRequest>(null!);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(res => res.json())
                .then(data => setData(data))
                    .finally(() => setLoading(false));
    }, [])

    return (<div className="border">
        <section className="content">
            {loading ? <span>Loading...</span> : <img src={data.url} className="content--img" alt="123"></img>}
            <div className="content--text">
                <div className="content--local">
                    <i className="fa fa-map-marker"></i>
                    <span>Location</span>
                    <a href="https://google.com">View on Google maps</a>
                </div>
                <h1 className="content--title">Title</h1>
                <div className="content--description">
                    <p className="date-content">
                        StartDate - EndDate
                    </p>
                    <p className="content--depiction">Description</p>
                </div>
            </div>
        </section>
    </div>)
};
export default Content;