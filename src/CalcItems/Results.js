import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";

const Results = ({ formData, calculateResults, onReset }) => {
  const results = calculateResults();

  return (
    <Box padding={2}>
      <Typography variant="h4" align="center" gutterBottom>Your Results</Typography>
      <Divider />
      <Typography variant="body1"><strong>Weekly Caloric Deficit:</strong> {results.weeklyWeightLoss.toFixed(2)} lbs/week</Typography>
      <Typography variant="body1"><strong>Daily Caloric Target:</strong> {results.dailyCalories} calories/day</Typography>
      <Typography variant="body1"><strong>Estimated Time to Goal:</strong> {results.timeToGoal} weeks</Typography>
      <Divider />
      <Button variant="contained" color="primary" fullWidth onClick={onReset}>Calculate Again</Button>
    </Box>
  );
};

export default Results;
