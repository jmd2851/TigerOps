import ReactDOM from 'react-dom/client';
import './styles.css';


//neeed to get rid of the export defualt 
export default function Navigation() {
  return (
    <div classname = "nav"    
        style={{
            backgroundColor: '#51A46A',
            paddingRight: '2em',
            paddingLeft: '2em',
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '2em',
            paddingLeft: '2em',
            height: '100vh',
            flexGrow: '1',
            boxShadow: '0px 0px 5px .5px black',
        }}>
                <h1
                    style ={{
                        marginTop: '1em', 
                        
                    }}>Admin
                </h1>
                <div className='calendarOptions'>
                    <div classname='topOptions' 
                        style={{
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}>
                    <h2
                        style={{
                            fontWeight: '500'
                        }}>
                        Events
                    </h2>
                    </div>
                    <div classname='topOptions'>
                        <h2
                            style={{
                                fontWeight: '500'
                            }}>
                            Calendar Views
                        </h2>
                    </div>
                </div>
                <hr
                    style={{
                        border: '1.5px solid black',
                        width: '80%',
                        margin: '0em',
                        
                    }}/>
                    <div className='bottomOptions'>
                        <h2
                            style={{
                                fontWeight: '500'
                            }}>
                            Configuration
                        </h2>
                    </div>
                        <h2
                            style={{
                                    fontWeight: '500'
                                }}>
                            Help
                        </h2>
                    <div className='bottomOptions'>
                        <h2
                            style={{
                                        fontWeight: '500'
                                    }}>
                            Log Out
                        </h2>
                    </div>
    </div>
  );
}


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Navigation/>);