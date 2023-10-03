import './App.css';
import './assets/colors.css';
import './assets/fonts.css';

import Login from './pages/login/login';
import Events from './pages/events/events';

function App() {
  return (
    <div className="appContainer">
      <Login />
      {/* <Events /> */}
    </div>
  );
}

export default App;