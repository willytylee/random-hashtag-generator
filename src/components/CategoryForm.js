import React from "react";
import { HashtagTextarea } from "./HashtagTextarea";

export const CategoryForm = (props) => {
  const { input, i, remove, handleFormChange, handleCheckboxChange } = props;

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name="select"
          checked={input.select}
          onChange={(e) => handleCheckboxChange(i, e)}
        />
      </td>
      <td>
        <input
          type="text"
          name="category"
          value={input.category}
          onChange={(e) => handleFormChange(i, e)}
        />
      </td>
      <td>
        <HashtagTextarea
          name="standard"
          cols="30"
          rows="5"
          value={input.standard}
          onChange={(e) => handleFormChange(i, e)}
        />
      </td>
      <td>
        <HashtagTextarea
          name="compulsory"
          cols="30"
          rows="5"
          value={input.compulsory}
          onChange={(e) => handleFormChange(i, e)}
        />
      </td>
      <td>
        <input
          type="text"
          name="count"
          value={input.count}
          onChange={(e) => handleFormChange(i, e)}
        />
      </td>
      <td>
        <button onClick={(e) => remove(i, e)}>Remove</button>
      </td>
    </tr>
  );
};
