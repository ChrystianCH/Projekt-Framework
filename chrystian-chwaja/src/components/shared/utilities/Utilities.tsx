
import { useNavigate } from "react-router-dom";

interface CustomStyles {
    zeroStateStyle: React.CSSProperties,
    addButtonStyle: React.CSSProperties,
}

const style: CustomStyles = {
    zeroStateStyle: {
        opacity: 0.2,
        textAlign: "center",
        padding: 20,
    },
    addButtonStyle: {
        position: 'fixed',
        bottom: 60,
        right: 100,
        opacity: 0.7,
        color: "gray",
        padding: 10,
        backgroundColor: 'rgb(251, 251, 251)',
        border: '0.1rem solid rgba(0,0,0,.1)',
        borderRadius: '0.4rem',
    }
}

function AddButton(props: { navigateTo: string, title: string }) {
    const navigate = useNavigate();
    return (<button style={style.addButtonStyle} onClick={() => navigate(props.navigateTo)}>&#x2b; {props.title}</button>)
}

function ContentTitle(props: { title: string, subTitle?: string }) {
    return (
        <header className="blog-header pure-g">
            <div className="pure-u-1">
                <h1 className="blog-title">
                    {props.title}
                </h1>
                <p className="blog-subtitle">
                    {props.subTitle}
                </p>
            </div>
        </header>
    );
}

function ZeroState(prop: { title: string }) {
    return <h1 style={style.zeroStateStyle}>{prop.title}</h1>
}

function Loading() {
    return (<header className="blog-header pure-g">
        <div className="pure-u-1">
            <h1 className="blog-title">
                Loading...
            </h1>
        </div>
    </header>);
}

export default { AddButton, ContentTitle, ZeroState, Loading }
