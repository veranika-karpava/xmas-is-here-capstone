import './Header.scss';
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import ginger from '../../assets/images/ginger4.png';
import gingerhouse from '../../assets/images/house.png';
import gift from '../../assets/images/gift1.png';
import Tooltip from "@material-ui/core/Tooltip";


const Header = () => {
    const { pathname } = useLocation();
    const history = useHistory();

    // clickHandler for log out icon
    const logOutHandler = () => {
        sessionStorage.clear();
        history.push('/');
    }

    return (
        <header className='header'>
            <Link to='/' className='header__link'>
                <h1 className='header__logo'>Xmas is here...</h1>
            </Link>
            <div className='header__icon-container'>
                {pathname === '/' || pathname === '/signin' ? (
                    <Tooltip title='Sign In' placement='bottom'>
                        <Link to='/signin'>
                            <img className='header__login-icon' src={ginger} alt="logIn icon" />
                        </Link>
                    </Tooltip>
                ) : (
                    <>
                        <Tooltip title='Dashboard' placement='bottom'>
                            <Link to='/dashboard'>
                                <img className='header__home-icon' src={gingerhouse} alt="Home icon" />
                            </Link>
                        </Tooltip>
                        <Tooltip title='Wishlist' placement='bottom'>
                            <Link to='/wishlist'>
                                <img className='header__home-icon' src={gift} alt="Home icon" />
                            </Link>
                        </Tooltip>
                        <Tooltip title='Log Out' placement='bottom'>
                            <img className='header__login-icon' src={ginger} alt="logOut icon" onClick={logOutHandler} />
                        </Tooltip>
                    </>
                )
                }
            </div>
        </header>
    );
};
export default Header;
