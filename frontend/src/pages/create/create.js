import './styles.css';
import Button from '@mui/material/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { useEffect, useState } from 'react';

export default function Create() {
    const [page, setPage] = useState(1);
    const [type, setType] = useState();
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
    }, [page]);

    function getMenuLayouts() {
        return <p>menu layout choices</p>;
    }

    function getEventLayouts() {
        return <p>event layout choices</p>;
    }

    
    //disable button for a certain amount of seconds
    //so user cant spam the button...
    function nextPage() {
        document.getElementById("previousButton").disabled = false;
        setPage(page+1);
    }

    //disable button for a certain amount of seconds
    //so user cant spam the button...
    function previousPage() {
        if(page===1) {
            setPage(1);
            document.getElementById("previousButton").disabled = true;
        } else {
            setPage(page-1);
        }
    }

    function fp1() {
        return (
            <div className='formPage' id="fp1">
                <div className='labelInput'>
                    <label>pick a slide type</label>
                    <div className='radioButtonsContainer'>
                        <Button id="eventButton" variant="contained" onClick={ () => {
                            setType("event");
                            alert("create a slide - " + slide.type + " type");
                        }}>event</Button>
                        <Button id="menuButton" variant="contained" onClick={ () => {
                            setType("menu");
                            alert("create a slide - " + slide.type + " type");
                        }}>menu</Button>
                    </div>
                </div>

                {type == "" ? <p>nothing</p> : <></>}
                {type == "menu" ? getMenuLayouts() : <></>}
                {type == "event" ? getEventLayouts() : <></>}
            </div>
        )
    }

    function fp2() {
        return (
            <div className='formPage' id="fp2">
                <p>page2</p>
            </div> 
        )
    }


    return (
        <Page>
            <PageHeader title="Create Slide" />
            <form action="" method="POST" onsubmit="" className="formContainer">
                <p>*insert linear progress MUI component here* page {page}</p>

                {page===1 ? fp1() : <></>}

                {page===2 ? fp2() : <></>}

                <div className='paginationContainer'>
                    <Button id="previousButton" variant="contained" onClick={previousPage}>previous</Button>
                    <Button id="nextButton" variant="contained" onClick={nextPage}>next</Button>
                </div>
            </form>
        </Page>
    )
}