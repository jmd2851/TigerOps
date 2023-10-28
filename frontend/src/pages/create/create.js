import "./styles.css";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import Container from '@mui/material/Container';
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Create() {
    const [type, setType] = useState("");
    const [data, setData] = useState(null);
    const [options, setOptions] = useState([]);

    return (
        <Page>
            <PageHeader title="Create a Slide" />
            <form>
                <Stack direction={'column'} spacing={2}>
                    <Stack direction={'row'} spacing={2}>
                        <Typography variant="h5">type</Typography>
                        <Button variant="contained" onClick={() => {
                            console.log('slide.type = event');
                            setType("event");
                            setOptions(['title', 'description', 'start time', 'end time']);
                        }}>event</Button>
                        <Button variant="contained" onClick={() => {
                            console.log('slide.type = menu');
                            setType("menu");
                            setOptions(['date', 'label', 'description']);
                        }}>menu</Button>
                    </Stack>
                    {type===""? <></> : 
                        //render the menu/event options
                        options.map(option => {
                            return (
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant="h5">{option}</Typography>
                                    <TextField variant="outlined" size="small" />
                                </Stack>
                            )
                        })
                    }
                    <Button variant="contained" sx={{width:'40%'}}>submit</Button>
                </Stack>
            </form>
        </Page>
    )
}