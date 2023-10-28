import React from "react";

function Navbar(props: {title: string, icon?: string}) {
    return (
        <nav className="navbar">
            <i className={props.icon ? props.icon : undefined}>
            </i>
            <h1>{props.title}</h1>
        </nav>
    )
}
export default Navbar;