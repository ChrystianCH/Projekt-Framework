import React from "react";

function Login() {
    const login = true;
    return (
        !login ?
            <>
                <nav className="navbar">
                    <h1>Login</h1>
                </nav>
                <div className="border">
                    <section className="content">
                        <div className="content--text">

                            <h1 className="content--title"><input placeholder="@Email" /></h1>
                            <div className="content--description">
                                <p className="date-content">
                                    <button>Sign in</button>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </> :( <> <span>
            <a href="/posts">
            <i></i>
            <span>Posts</span>
            </a>
            <a href="/comments">
            <i></i>
            <span>Comments</span>
            </a> 
            <a href="/albums">
            <i></i>
            <span>Albums</span>
            </a> 
            <a href="/photos">
            <i></i>
            <span>Photos</span>
            </a>
            <a href="/todos">
            <i></i>
            <span>To Do</span>
            </a>
            <a href="/users">
            <i></i>
            <span>Users</span>
            </a>
            </span>
            </>
            )
    )
}
export default Login;