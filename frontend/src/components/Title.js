import './Title.css';

export default function Title(props) {
    return (
        <div className='headerTitleContainer'>
            <p className='headerTitle'>{props.title}</p>
        </div>
    )
}