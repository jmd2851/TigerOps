import './Slide.css';

export default function Slide(props) {
    return (
        <div className='slide' style={{backgroundColor: props.bg}}>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
    )
}