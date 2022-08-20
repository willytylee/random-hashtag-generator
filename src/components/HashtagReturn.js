import { styled } from "@mui/material";
import { HashtagTextarea } from "../components/HashtagTextarea";

export const HashtagReturn = ({ inputFields, setInputFieldsFn }) => {
  const handlefinalHashtagFieldChange = (e) => {
    inputFields["finalHashtags"] = e.target.value;
    setInputFieldsFn(inputFields);
  };
  return (
    <HashtagTextarea
      name="finalHashTags"
      rows={4}
      value={inputFields.finalHashtags}
      onChange={(e) => handlefinalHashtagFieldChange(e)}
      HashtagTextareaRoot={HashtagTextareaRoot}
    />
  );
};

const HashtagTextareaRoot = styled("div")({
  width: "100%",
  ".bottom": {
    display: "flex",
  },
});
