import "./styles.css";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import Container from "@mui/material/Container";
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import EventForm from "./EventForm";
import MenuForm from "./MenuForm";
import { FormTypes, SlideTypes } from "./constants";

export default function Create() {
  const [type, setType] = useState(null);

  return (
    <Page>
      <PageHeader title="Create a Slide" />

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
