import React from "react";

export const HashtagTextarea = (props) => {
  const { name, cols, rows, value, onChange } = props;
  const hashtagCount = value ? value.match(/#([^ ]+)/g)?.length : 0;
  return (
    <>
      <textarea
        name={name}
        cols={cols}
        rows={rows}
        value={value}
        onChange={onChange}
      ></textarea>
      {hashtagCount}
    </>
  );
};
