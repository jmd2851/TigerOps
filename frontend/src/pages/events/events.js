import "./styles.css";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import Slideshow from "../../components/Slideshow";
import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";

export default function Events() {
  const { user } = useContext(AppContext);

  const settings = [
    {
      title: "Create a Slide",
      description: "Add a slide to the current slideshow deck",
      path: "/create",
    },
    {
      title: "Edit Slideshow",
      description:
        "Edit the current slideshow, delete a slide, toggle slide visibility, and more",
      path: "/edit",
    },
  ];

  // TODO: export as slideshow type constant
  const slideshowProps = {
    height: "600px",
    fullHeightHover: "true",
    navButtonsAlwaysVisible: "true",
    navButtonsAlwaysInvisible: "false",
    interval: "10000",
    animation: "slide",
    indicatorContainerProps: {
      style: {
        opacity: "1",
        paddingBottom: "8px",
        borderRadius: "10px",
      },
    },
  };

  const [titles,setTitles] = useState({
    primaryTitle: "",
    primarySubtitle: "",
    secondaryTitle: "",
    secondarySubtitle: "",
  });
  useEffect(() => { 
    if (user!=null) {
      setTitles(prevState => ({
        ...prevState,
        primaryTitle:"Slide Customizations",
        primarySubtitle:"Various Slide options and settings",
        secondaryTitle:"Live Slideshow",
        secondarySubtitle:"This week's current Slideshow, featuring Menus and Events",
      }))
    } else {
      setTitles(prevState => ({
        ...prevState,
        primaryTitle:"Live Slideshow",
        primarySubtitle:"This week's current Slideshow, featuring Menus and Events",
        secondaryTitle:"Slide Customizations",
        secondarySubtitle:"Various Slide options and settings",
      }))
    }
  },[]);

  return (
    <Page
      title={titles.primaryTitle}
      subtitle={titles.primarySubtitle}
    >
      {user != null ? (
        <Fragment>
          <Stack direction={"row"} spacing={4} style={{marginBottom:'80px'}}>
            {settings.map((setting) => {
              return (
                <Link to={setting.path} className="settingsCardContainer">
                  <Card className="settingsCard">
                    <CardHeader
                      title={
                        <Typography variant="h5">{setting.title}</Typography>
                      }
                      titleTypographyProps={{
                        component:'body1'
                      }}
                      subheader={setting.description}
                    />
                  </Card>
                </Link>
              );
            })}
          </Stack>

          <PageHeader
            title={titles.secondaryTitle}
            subtitle={titles.secondarySubtitle}
          />
        </Fragment>
      ) : null}
      
      <div className="slideshowContainer">
        <Slideshow
          slideStyles={{ borderRadius: "10px 10px 0 0" }}
          slideshowProps={slideshowProps}
        />
      </div>
    </Page>
  );
}
