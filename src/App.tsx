import {useState} from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));

  
  let onSignOut = () => {
    var user = localStorage.removeItem('currentUser')!;

    setCurrentUser(user)
  }

  return (
    <div className="App">
       {currentUser &&
        <div>
          Welcome <h1>{currentUser}</h1>
          <button
           onClick={() => onSignOut}>
            <Link to="/sign-in">
              Logout
            </Link>
          </button>
        </div>
      
    }
    </div>
  );
}

export default App;
