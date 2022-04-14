import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
// import { movies } from './components/getMovies';
import Favourite from './components/Favourite';
import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
   <Router>
     <Navbar/>
    <Switch>
 <Route path="/" exact render={(props)=>(
        <>
          <Banner {...props}/>
          <Movies {...props}/>

        </>

 )}/>
 <Route path="/favourites"  component={Favourite}/>
 </Switch>
  {/* <Banner/>
  <Movies/>
 <Favourite/> */}
   </Router>
  );
}

export default App;
