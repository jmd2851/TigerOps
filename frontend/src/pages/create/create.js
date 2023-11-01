import "./styles.css";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import {
  Button,
} from "@mui/material";
import { useState } from "react";
import EventForm from "./EventForm";
import MenuForm from "./MenuForm";
import { FormTypes, SlideTypes } from "./constants";

export default function Create() {
  const [type, setType] = useState(null);

  return (
    <Page title="Create a Slide" subtitle="Choose the Slide type and fill out its details">

      <Button
        variant="contained"
        onClick={() => {
          setType(SlideTypes.EVENT);
        }}
      >
        event
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          setType(SlideTypes.MENU);
        }}
      >
        menu
      </Button>
      {type === SlideTypes.EVENT && <EventForm formType={FormTypes.CREATE} />}
      {type === SlideTypes.MENU && <MenuForm formType={FormTypes.CREATE} />}
    </Page>
  );
}
