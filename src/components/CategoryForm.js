import { IconButton, TextField, Switch, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { HashtagTextarea } from "./HashtagTextarea";

export const CategoryForm = (props) => {
  const { input, i, remove, handleFormChange, handleCheckboxChange } = props;

  return (
    <CategoryFormRoot>
      <div className="select">
        <Switch
          type="checkbox"
          name="select"
          checked={input.select}
          onChange={(e) => handleCheckboxChange(i, e)}
        />
      </div>
      <div className="category">
        <TextField
          variant="standard"
          inputProps={{ style: { fontSize: 13 } }}
          size="small"
          name="category"
          value={input.category}
          onChange={(e) => handleFormChange(i, e)}
        />
      </div>
      <div className="standard">
        <HashtagTextarea
          name="standard"
          rows={3}
          value={input.standard}
          onChange={(e) => handleFormChange(i, e)}
        />
      </div>
      <div className="compulsory">
        <HashtagTextarea
          name="compulsory"
          rows={3}
          value={input.compulsory}
          onChange={(e) => handleFormChange(i, e)}
        />
      </div>
      <div className="count">
        <TextField
          variant="standard"
          inputProps={{ style: { fontSize: 13 } }}
          size="small"
          name="count"
          type="number"
          value={input.count}
          onChange={(e) => handleFormChange(i, e)}
        />
      </div>
      <div className="remove">
        <IconButton
          variant="outlined"
          color="error"
          size="small"
          onClick={(e) => remove(i, e)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </CategoryFormRoot>
  );
};

const CategoryFormRoot = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
  gap: "20px",
  paddingBottom: "10px",
});
