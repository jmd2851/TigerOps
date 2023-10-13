import './styles.css';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Slideshow from '../../components/Slideshow';
import Navigation from '../../components/navigation.js';

export default function Events() {
    return (
        <div className='eventContainer'>
            <Navigation/>
        <Page>
            
            <PageHeader title="Weekly Events" />
            <Slideshow />
        </Page>
        </div>
    )
}