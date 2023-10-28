import React from "react";

function Content(props: any) {
    const { loading, url } = props;

    return (<div className="border">
        <section className="content">
            {loading ? <span>Loading...</span> : <img src={url} className="content--img" alt="123"></img>}
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