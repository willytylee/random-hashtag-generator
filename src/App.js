import { useState, useEffect } from "react";
import { Button, Slider, Grid } from "@mui/material";
import "./App.scss";
import { CategoryForm } from "./components/CategoryForm";
import { HashtagTextarea } from "./components/HashtagTextarea";
import { data } from "./Data.js";

const App = () => {
  const [inputFields, setInputFields] = useState(data);

  const handleFormChange = (i, e) => {
    const data = inputFields;
    data["hashtags"][i][e.target.name] = e.target.value;
    setInputFieldsFn(data);
    submit();
  };

  const handleCheckboxChange = (i, e) => {
    const data = inputFields;
    data["hashtags"][i][e.target.name] = e.target.checked;
    setInputFieldsFn(data);
    submit();
  };

  const handleSliderChange = (e) => {
    const data = inputFields;
    data["maxLimit"] = e.target.value;
    setInputFieldsFn(data);
    submit();
  };

  const handlefinalHashtagFieldChange = (e) => {
    const data = inputFields;
    data["finalHashtags"] = e.target.value;
    setInputFieldsFn(data);
  };

  const addCategory = () => {
    const data = inputFields;
    const newfield = {
      selected: false,
      category: "",
      standard: "",
      compulsory: "",
      count: 0,
    };
    data["hashtags"] = [...inputFields["hashtags"], newfield];
    setInputFieldsFn(data);
  };

  const remove = (i, e) => {
    e.preventDefault();

    const data = inputFields;
    data.hashtags.splice(i, 1);
    setInputFieldsFn(data);
    submit();
  };

  const submit = () => {
    const max_limit = inputFields.maxLimit;
    let compulsoryArr = [];
    let standardFullArr = [];
    let standardReducedArr = [];
    let finalHashtags = [];
    let totalCount = 0;

    inputFields.hashtags.forEach((value) => {
      // Group the compulsory hashtags
      const { select, standard, compulsory, count } = value;
      if (select) {
        const compulsoryItems = compulsory.match(/#([^ ]+)/g);
        compulsoryItems &&
          (compulsoryArr = [...new Set(compulsoryArr.concat(compulsoryItems))]);

        //--------------------------------------

        // Group the standard hashtags
        const standardItems = standard.match(/#([^ ]+)/g);
        if (standardItems) {
          standardFullArr = standardFullArr.concat(standardItems);
          const reducedItems = standardItems
            .sort(() => 0.5 - Math.random())
            .splice(0, count - compulsoryItems?.length);
          standardReducedArr = [
            ...new Set(standardReducedArr.concat(reducedItems)),
          ];
        }
      }
    });

    // array_diff

    // If the number of reduced hashtag and compulsory larger than the limit,
    if (standardReducedArr.length + compulsoryArr.length > max_limit) {
      finalHashtags = standardReducedArr
        .sort(() => 0.5 - Math.random())
        .splice(0, max_limit - compulsoryArr.length)
        .concat(compulsoryArr);
    } else if (standardFullArr.length + compulsoryArr.length > max_limit) {
      finalHashtags = standardFullArr
        .sort(() => 0.5 - Math.random())
        .splice(0, max_limit - compulsoryArr.length)
        .concat(compulsoryArr);
    } else {
      finalHashtags = standardFullArr.concat(compulsoryArr);
    }

    finalHashtags = finalHashtags.sort(() => 0.5 - Math.random()).join(" ");

    const data = inputFields;
    data["finalHashtags"] = finalHashtags;
    setInputFieldsFn(data);
  };

  const setInputFieldsFn = (data) => {
    setInputFields((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <>
      <table className="mainTable">
        <thead>
          <tr>
            <td className="select">Select</td>
            <td className="category">Category</td>
            <td className="standard">Standard Hashtags</td>
            <td className="compulsory">Compulsory</td>
            <td className="count">Count</td>
            <td className="remove">Remove</td>
          </tr>
        </thead>
        <tbody>
          {inputFields?.hashtags?.map((input, i) => {
            return (
              <CategoryForm
                input={input}
                key={i}
                i={i}
                remove={remove}
                handleFormChange={handleFormChange}
                handleCheckboxChange={handleCheckboxChange}
              />
            );
          })}
        </tbody>
      </table>
      <Button onClick={addCategory}>Create Category</Button>
      <Grid container>
        <Grid item xs={10}>
          <HashtagTextarea
            name="finalHashTags"
            rows={4}
            value={inputFields.finalHashtags}
            onChange={(e) => handlefinalHashtagFieldChange(e)}
          ></HashtagTextarea>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            inputProps={{ style: { width: "100%" } }}
            onClick={submit}
          >
            Generate
          </Button>
          <div>Maximum Limited: {inputFields.maxLimit}</div>
          <Slider
            aria-label="Volume"
            value={inputFields.maxLimit}
            max={30}
            step={1}
            onChange={handleSliderChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
