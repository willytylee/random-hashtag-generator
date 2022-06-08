import { useState, useEffect } from "react";
import "./App.css";
import { CategoryForm } from "./components/CategoryForm";
import { HashtagTextarea } from "./components/HashtagTextarea";
import { data } from "./Data.js";

const App = () => {
  const [inputFields, setInputFields] = useState(data);
  const [finalHashtagsField, setFinalHashtagsField] = useState("");

  const handleFormChange = (i, e) => {
    let data = [...inputFields];
    data[i][e.target.name] = e.target.value;
    setInputFields(data);
  };

  const handleCheckboxChange = (i, e) => {
    let data = [...inputFields];
    data[i][e.target.name] = e.target.checked;
    setInputFields(data);
  };

  const addCategory = () => {
    let newfield = {
      selected: false,
      category: "",
      standard: "",
      compulsory: "",
      count: 0,
    };

    setInputFields([...inputFields, newfield]);
  };

  const remove = (i, e) => {
    e.preventDefault();
    let data = [...inputFields];
    data.splice(i, 1);
    setInputFields(data);
  };

  const submit = (e) => {
    e.preventDefault();

    const max_limit = 27;
    let compulsoryArr = [];
    let standardFullArr = [];
    let standardReducedArr = [];
    let finalHashtags = [];
    let totalCount = 0;

    inputFields.forEach((value) => {
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
      finalHashtags = standardFullArr
        .sort(() => 0.5 - Math.random())
        .splice(0, max_limit - compulsoryArr.length)
        .concat(compulsoryArr);
    }

    finalHashtags = finalHashtags.sort(() => 0.5 - Math.random()).join(" ");

    setFinalHashtagsField(finalHashtags);
  };

  return (
    <>
      <div>Hashtag Generator</div>

      <table>
        <tbody>
          <tr>
            <td>Select</td>
            <td>Category</td>
            <td>Standard Hashtags</td>
            <td>Compulsory</td>
            <td>Count</td>
            <td>Remove</td>
          </tr>
          {inputFields.map((input, i) => {
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
      <HashtagTextarea name="finalHashTags" value={finalHashtagsField} />

      <button onClick={addCategory}>Create Category</button>
      <button onClick={submit}>Submit</button>
    </>
  );
};

export default App;
