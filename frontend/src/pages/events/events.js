import './styles.css';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Slideshow from '../../components/Slideshow';

export default function Events() {
    return (
        <Page>
            <PageHeader title="Weekly Events" />
            <Slideshow />
        </Page>
    )
}