import Button from '@mui/material/Button';

const userOptions = [
    {title: 'Homepage', path:'/Events'},
    {title: 'Live Slideshow', path:'/Events'},
    {title: 'Create Another Slide', path:'/Create'}
];

export default function getUserOptions() {
    // TODO: implement .map function
    // TODO: implement routing on buttons
    return <div>
        <Button variant='contained'>Homepage</Button>
        <Button variant='contained'>Live Slideshow</Button>
        <Button variant='contained'>Create another slide</Button>
    </div>;
}