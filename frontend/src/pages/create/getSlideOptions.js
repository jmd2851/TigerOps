import Stack from '@mui/material/Stack';

// TODO: MUI date picker component
const menuOptions = ['date', 'menu items'];
const eventOptions = ['name', 'description', 'start date', 'end date'];

export default function getSlideOptions(type) {
    let options = [];
    type==="event" ? options=eventOptions: options=menuOptions

    return (
        <div>
            <p>slide type: {type}</p>
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
        </div>
    );
}