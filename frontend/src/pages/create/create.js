import "./styles.css";
import Page from "../../components/Page";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import EventForm from "./EventForm";
import MenuForm from "./MenuForm";
import { FormTypes, SlideTypes } from "../../constants";

const buttonStyle = {
  width: '20%',
  padding: '16px 8px'
}

export default function Create() {
  const [type, setType] = useState(null);

  return (
    <Page
      title="Create a Slide"
      subtitle="Choose the Slide type and fill out its details"
    >
      <Stack direction="column" spacing={6}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            What type of slide would you like to create?
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => {
                setType(SlideTypes.EVENT);
              }}
              sx={{...buttonStyle}}
            >
              event
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                setType(SlideTypes.MENU);
              }}
              sx={{...buttonStyle}}
            >
            menu
            </Button>
          </Stack>
        </Stack>
        
        <Box sx={{width:'60%', paddingLeft:'2px'}}>
          {type === SlideTypes.EVENT && <EventForm formType={FormTypes.CREATE} />}
          {type === SlideTypes.MENU && <MenuForm formType={FormTypes.CREATE} />}
        </Box>

      </Stack>
    </Page>
  );
}
