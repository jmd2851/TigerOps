import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useContext, useEffect, useState } from "react";
import { FormTypes } from "../../constants";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import config from "../../configs.json";
import { Stack, Paper, FormControlLabel, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import AppContext from "../../AppContext";

dayjs.extend(utc);

class MenuOption {
  constructor(label, description, custom) {
    this.label = label;
    this.description = description;
    this.custom = custom;
  }
}

const labels = [
  "Main Dish",
  "Side Dish",
  "Vegetable",
  "Fruit",
  "Dessert",
  "Drink",
  "Custom",
];

export default function MenuForm(props) {
  const { formType, menu, handleClose, refetch } = props;
  const [date, setDate] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const { showAlert } = useContext(AppContext);

  const handleClear = () => {
    setDate(null);
    setMenuOptions([new MenuOption("", "")]);
  };

  useEffect(() => {
    if (formType === FormTypes.EDIT) {
      setDate(dayjs.utc(menu.Date));
      const savedMenuOptions = [];
      for (const [label, description] of Object.entries(menu.MenuData)) {
        let custom = false;
        if (!labels.includes(label)) {
          custom = true;
        }
        savedMenuOptions.push(new MenuOption(label, description, custom));
      }
      setMenuOptions(savedMenuOptions);
    } else {
      setMenuOptions([new MenuOption("", "")]);
    }

    //initialize
    if (menu.IsVisible == 1) {
      setIsVisible(true);
    }else {
      setIsVisible(false);
    }
    console.log("[initalized] isVisible: "+isVisible);
  }, [menu]);

  const handleCreateMenu = () => {
    const allOptionsValid = menuOptions.every(
      (menuItem) =>
        menuItem.label.trim() !== "" && menuItem.description.trim() !== ""
    );
    if (date == null || !allOptionsValid) {
      showAlert("error", "Please fill out all fields before creating a menu.");
      return;
    }

    const visible = isVisible ? 1 : 0;

    const body = {
      menuData: menuOptions.reduce((acc, menuItem) => {
        acc[menuItem.label] = menuItem.description;
        return acc;
      }, {}),
      date: date.format("YYYY-MM-DD"),
      isVisible: visible,
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    axios
      .post(
        `${config[process.env.NODE_ENV].apiDomain}/menus`,
        body,
        axiosConfig
      )
      .then((response) => {
        showAlert("success", "Successfully created a menu.");
        handleClear();
      })
      .catch(() => showAlert("error", "Something went wrong..."));
  };

  const handleEditMenu = (e) => {
    const allOptionsValid = menuOptions.every(
      (menuItem) =>
        menuItem.label.trim() !== "" && menuItem.description.trim() !== ""
    );

    if (date == null || !allOptionsValid) {
      showAlert("error", "Please fill out all fields.");
      return;
    }

    const visible = isVisible ? 1 : 0;

    const body = {
      menuData: menuOptions.reduce((acc, menuItem) => {
        acc[menuItem.label] = menuItem.description;
        return acc;
      }, {}),
      date: date.format("YYYY-MM-DD"),
      isVisible: visible,
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    axios
      .put(
        `${config[process.env.NODE_ENV].apiDomain}/menus/${menu.MenuID}`,
        body,
        axiosConfig
      )
      .then((response) => {
        showAlert("success", "Successfully edited the menu.");
        handleClose();
        handleClear();
        refetch();
      })
      .catch(() => showAlert("error", "Something went wrong..."));
  };

  const handleDeleteMenu = (e) => {
    axios
      .delete(`${config[process.env.NODE_ENV].apiDomain}/menus/${menu.MenuID}`)
      .then(() => {
        showAlert("success", "Successfully deleted menu.");
        handleClose();
        handleClear();
        refetch();
      })
      .catch((err) => {
        showAlert("error", "Something went wrong...");
      });
  };

  const handleMenuItemChange = (index, label, description, custom = false) => {
    const updatedMenuOptions = [...menuOptions];
    updatedMenuOptions[index] = new MenuOption(label, description, custom);
    setMenuOptions(updatedMenuOptions);
  };

  const handleAddMenuItem = () => {
    setMenuOptions([...menuOptions, new MenuOption("", "")]);
  };

  const handleRemoveMenuItem = (index) => {
    const updatedMenuOptions = [...menuOptions];
    updatedMenuOptions.splice(index, 1);
    setMenuOptions(updatedMenuOptions);
  };

  const handleCheckboxChange = (e) => {
    setIsVisible(e.target.checked);
  }

  return (
    <div className="form">
      <FormControl sx={{position:'absolute',top:'34px',right:'0px',padding:'0 24px'}}>
        <FormControlLabel control={
          <Checkbox 
            defaultChecked 
            labelPlacement = "left"
            checked = {isVisible}
            onChange = {(e) => handleCheckboxChange(e)}
          />
          } label="Visible?" />
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl sx={{ width: "100%" }}>
          <Stack direction="column" spacing={3}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(date) => setDate(dayjs.utc(date))}
            />

            {menuOptions.map((menuItem, index) => (
              <Paper
                key={index}
                className="menuItemFormContainer"
                elevation={3}
              >
                <Stack direction="row">
                  <TextField
                    fullWidth
                    select
                    value={menuItem.custom ? "Custom" : menuItem.label}
                    variant="standard"
                    margin="normal"
                    label={`Label for Item ${index + 1}`}
                    onChange={(e) => {
                      const label = e.target.value;
                      const custom = label === "Custom";
                      handleMenuItemChange(
                        index,
                        custom ? "" : label,
                        menuItem.description,
                        custom
                      );
                    }}
                  >
                    {labels.map((label) => (
                      <MenuItem value={label}>{label}</MenuItem>
                    ))}
                  </TextField>

                  <Button
                    sx={{ marginBottom: "-10px" }}
                    onClick={() => handleRemoveMenuItem(index)}
                  >
                    <CloseIcon
                      sx={{ position: "absolute", top: "0", right: "0" }}
                    />
                  </Button>
                </Stack>

                {menuItem.custom && (
                  <TextField
                    fullWidth
                    variant="standard"
                    margin="normal"
                    label={`Custom Label for Item ${index + 1}`}
                    value={menuItem.label}
                    onChange={(e) => {
                      const label = e.target.value;
                      handleMenuItemChange(
                        index,
                        label,
                        menuItem.description,
                        true
                      );
                    }}
                  />
                )}

                <TextField
                  fullWidth
                  variant="filled"
                  margin="normal"
                  label={`Description for Item ${index + 1}`}
                  value={menuItem.description}
                  multiline
                  maxRows={4}
                  onChange={(e) => {
                    const description = e.target.value;
                    handleMenuItemChange(
                      index,
                      menuItem.label,
                      description,
                      menuItem.custom
                    );
                  }}
                />
              </Paper>
            ))}

            <Button variant="outlined" onClick={handleAddMenuItem}>
              Add Menu Item
            </Button>

            <Stack direction="row-reverse" spacing={2}>
              {formType === FormTypes.CREATE ? (
                <Button
                  variant="contained"
                  onClick={handleCreateMenu}
                  color="secondary"
                >
                  Create Menu
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleEditMenu}
                  color="secondary"
                >
                  Save
                </Button>
              )}
              {formType === FormTypes.CREATE ? (
                <Button variant="text" onClick={handleClear}>
                  Clear
                </Button>
              ) : (
                // TODO: "are you sure" popover
                <Button variant="text" onClick={handleDeleteMenu}>
                  Delete this Slide
                </Button>
              )}
            </Stack>
          </Stack>
        </FormControl>
      </LocalizationProvider>
    </div>
  );
}
