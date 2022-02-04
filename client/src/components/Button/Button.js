import './Button.scss';

const Button = ({ title, onClick, type, value }) => {
    return (
        <button className="button" onClick={onClick} type={type} value={value}>
            {title}
        </button>
    );
};

export default Button;