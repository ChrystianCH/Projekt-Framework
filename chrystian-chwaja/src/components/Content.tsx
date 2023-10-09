import React from "react";

function Content() {
    return (<div className="border">
        <section className="content">
            <img className="content--img">Image</img>
            <div className="content--text">
                <div className="content--local">
                    <i className="fa fa-map-marker"></i>
                    <span>Location</span>
                    <a href="#">View on Google maps</a>
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