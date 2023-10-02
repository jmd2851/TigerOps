import logo from '../../assets/images/logo.png';
import './styles.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Login() {
    return (
        <div className="loginPage">
            <img src={logo} className="App-logo" alt="St. Peter's Kitchen logo" />
            <div className="loginContainer">
                <form action="" method="POST" onsubmit="" className="login">
                    <div className="header">
                        <p className="headerTitle">login</p>
                        <p className="bodyText">enter your email address and password to log in.</p>
                    </div>

                    <div className='inputs'>
                        <TextField fullWidth id="standard-basic" label="Email" variant="filled" margin="normal" />
                        <TextField type="password" fullWidth id="standard-basic" label="Password" variant="filled" margin="normal" />
                    </div>

                    <div className='forgotPasswordContainer'>
                        <p className='subtitle'><a href="">Forgot password?</a></p>
                    </div>

                    <div className='loginButtonContainer'>
                        <Button id="loginButton" variant="contained">submit</Button>
                    </div>
                </form>

                <div className="visitor">
                    <div className="header">
                        <p className="headerTitle">no account?</p>
                        <p className="bodyText">click the button underneath to view St. Peter's Kitchen's menu, news, reminders and events.</p>
                    </div>
                    
                    <div className='visitorButtonContainer'>
                        <Button fullWidth variant="contained" >continue as viewer</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

//function to use login API