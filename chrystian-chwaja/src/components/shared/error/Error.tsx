import { useRouteError } from 'react-router-dom';

const ErrorPageStyle: React.CSSProperties = {
    textAlign: 'center',
};

function ErrorPage() {
    const error = useRouteError() as CustomError;
    console.error(error);

    return (
        <div style={ErrorPageStyle}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;
