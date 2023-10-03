import logo from '../../assets/images/logo.png';
import './styles.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Page from '../../components/Page';
import Title from '../../components/Title';

export default function Login() {
    return (
        <Page>
            <img src={logo} className="App-logo" alt="St. Peter's Kitchen logo" />
            <div className="loginContainer">
                <div className="login">
                    <div className="header">
                        <Title text="login" />
                        <p className="bodyText">enter your email address and password to log in.</p>
                    </div>

                    <div className='inputs'>
                        <TextField fullWidth id="standard-basic" label="Email" variant="filled" margin="normal" />
                        <TextField fullWidth id="standard-basic" label="Password" variant="filled" margin="normal" />
                    </div>

                    <div className='forgotPasswordContainer'>
                        <p className='subtitle'>Forgot password?</p>
                    </div>

                    <div className='loginButtonContainer'>
                        <Button variant="contained">submit</Button>
                    </div>
                </div>

                <div className="visitor">
                    <div className="header">
                        <p className="headerTitle">no account?</p>
                        <p className="bodyText">click here to view St. Peter's Kitchen's menu, news, reminders and events.</p>
                    </div>
                    
                    <div className='visitorButtonContainer'>
                        <Button fullWidth variant="contained" >continue as viewer</Button>
                    </div>
                </div>
            </div>
        </Page>
    )
}

//function to use login API