import './styles.css';
import Button from '@mui/material/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { useEffect, useRef, useState } from 'react';

export default function Create() {
    const [pageRef, prevButtonRef] = [useRef(null),useRef(null)];
    const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(false);
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

    useEffect(() => {
        if(page===1) {
            //disable prev button
            setIsPrevButtonDisabled(true);
        } else {
            //enable prev button
            setIsPrevButtonDisabled(false);
        }
    }, [page]);

    //TODO: load possible menu layouts
    function getMenuLayouts() {
        return <p>menu layout choices</p>;
    }

    //TODO: load possile event layouts
    function getEventLayouts() {
        return <p>event layout choices</p>;
    }

    
    //TODO: disable button for a certain amount of seconds so user cant spam the button...
    function nextPage(
    ) {
        if (page===1) {
            pageRef.current.style.backgroundColor = "red";
        } 

        //TODO: validation
            //get page
            //is the data on this page filled out
            //is the data on this page valid
        
        setPage(page+1);
    }

    //TODO: disable button for a certain amount of seconds so user cant spam the button...
    function previousPage() {
        if(page===1) {
            setPage(1);
            pageRef.current.style.backgroundColor = "blue";
        } else {
            setPage(page-1);
        }
    }

    //TODO: helper function the "formPage" depending on page state
    //for now, will hardcode form pages as functions ie. formPage1() formPage2()

    function formPage1() {
        return (
            <div id="formPage1">
                <div className='labelInput'>
                    <label>pick a slide type</label>
                    <div className='radioButtonsContainer'>
                        <Button id="eventButton" variant="contained" onClick={ () => {
                            setSlide({...slide, type:"event"});
                            nextPage();
                            console.log("create a slide - " + slide.type + " type");
                        }}>event</Button>
                        <Button id="menuButton" variant="contained" onClick={ () => {
                            setSlide({...slide, type:"menu"});
                            nextPage();
                            console.log("create a slide - " + slide.type + " type");
                        }}>menu</Button>
                    </div>
                </div>
            </div>
        )
    }

    function formPage2() {
        return (
            <div id="formPage2">
                {slide.type == "menu" ? getMenuLayouts() : <></>}
                {slide.type == "event" ? getEventLayouts() : <></>}
            </div> 
        )
    }


    return (
        <Page>
            <PageHeader title="Create Slide" />
            <form action="" method="POST" onsubmit="" className="formContainer">
                {/* TODO: breadcrumb - implement MUI linear progress component */}
                <p>page {page}</p>

                <div className='formPage' ref={pageRef}>
                    {page===1 ? formPage1() : <></>}
                    {page===2 ? formPage2() : <></>}
                </div>
                
                <div className='paginationContainer'>
                    <Button id="prevButton" ref={prevButtonRef} disabled={isPrevButtonDisabled} variant="contained" onClick={previousPage}>previous</Button>
                    <Button id="nextButton" variant="contained" onClick={nextPage}>next</Button>
                </div>
            </form>
        </Page>
    )
}