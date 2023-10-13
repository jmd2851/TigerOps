import './styles.css';
import Button from '@mui/material/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';

export default function Create() {
    return (
        <Page>
            <PageHeader title="Create Slide" />
            <div className='formContainer'>
                <form>
                    <div className='labelInput'>
                        <label>title</label>
                        <input type="text"/>
                    </div>

                    <div className='labelInput'>
                        <label>title</label>
                        <input type="text"/>
                    </div>

                    <div className='createButtonContainer'>
                        <Button id="createButton" variant="contained">create</Button>
                    </div>
                </form>
            </div>
        </Page>
    )
}