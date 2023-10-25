import './styles.css';
import Button from '@mui/material/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { useEffect, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import getUserOptions from './getUserOptions';
import getSlideOptions from './getSlideOptions';
import getSlideSettings from './getSlideSettings';

// TODO: export into debugger dev package
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function Create() {
    // TODO: export into debugger dev package
    const [dev, setdev] = useState(false);

    const [pageRef, slideRef] = [useRef(null),useRef(null)];

    //TODO: page -> currentPage
    const [page, setPage] = useState(1);
    const [slide, setSlide] = useState({
        type: "",
        layout: "",
        data: {},
        //menu = [menuItems, date]
        //event = [name, description, startDate, endDate]
    });
    
    //TODO: disable button for a X seconds so user cant spam the button
    // TODO: fade animation on page change
    useEffect(() => {
    }, [page]);
    
    function nextPage() { page===6 ? setPage(6) : setPage(page+1); } //max limit of 6 pages
    function previousPage() { page===1 ? setPage(1) : setPage(page-1); }

    //TODO: hook up to backend
    function getSlideLayouts() {
        const menuLayouts = ['option1', 'option2', 'option3'];
        const eventLayouts = ['option1', 'option2', 'option3', 'option4'];

        let options = [];
        {slide.type==="event" ? options=eventLayouts : options=menuLayouts}

        return (
            <Stack direction={'row'} spacing={2}>
                {options.map(option => {
                    return (
                        <Button className="formPageButton" variant="contained" onClick={() => {
                            //TODO: validation
                            setSlide({...slide, layout: option});
                            console.log('set event.layout: ' +option);
                            nextPage();
                        }}>{option}</Button>
                    )
                })}
            </Stack>
        )
    }

    //TODO: hook up to backend
    function getSlideTypes() {
        const slideTypes = ['menu', 'event'];

        return (
            <Stack direction={'row'} spacing={1}>
                {slideTypes.map(slideType => {
                    return (
                        <Button variant="contained" className='formPageButton' onClick={ () => {
                            setSlide({...slide, type: slideType});
                            console.log("[set] slide.type = "+ slideType);
                            nextPage();
                        }}>{slideType}</Button>
                    );
                })}
            </Stack>
        )
    }

    const formPageTitles = ['pick a slide type', 'pick a layout', 'add some content', 'slide settings', 'final preview', 'slide created!'];

    // TODO: refactor
    function getFormPage(pageNumber) {
        switch (pageNumber) {
            case 1: return getSlideTypes();
            case 2: return getSlideLayouts();
            case 3: return getSlideOptions(slide.type);
            case 4: return getSlideSettings();
            case 5: return <div>slide preview with settings</div>;
            case 6: return getUserOptions();
        }
    }

    return (
        <Page>
            <div className='dev-container'>
                <div className='dev-pic'></div>
                <Container>
                    <Stack className='dev-settings' direction={'column'} spacing={2}>
                        <p className='dev-title'>dev settings</p>
                        <Button onClick={() => { setdev(!dev) } }>
                            <p className='dev-label' style={ dev ? {color:'orange'} : {color:'grey'}}>{dev? 'debugging' : '😴🏖️😎🌄🌴' }</p>
                        </Button>
                    </Stack>
                </Container>
            </div>

            <PageHeader title={formPageTitles[page-1]} showMenu={false} />
            <form action="" method="POST" className="formContainer">
                {/* TODO: breadcrumb - implement MUI linear progress component */}
                
                <Stack ref={pageRef} direction={'column'} spacing={2} sx={{textAlign: 'center'}}>
                    {getFormPage(page)} 
                </Stack>
                
                <div className='pageButtonContainer'>
                    {dev ? <p>page {page}</p> : <></>}
                    
                    {dev || page===2 || page===3 || page===4 || page===5 ? 
                        <Button variant="contained" disabled={page===1 || page===6 ? true : false} onClick={() =>{
                            // TODO: check if there are values in the current page
                            previousPage();
                        }}>previous</Button>
                    :
                        //dont show on page 1 and 6
                        <></>
                    }

                    {dev || page===3 || page===4 || page===5 ? 
                        <Button variant="contained" disabled={page===6 ? true : false } onClick={() => {
                            // TODO: input validation page3
                            nextPage();
                        }}>next</Button> 
                    : <></> }
                </div>
            </form>
        </Page>
    )
}