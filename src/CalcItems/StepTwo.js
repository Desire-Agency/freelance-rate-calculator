import React from "react";
import { Box, TextField, Typography, Button, ToggleButtonGroup, ToggleButton, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const StepTwo = ({ formData, errors, unitSystem, onInputChange, onUnitChange, onNext }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <ToggleButtonGroup value={unitSystem} exclusive onChange={onUnitChange} aria-label="Unit System">
          <ToggleButton value="metric" aria-label="Metric System">Metric (kg, cm)</ToggleButton>
          <ToggleButton value="imperial" aria-label="Imperial System">Imperial (lbs, in)</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <TextField
        fullWidth
        label={`Weight (${unitSystem === "metric" ? "kg" : "lbs"})`}
        name="currentWeight"
        value={formData.currentWeight}
        onChange={onInputChange}
        error={!!errors.currentWeight}
        helperText={errors.currentWeight}
        margin="normal"
      />
      <TextField
        fullWidth
        label={`Height (${unitSystem === "metric" ? "cm" : "in"})`}
        name="height"
        value={formData.height}
        onChange={onInputChange}
        error={!!errors.height}
        helperText={errors.height}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Age"
        name="age"
        value={formData.age}
        onChange={onInputChange}
        error={!!errors.age}
        helperText={errors.age}
        margin="normal"
      />
      <FormControl component="fieldset">
        <Typography variant="body1">Gender</Typography>
        <RadioGroup row name="gender" value={formData.gender} onChange={onInputChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="nonBinary" control={<Radio />} label="Non-Binary" />
        </RadioGroup>
      </FormControl>
      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <Button variant="contained" color="primary" onClick={onNext}>Next →</Button>
      </Box>
    </Box>
  );
};

export default StepTwo;
