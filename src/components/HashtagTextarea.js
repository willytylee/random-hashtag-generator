import React from "react";
import { TextField } from "@mui/material";
import "./HashtagTextarea.scss";

export const HashtagTextarea = (props) => {
  const { name, rows, value, onChange } = props;
  const hashtagCount = value ? value.match(/#([^ ]+)/g)?.length : 0;
  return (
    <div className="hashtag-textarea">
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
    </div>
  );
};
