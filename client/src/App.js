import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashbordPage/DashboardPage';
import MovieAdventCalendar from './pages/MovieAdventCalendar/MovieAdventCalendar';
import MovieCard from './components/MovieCard/MovieCard';
import WishListPage from './pages/WishListPage/WishListPage';
import Footer from './components/Footer/Footer';
import Snowfall from 'react-snowfall';

console.log('API_URL', process.env.REACT_APP_API_URL);
console.log('API_KEY', process.env.REACT_APP_API_KEY_OMBD);

const App = () => {

  return (
    <BrowserRouter>
      <Snowfall snowflakeCount={100} color="white" />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" component={HomePage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route exact path="/movies-calendar" component={MovieAdventCalendar} />
        <Route path="/movies-calendar/movie" component={MovieCard} />
        <Route path="/wishlist" component={WishListPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


