import React from "react";
import { IconButton, TextField, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { HashtagTextarea } from "./HashtagTextarea";

export const CategoryForm = (props) => {
  const { input, i, remove, handleFormChange, handleCheckboxChange } = props;

  return (
    <tr>
      <td>
        <Switch
          type="checkbox"
          name="select"
          checked={input.select}
          onChange={(e) => handleCheckboxChange(i, e)}
        />
      </td>
      <td>
        <TextField
          variant="standard"
          inputProps={{ style: { fontSize: 13 } }}
          size="small"
          name="category"
          value={input.category}
          onChange={(e) => handleFormChange(i, e)}
        />
      </td>
      <td>
        <HashtagTextarea
          name="standard"
          rows={3}
          value={input.standard}
          onChange={(e) => handleFormChange(i, e)}
        />
      </td>
      <td>
        <HashtagTextarea
          name="compulsory"
          rows={3}
          value={input.compulsory}
          onChange={(e) => handleFormChange(i, e)}
        />
      </td>
      <td>
        <TextField
          variant="standard"
          inputProps={{ style: { fontSize: 13 } }}
          size="small"
          name="count"
          type="number"
          value={input.count}
          onChange={(e) => handleFormChange(i, e)}
        />
      </td>
      <td>
        <IconButton
          variant="outlined"
          color="error"
          size="small"
          onClick={(e) => remove(i, e)}
        >
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  );
};
