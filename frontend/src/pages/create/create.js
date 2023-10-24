import './styles.css';
import Button from '@mui/material/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { useEffect, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import getUserOptions from './getUserOptions';
import getSlideOptions from './getSlideOptions';

export default function Create() {
    const [pageRef, prevButtonRef] = [useRef(null),useRef(null)];

    //TODO: page -> currentPage
    const [page, setPage] = useState(1);
    const [slide, setSlide] = useState({
        type: "",
        layout: "",
        data: {
            //menu - menuItems, date
            //event - name, description, startDate, endDate
        },
    });
    
    //TODO: disable button for a certain amount of seconds so user cant spam the button...
    useEffect(() => {
    }, [page]);


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
                            console.log('set event.layout: ' +option);
                            nextPage({...slide, layout:option});
                        }}>{option}</Button>
                    )
                })}
            </Stack>
        )
    }
    
    function nextPage(slideProps) {
        //TODO: pages.length
        if (page===7) { //max limit on pages
            setPage(7);
        } 
        else {
            //TODO: validation
            setSlide(slideProps);
            setPage(page+1);
        }
    }

    function previousPage() {
        //TODO: check if there are values in the current page? yes- save into respective slide or event obj
        if(page===1) {
            setPage(1);
        } else {
            setPage(page-1);
        }
    }


    const formPageTitles = ['pick a slide type', 'pick a layout', 'add content', 'preview', 'slide settings', 'final preview', 'slide created!'];

    // TODO: refactor
    function getFormPage(pageNumber) {
        switch (pageNumber) {
            case 1: return (
                <Stack direction={'row'} spacing={2}>
                    <Button id="eventButton" variant="contained" className='formPageButton' onClick={ () => {
                        console.log('set slide.type:"event"');
                        nextPage({...slide,type:"event"});
                    }}>event</Button>
                    <Button id="menuButton" variant="contained" className='formPageButton' onClick={ () => {
                        console.log('set slide.type:"menu"');
                        nextPage({...slide,type:"menu"});
                    }}>menu</Button>
                </Stack>
                );
            case 2: return getSlideLayouts();
            case 3: return getSlideOptions(slide.type);
            case 4: return <div>silde preview with content</div>;
            case 5: return (
                <div className='settingsContainer'>
                    {/* TODO: implement slide settings */}
                    <Stack direction={'row'} spacing={2}>
                        <label>slide title</label>
                        <input type='text'></input>
                    </Stack>
                </div>
                );
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
                    <Button ref={prevButtonRef} disabled={page===1 || page===7 ? true : false} variant="contained" onClick={previousPage}>previous</Button>
                    <Button id="nextButton" variant="contained" onClick={nextPage} disabled={page===7 ? true : false }>next</Button>
                </div>
            </form>
        </Page>
    )
}