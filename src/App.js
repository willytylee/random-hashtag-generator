import { useState } from "react";
import { styled, Button } from "@mui/material";
import "./App.css";
import { data } from "./Data";
import { MainTable } from "./components/MainTable";
import { HashtagReturn } from "./components/HashtagReturn";
import { Controller } from "./components/Controller";

const App = () => {
  const [inputFields, setInputFields] = useState(data);

  const addCategory = () => {
    const newfield = {
      selected: false,
      category: "",
      standard: "",
      compulsory: "",
      count: 0,
    };
    inputFields["hashtags"] = [...inputFields["hashtags"], newfield];
    setInputFieldsFn(inputFields);
  };

  const submit = () => {
    const max_limit = inputFields.maxLimit;
    let compulsoryArr = [];
    let standardFullArr = [];
    let standardReducedArr = [];
    let finalHashtags = [];

    inputFields.hashtags.forEach((value) => {
      // Group the compulsory hashtags
      const { select, standard, compulsory, count } = value;
      if (select) {
        const compulsoryItems = compulsory.match(/#([^ ]+)/g);
        compulsoryItems &&
          (compulsoryArr = [...new Set(compulsoryArr.concat(compulsoryItems))]);

        // --------------------------------------

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

    inputFields["finalHashtags"] = finalHashtags;
    setInputFieldsFn(inputFields);
  };

  const setInputFieldsFn = (_data) => {
    setInputFields((prevState) => ({
      ...prevState,
      ..._data,
    }));
  };

  return (
    <AppRoot>
      <div class="title">Random Hashtag Generator</div>
      <MainTable
        inputFields={inputFields}
        setInputFieldsFn={setInputFieldsFn}
        submit={submit}
      />
      <Button onClick={addCategory}>Create New Category</Button>
      <div className="bottom">
        <HashtagReturn
          inputFields={inputFields}
          setInputFieldsFn={setInputFieldsFn}
        />

        <Controller
          submit={submit}
          inputFields={inputFields}
          setInputFieldsFn={setInputFieldsFn}
        />
      </div>
    </AppRoot>
  );
};

const AppRoot = styled("div")({
  width: "100%",
  ".title": {
    fontSize: "26px",
    paddingBottom: "22px",
  },
  ".bottom": {
    display: "flex",
    gap: "24px",
  },
});

export default App;
