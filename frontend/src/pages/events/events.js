import './styles.css';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Slideshow from '../../components/Slideshow';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
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
            description: 'Edit the current slideshow, delete a slide, toggle slide visibility, and more',
            path: '/edit',
        }
    ];

    // TODO: export as slideshow type constant
    const slideshowProps = {
        height:'600px',
        fullHeightHover:'true',
        navButtonsAlwaysVisible:'true',
        navButtonsAlwaysInvisible:'false',
        interval:'10000',
        animation:'slide',
        indicatorContainerProps:{style: {
            opacity:'1',
            paddingBottom:'8px',
            borderRadius:'10px',
        }}
    }

    return (
        <Page title="Live Slideshow" subtitle="This week's current Slideshow, featuring Menus and Events">
            <div className='slideshowContainer'>
                <Slideshow slideStyles={{borderRadius:'10px 10px 0 0'}} slideshowProps={slideshowProps}/>
            </div>
            
            <PageHeader title="Slide Customizations" subtitle="Various Slide options and settings" />
            <Stack direction={'row'} spacing={4}>
                {settings.map(setting => {
                    return (
                        <Link to={setting.path} className='settingsCardContainer'>
                            <Card className='settingsCard'>
                                <CardHeader title={setting.title} subheader={setting.description} />
                            </Card>
                        </Link>
                    )
                })}
            </Stack>
        </Page>
    )
}
