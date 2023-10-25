import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';

//TODO: whitelist, automatic delete, tags
const settings = ['title','start date', 'end date'];

export default function getSlideSettings() {
    return (
        <Stack direction={'row'} spacing={2}>
            <Container sx={{backgroundColor:'lightgrey', height:'500px'}}>
                slide preview here
            </Container>
            
            <Stack direction={'column'} spacing={1}>
                {settings.map(setting => {
                    return (
                        <Stack direction={'row'} spacing={2}>
                            <label>{setting}</label>
                            <input type='text'></input>
                        </Stack>
                    )
                })}
            </Stack>
        </Stack>
    )
}