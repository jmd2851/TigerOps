import './styles.css';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { Stack, Card, Typography, CardContent, CardHeader, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Edit() {
    const slides = [
        {
            id: 1,
            route: '/event/1',
            type: "event",
            title: "fedsales bootcamp",
            description: "Bootcamp is best suited for those who have limited experience in the federal market; maybe you're just getting started with federal, or you've won SBIRs and you're looking to scale. Bootcamp is also great for teams just getting started in Federal, making sure each member of your team has the knowledge, skills, and materials needed for success.",
            start: 'december 10, 2023',
            end: 'february 14, 2024',
        },
        {
            id: 2,
            route: '/menu/1',
            type: "menu",
            date: "November 7, 2023",
            label: "",
            description: ["Chicken French- lightly breaded chicken breast, an served in a lemon sherry sauce", "Garlic Herb Roasted Potatoes", "Rice Pilaf", "House Salad w/ dressing", "Tiramisu", "Assorted Sodas"],
        },
        {
            id: 3,
            route: '/event/2',
            type: "event",
            title: "the future of agile, devops and everything else in between",
            description: "Discover the latest in agile and DevOps methods, tools, and leadership practices along with ideas and inspiration from experts and peers. You'll find out how the practice of agile and DevOps brings cross-functional stakeholders together to deliver software with greater speed and agility while meeting quality and security demands.",
            start: "November 5, 2023",
            end: "November 10, 2023",
        },
        {
            id: 4,
            route: '/menu/2',
            type: "menu",
            date: "November 10, 2023",
            label: "carrot day",
            description: ["Stuffed Shells- w/ florentine sauce or marinara sauce", "Baked Potato","Honey Butter Glazed Carrots","Carrot Cake","Carrot Juice"],
        },
    ]

    return (
        <Page title="Edit a slide" subtitle="Pick a slide from the current slideshow to edit.">
            <form>
                <Stack spacing={{sm:2}} direction="row" useFlexGap flexWrap="wrap">
                {
                    slides.map((slide) => {
                        return (
                            <Card sx={{width:'45%', minHeight: '280px', boxShadow: 'rgb(0, 0, 0, 0.25)', backgroundColor: '#d6dad6'}}>
                                <Link to={slide.route} sx={{height:'100%'}}>
                                    <CardHeader
                                            title={slide.title || slide.date + " menu" }
                                            subheader={slide.type=="event" ? slide.start + " through " + slide.end : slide.label}
                                        />
                                        
                                        <CardContent>
                                            <Typography sx={{fontSize: '0.6em', paddingTop: '16px'}}>
                                                {slide.description}
                                            </Typography>
                                        </CardContent>
                                </Link>
                            </Card>
                        )
                    })   
                }
                </Stack>
            </form>
        </Page>
    )
}