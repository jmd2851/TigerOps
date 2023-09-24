import logo from '../../assets/logo.png';
import './styles.css';

export default function Login() {
    return (
        <div className="loginPage">
            <img src={logo} className="App-logo" alt="St. Peter's Kitchen logo" />
            <div className="loginContainer">
                <div className="login">
                    <div className="header">
                        <p className="headerTitle">login</p>
                        <p className="bodyText">enter your email address and password to log in.</p>
                    </div>

                    <div className="input">
                        <label>email (x)</label>
                        <input type="text"></input>
                    </div>

                    <div className="input">
                        <label>password (x)</label>
                        <input type="text"></input>
                    </div>

                    <input type="submit"></input>
                </div>
                <div className="visitor">
                    <div className="header">
                        <p className="headerTitle">no account?</p>
                        <p className="bodyText">click here to view St. Peter's Kitchen's menu, news, reminders and events.</p>
                    </div>
                    
                    <button type="button"><a href="">continue as viewer</a></button>
                </div>
            </div>
        </div>
    )
}

//function to use login API