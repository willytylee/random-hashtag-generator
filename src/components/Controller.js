import { Button, Slider, styled } from "@mui/material";

export const Controller = ({ submit, inputFields, setInputFieldsFn }) => {
  const handleSliderChange = (e) => {
    inputFields["maxLimit"] = e.target.value;
    setInputFieldsFn(inputFields);
    submit();
  };
  return (
    <ControllerRoot>
      <Button variant="contained" onClick={submit}>
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
    </ControllerRoot>
  );
};

const ControllerRoot = styled("div")({
  width: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
});
