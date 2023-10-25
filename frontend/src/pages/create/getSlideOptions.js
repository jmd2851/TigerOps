import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';

// TODO: MUI date picker component
const menuOptions = ['date', 'menu items'];
const eventOptions = ['title', 'subtitle', 'label', 'description'];

export default function getSlideOptions(type) {
    let options = [];
    type==="event" ? options=eventOptions: options=menuOptions

    return (
       <Stack direction={'row'} spacing={2}>
            <Container sx={{backgroundColor:'lightgrey', height:'500px'}}>
                slide preview here
            </Container>
            
            <Stack direction={'column'} spacing={1}>
                {options.map(option => {
                    return (
                        <Stack direction={'row'} spacing={2}>
                            <label>{option}</label>
                            <input type='text'></input>
                        </Stack>
                    )
                })}
            </Stack>
       </Stack>
    );
}