import './styles.css';
import Button from '@mui/material/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { useEffect, useRef, useState } from 'react';

export default function Create() {
    const [formPage1, formPage2, formPage3, formPage4, formPage5, formPage6, formPage7] = [useRef(null),useRef(null),useRef(null),useRef(null),useRef(null),useRef(null),useRef(null)];
    const pageRefs = [formPage1, formPage2, formPage3, formPage4, formPage5, formPage6, formPage7];
    
    const [pageRef, prevButtonRef] = [useRef(null),useRef(null)];
    const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(false);

    //TODO: page -> currentPage
    const [page, setPage] = useState(1);
    const [slide, setSlide] = useState({
        type: "",
        data: {},
    });

    const menu = {
        layout: "",
        menu: "",
        date: "",
    };

    const event = {
        layout: "",
        name: "",
        description: "",
        date: "",
        startDate: "",
        endDate: "",
    };
    
    //TODO: disable button for a certain amount of seconds so user cant spam the button...
    useEffect(() => {
        if(page===1) {
            //disable prev button
            setIsPrevButtonDisabled(true);
        } 
        if(page===7) {
            //hide the next button
            //hide the previous button
        }
        else {
            //enable prev button
            setIsPrevButtonDisabled(false);
        }
    }, [page]);


    //TODO: load possible menu layouts
    function getMenuLayouts() {
        return  (
            <div className='formPage' id="formPage3">
                <p>pick a layout</p>
                <div className="layoutContainer">
                    <Button variant="contained" onClick={() => {
                        console.log('menu slide - option1');
                        nextPage({...slide, layout:'option1'});
                    }}>option1</Button>
                    <Button variant="contained" onClick={() => {
                        console.log('menu slide - option2');
                        nextPage({...slide, layout:'option2'});
                    }}>option2</Button>
                    <Button variant="contained" onClick={() => {
                        console.log('menu slide - option3');
                        nextPage({...slide, layout:'option3'});
                    }}>option3</Button>
                    <Button variant="contained" onClick={() => {
                        console.log('menu slide - option4');
                        nextPage({...slide, layout:'option4'});
                    }}>option4</Button>
                </div>
            </div>
        );
    }

    //TODO: load possile event layouts
    function getEventLayouts() {
        return <p>event layout choices</p>;
    }

    
    function nextPage(slideProps) {
        //TODO: pages.length
        if (page===7) { //max limit on pages
            setPage(7);
        } 

        //TODO: validation
            //get page
            //is the data on this page filled out
            //is the data on this page valid
        
        if (slideProps) {
            setSlide(slideProps);
        }
        setPage(page+1);
    }

    function previousPage() {
        //TODO: check if there are values in the current page? yes- save into respective slide or event obj

        if(page===1) {
            setPage(1);
        } else {
            setPage(page-1);
        }
    }

    //TODO: export this helper function
    function formPage(pageNumber) {
        switch (pageNumber) {
            case 1: return (
                <div className='formPage' id="formPage1">
                    <p>pick a slide type</p>
                    <div className='radioButtonsContainer'>
                        <Button id="eventButton" variant="contained" onClick={ () => {
                            console.log('create event slide');
                            nextPage({...slide,type:"event"});
                        }}>event</Button>
                        <Button id="menuButton" variant="contained" onClick={ () => {
                            console.log('create menu slide');
                            nextPage({...slide,type:"menu"});
                        }}>menu</Button>
                    </div>
                </div>
                )
            case 2: return (
                <div className='formPage' id="formPage2">
                    {slide.type == "menu" ? getMenuLayouts() : <></>}
                    {slide.type == "event" ? getEventLayouts() : <></>}
                </div> 
                )
            case 3: return ( 
                <div className='formPage' id='formPage3'>
                    <div className='slidePreview'>slide preview</div>
                    <div className='slideEdit'>slide edits</div>
                </div>
                )
            case 4: return (
                <div className='formPage' id='formPage4'>
                    <div>silde preview big</div>
                </div>
                )
            case 5: return (
                <div className='formPage' id='formPage5'>
                    <p>slide settings</p>
                    <div className='settingsContainer'>
                        <div className='labelGroup'>
                            <label>label here</label>
                            <input type='text'></input>
                        </div>
                    </div>
                </div>
                )
            case 6: return (
                <div className='formPage' id='formPage6'>
                    <div>preview with settings</div>
                </div>
            )
            case 7: return (
                <div className='formPage' id='formPage7'>
                    {/* add buttons with options - go back to homepage, go to slideshow, etc */}
                    <div>confirmed - slide created!</div>
                </div>
            )
                    
        }
    }

    return (
        <Page>
            <PageHeader title="Create Slide" />
            <form action="" method="POST" className="formContainer">
                {/* TODO: breadcrumb - implement MUI linear progress component */}

                <div className='formPage' ref={pageRef}>
                    {page===1 ? formPage(1) : <></>}
                    {page===2 ? formPage(2) : <></>}
                    {page===3 ? formPage(3) : <></>}
                    {page===4 ? formPage(4) : <></>}
                    {page===5 ? formPage(5) : <></>}
                    {page===6 ? formPage(6) : <></>}
                    {page===7 ? formPage(7) : <></>}
                </div>
                
                <div className='paginationContainer'>
                    <p>page {page}</p>
                    <Button id="prevButton" ref={prevButtonRef} disabled={isPrevButtonDisabled} variant="contained" onClick={previousPage}>previous</Button>
                    <Button id="nextButton" variant="contained" onClick={nextPage}>next</Button>
                </div>
            </form>
        </Page>
    )
}