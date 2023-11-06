import './styles.css';
import Page from '../../components/Page';
import { Box, Card, Divider, Paper, Stack, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import { Link } from 'react-router-dom';

function pair(label,info) {
    return (
        <Stack direction="column" spacing={0}>
            <Typography variant='h7' sx={{textTransform:'capitalize', fontWeight:'bold'}}>{label}</Typography>
            <Typography variant='h7'>{info}</Typography>
        </Stack>
    )
}


export default function Information() {
    return (
        <Page title="Information" subtitle="Useful information regarding St. Peter's Kitchen and miscellaneous details about this website">

            <Stack direction="column" spacing={6} sx={{paddingBottom:'80px'}}>
                {/* TODO: reusable infoCard component */}
                {/* TODO: contact form */}
                {/* TODO: make this a slideshow of pictures to mimic their website, enhance cohesiveness with their brand */}
                <Paper elevation={3} className='infoCard imageCard buildingImg'>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h3">Come visit us at our location!</Typography>
                        <Stack direction="column" spacing={0}>
                            <Typography variant='h5'>681 Brown Street Rochester, NY 14611</Typography>
                            <Typography variant="subtitle1">Our entrance is in the back of the building.</Typography>
                        </Stack>
                    </Stack>
                </Paper>


                <Paper elevation={3} className='infoCard'>
                    <Stack direction="row" spacing={5} sx={{minHeight:'400px'}}>
                        <Stack direction="column" spacing={0} sx={{width:'50%'}}>
                            <PageHeader title="Contact" subtitle="Want to get in touch with St. Peter's Kitchen?"/>
                            <Divider />
                            <div className='content'>    
                                <Stack direction="column" spacing={2}>
                                    {pair("phone","585-235-6511")}
                                    {pair("email","info@stpeterskitchen.org")}
                                    {pair("mailing address","PO BOX 11031 Rochester, NY 14611")}
                                    {pair("business hours","Monday through Friday, 8:30 AM — 2:00 PM")}
                                </Stack>
                            </div>    
                        </Stack> 

                        <Card sx={{width:'50%'}} className='imageCard kitchenImg'>
                        </Card>
                    </Stack>
                </Paper>


                <Paper elevation={3} className='infoCard'>
                    <Stack direction="row" spacing={5} sx={{minHeight:'400px'}}>
                        <Stack direction="column" spacing={0} sx={{width:'100%'}}>
                            <PageHeader title="Documentation" subtitle="Looking for more information?"/>
                            <Divider />
                            <div className='content'>    
                                <Typography variant="h7">Click <Link sx={{fontWeight:'black'}}><a href="https://github.com/jmd2851/TigerOps" style={{textDecoration:'underline'}}>this link</a></Link> to access this application's documentation.</Typography>
                            </div>
                        </Stack> 
                    </Stack>
                </Paper>
            </Stack>
        </Page>
    )
}