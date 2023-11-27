import { Box } from "@mui/material"
import Slideshow from "../../components/Slideshow"

 // TODO: export as slideshow type constant
const slideshowProps = {
    height:'100vh',
    fullHeightHover:'true',
    navButtonsAlwaysVisible:'false',
    navButtonsAlwaysInvisible:'true',
    interval:'10000',
    animation:'slide',
    indicatorContainerProps:{style: {
        opacity:'0',
    }}
}

export default function Fullscreen() {
    return (
        <Box sx={{overflow:'hidden !important', height:'100vh'}}>
            <Slideshow slideshowProps={slideshowProps} />
        </Box>
    )
}