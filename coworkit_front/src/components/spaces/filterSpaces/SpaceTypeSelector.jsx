import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useBookings from "../../../shared/hooks/useBookings";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export function SpaceTypeSelector(props) {
  const { spaceTypes, filter, setFilter } = useBookings();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setFilter({ ...filter, type: event.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl
      className={`${classes.formControl} spaceTypeSelectorContainer`}
    >
      <InputLabel id="demo-controlled-open-select-label">Tipo</InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={filter.type}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Cualquiera</em>
        </MenuItem>
        {spaceTypes.map((spaceType) => {
          return (
            <MenuItem value={spaceType} key={spaceType}>
              {spaceType}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
