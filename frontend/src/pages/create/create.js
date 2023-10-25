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

export default function Create() {
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
    useEffect(() => {
    }, [page]);
    
    function nextPage() { page===7 ? setPage(7) : setPage(page+1); } //max limit of 7 pages
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
            <Stack direction={'row'} spacing={2}>
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

    const formPageTitles = ['pick a slide type', 'pick a layout', 'add content', 'slide preview', 'slide settings', 'final preview', 'slide created!'];

    // TODO: refactor
    function getFormPage(pageNumber) {
        switch (pageNumber) {
            case 1: return getSlideTypes();
            case 2: return getSlideLayouts();
            case 3: return getSlideOptions(slide.type);
            case 4: return (
                <Stack direction={'row'} spacing={2} sx={{backgroundColor:'lightgray'}}>
                    {/* this is the slide itself */}
                    <Stack ref={slideRef} sx={{height: '500px', backgroundColor: 'lightgray'}}>
                        <p>slide type: {slide.type}</p>
                        <p>layout option: {slide.layout}</p>
                        {/* <p>data: {slide.data.length}</p> */}
                    </Stack>
                </Stack>
            );
            case 5: return getSlideSettings();
            case 6: return <div>slide preview with settings</div>;
            case 7: return getUserOptions();
        }
    }

    return (
        <Page>
            <PageHeader title={formPageTitles[page-1]} showMenu={false} />
            <form action="" method="POST" className="formContainer">
                {/* TODO: breadcrumb - implement MUI linear progress component */}
                
                <Stack ref={pageRef} direction={'column'} spacing={2} sx={{textAlign: 'center'}}>
                    {getFormPage(page)} 
                </Stack>
                
                <div className='pageButtonContainer'>
                    <p>page {page}</p>
                    {/* TODO: check if there are values in the current page? yes- save into respective slide or event obj */}
                    <Button disabled={page===1 || page===7 ? true : false} variant="contained" onClick={previousPage}>previous</Button>
                    <Button id="nextButton" variant="contained" onClick={nextPage} disabled={page===7 ? true : false }>next</Button>
                </div>
            </form>
        </Page>
    )
}