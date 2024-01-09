import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Utilities } from '../index';

function Login() {
    const [emails, setEmails] = useState<UsersRequest[]>([]);
    const [isloading, setIsLoading] = useState<boolean>(true);
    const [logged, setLogged] = useState<boolean>(false);
    const [login, setLogin] = useState<string>('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setEmails(data)).finally(() => setIsLoading(false));
    }, []);

    if (isloading) return <Utilities.Loading />;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        for (const item of emails) {
            if (login === item.email) { window.localStorage.setItem('token', login); return setLogged(true)};
        }
    }

    return (!logged ?
        <div className='blog-posts pure-g'>
            <div className='pure-u-1 pure-u-md-1-2'>
                <article className='blog-post'>
                    <Utilities.ContentTitle title='Welcome to Personal Blog' subTitle='Sign in and share thoughts on various topics' />
                    <div className='forms-container'>
                        <form className='pure-form pure-form-stacked form' onSubmit={handleSubmit}>
                            <div className='pure-u-1 pure-u-md-1-3'>
                                <label htmlFor='multi-email'>@Email</label>
                                <input type='text' id='multi-email' onChange={handleChange} />
                            </div>
                            <button type='submit' className='clean-button blue-hover'>Sign in</button>
                        </form>
                    </div>
                </article>
            </div>
        </div>
        : <Navigate to='/posts' />
    );
}

export default Login;
