import '../Styles/App.css';

import { Link } from 'react-router-dom';
import Logo_Indeed from '../images_logos/indeed_logo.svg'
import Logo_LinkedIn from '../images_logos/linkedIn.svg'

function App() {

  return (
    <div className="App">
      
      <div>
            <nav>
                <Link>HOME</Link>
                <ul>
                    <li><Link to={""}>NEW APPLICATION</Link></li>
                    <li><Link to={""}>MY APPLICATIONS</Link></li>
                    <li><Link to={""}>EXPORT DATA</Link></li>
                    <li><Link to={""}>CALENDAR</Link></li>
                </ul>
                <a href="https://ch.indeed.com/">{Logo_Indeed}</a>
                <a href="https://www.linkedin.com/">{Logo_LinkedIn}</a>
            </nav>
      </div>
    </div>
  );
}

export default App;
