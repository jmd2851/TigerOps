import './styles.css';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Slideshow from '../../components/Slideshow';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Events() {
    const settings = [
        {
            title: 'Create a Slide',
            description: 'Add a slide to the current slideshow deck',
            path: '/create',
        },
        {
            title: 'Edit Slideshow',
            description: 'Edit the current slideshow, toggle slide visibility, and more',
            path: '/edit',
        }
    ];

    return (
        <Page>
            <Slideshow />
            <PageHeader title="Slide Options and Settings" />
            <Stack direction={'row'} spacing={4}>
                {settings.map(setting => {
                    return (
                        <Link to={setting.path} className='settingsCardContainer'>
                            <Card variant='outlined' className='settingsCard'>
                                <CardContent>
                                    <Stack direction={'column'} spacing={2}>
                                        <Typography variant='h5'>{setting.title}</Typography>
                                        <Typography variant='body1'>{setting.description}</Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </Stack>
        </Page>
    )
}
