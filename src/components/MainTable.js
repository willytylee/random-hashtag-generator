import { styled } from "@mui/material";
import { CategoryForm } from "../components/CategoryForm";

export const MainTable = ({ inputFields, setInputFieldsFn, submit }) => {
  const handleFormChange = (i, e) => {
    inputFields["hashtags"][i][e.target.name] = e.target.value;
    setInputFieldsFn(inputFields);
    submit();
  };

  const handleCheckboxChange = (i, e) => {
    inputFields["hashtags"][i][e.target.name] = e.target.checked;
    setInputFieldsFn(inputFields);
    submit();
  };

  const remove = (i, e) => {
    e.preventDefault();

    inputFields.hashtags.splice(i, 1);
    setInputFieldsFn(inputFields);
    submit();
  };

  return (
    <MainTableRoot>
      <div className="mainTable">
        <div className="header">
          <div className="select">Select</div>
          <div className="category">Category</div>
          <div className="standard">Standard Hashtags</div>
          <div className="compulsory">Compulsory</div>
          <div className="count">Count</div>
          <div className="remove">Remove</div>
        </div>

        {inputFields?.hashtags?.map((input, i) => (
          <CategoryForm
            input={input}
            key={i}
            i={i}
            remove={remove}
            handleFormChange={handleFormChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
    </MainTableRoot>
  );
};

const MainTableRoot = styled("div")({
  width: "100%",
  ".header": {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    textAlign: "center",
    padding: "14px 0 24px",
    fontWeight: "900",
  },
  ".select": {
    width: "5%",
  },
  ".category": {
    width: "10%",
  },
  ".standard": {
    width: "45%",
  },
  ".compulsory": {
    width: "30%",
  },
  ".count": {
    width: "5%",
  },
  ".remove": {
    width: "5%",
  },
});
