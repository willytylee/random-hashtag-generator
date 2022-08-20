import { TextField, styled } from "@mui/material";

export const HashtagTextarea = ({ name, rows, value, onChange }) => {
  const hashtagCount = value ? value.match(/#([^ ]+)/g)?.length : 0;
  return (
    <HashtagTextareaRoot>
      <TextField
        name={name}
        multiline
        inputProps={{ style: { fontSize: 13 } }}
        size="small"
        rows={rows}
        value={value}
        onChange={onChange}
      />
      <div className="hashtag-count">{hashtagCount}</div>
    </HashtagTextareaRoot>
  );
};

const HashtagTextareaRoot = styled("div")({
  width: "100%",
  fontSize: "13px",
  ".MuiFormControl-root": {
    width: "100%",
  },
  ".hashtag-count": {
    textAlign: "right",
  },
});
