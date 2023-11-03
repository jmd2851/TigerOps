import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { FormTypes } from "../../constants";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import config from "../../configs.json";

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
  const { formType, menu } = props;
  const [date, setDate] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  const selectedLabels = new Set();

  const handleClear = () => {
    setDate(null);
    setMenuOptions([new MenuOption("", "")]);
  };

  useEffect(() => {
    if (formType === FormTypes.EDIT) {
    } else {
      setMenuOptions([new MenuOption("", "")]);
    }
  }, []);

  const handleCreateMenu = () => {
    const allOptionsValid = menuOptions.every(
      (menuItem) =>
        menuItem.label.trim() !== "" && menuItem.description.trim() !== ""
    );
    if (date == null || !allOptionsValid) {
      alert("TODO: add validation error message");
      return;
    }
    const body = {
      menuData: menuOptions.reduce((acc, menuItem) => {
        acc[menuItem.label] = menuItem.description;
        return acc;
      }, {}),
      date: date.format("YYYY-MM-DD"),
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
        handleClear();
      })
      .catch((error) => console.log(error));
  };

  const handleEditMenu = () => {};

  const handleDeleteMenu = () => {};

  const handleMenuItemChange = (index, label, description, custom = false) => {
    const updatedMenuOptions = [...menuOptions];
    updatedMenuOptions[index] = new MenuOption(label, description, custom);
    console.log(updatedMenuOptions);
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

  return (
    <div className="menuForm">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl>
          <DatePicker
            label="Date"
            value={date}
            onChange={(date) => setDate(date)}
          />

          {menuOptions.map((menuItem, index) => (
            <div key={index}>
              <TextField
                fullWidth
                select
                value={menuItem.custom ? "Custom" : menuItem.label}
                variant="filled"
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
              {menuItem.custom && (
                <TextField
                  fullWidth
                  variant="filled"
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
                onChange={(e) => {
                  const description = e.target.value;
                  handleMenuItemChange(index, menuItem.label, description);
                }}
              />
              <Button onClick={() => handleRemoveMenuItem(index)}>
                Delete
              </Button>
            </div>
          ))}

          <Button onClick={handleAddMenuItem}>Add Menu Item</Button>

          {formType === FormTypes.CREATE ? (
            <Button onClick={handleClear}>Clear</Button>
          ) : (
            <Button onClick={handleDeleteMenu}>Delete</Button>
          )}
          {formType === FormTypes.CREATE ? (
            <Button onClick={handleCreateMenu}>Create Menu</Button>
          ) : (
            <Button onClick={handleEditMenu}>Edit Menu</Button>
          )}
        </FormControl>
      </LocalizationProvider>
    </div>
  );
}
