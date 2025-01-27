import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const WeightLossPredictor = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    currentWeight: "",
    height: "",
    age: "",
    gender: "",
    activityLevel: "",
    weightLossGoal: "",
    weeks: "",
  });
  const [errors, setErrors] = useState({});
  const [unitSystem, setUnitSystem] = useState("metric");

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const activityMultipliers = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extremelyActive: 1.9,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUnitChange = (event, newUnit) => {
    if (newUnit) {
      setUnitSystem(newUnit);
      setFormData((prevData) => ({
        ...prevData,
        currentWeight: newUnit === "metric" ? (prevData.currentWeight / 2.205).toFixed(1) : (prevData.currentWeight * 2.205).toFixed(1),
        height: newUnit === "metric" ? (prevData.height / 0.3937).toFixed(1) : (prevData.height * 0.3937).toFixed(1),
      }));
    }
  };

  const validateStep = () => {
    const stepErrors = {};
    if (step === 1) {
      const weightMin = unitSystem === "metric" ? 13.6 : 30;
      const weightMax = unitSystem === "metric" ? 136 : 300;
      const heightMin = unitSystem === "metric" ? 100 : 39.37;
      const heightMax = unitSystem === "metric" ? 250 : 98.43;

      if (!formData.currentWeight || isNaN(formData.currentWeight) || formData.currentWeight < weightMin || formData.currentWeight > weightMax) {
        stepErrors.currentWeight = `Please enter a valid weight between ${weightMin} and ${weightMax} ${unitSystem === "metric" ? "kg" : "lbs"}.`;
      }
      if (!formData.height || isNaN(formData.height) || formData.height < heightMin || formData.height > heightMax) {
        stepErrors.height = `Please enter a valid height between ${heightMin} and ${heightMax} ${unitSystem === "metric" ? "cm" : "in"}.`;
      }
      if (!formData.age || isNaN(formData.age) || formData.age < 10 || formData.age > 120) {
        stepErrors.age = "Please enter a valid age between 10 and 120 years.";
      }
      if (!formData.gender) {
        stepErrors.gender = "Please select a gender.";
      }
    } else if (step === 2) {
      if (!formData.activityLevel) {
        stepErrors.activityLevel = "Please select an activity level.";
      }
    } else if (step === 3) {
      const weightLossGoalMax = unitSystem === "metric" ? 45.36 : 100;

      if (!formData.weightLossGoal || isNaN(formData.weightLossGoal) || formData.weightLossGoal <= 0 || formData.weightLossGoal > weightLossGoalMax) {
        stepErrors.weightLossGoal = `Please enter a valid weight loss goal between 1 and ${weightLossGoalMax} ${unitSystem === "metric" ? "kg" : "lbs"}.`;
      }
      if (!formData.weeks || isNaN(formData.weeks) || formData.weeks < 1 || formData.weeks > 52) {
        stepErrors.weeks = "Please enter a valid time frame between 1 and 52 weeks.";
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };


  const calculateResults = () => {
    const { currentWeight, height, age, gender, activityLevel, weightLossGoal, weeks } = formData;
    const weight = unitSystem === "metric" ? parseFloat(currentWeight) : parseFloat(currentWeight) * 0.45359;
    const heightCm = unitSystem === "metric" ? parseFloat(height) : parseFloat(height) * 2.54;

    const BMR =
      gender === "male"
        ? 66.5 + 13.75 * weight + 5.003 * heightCm - 6.75 * age
        : 655.1 + 9.563 * weight + 1.85 * heightCm - 4.676 * age;

    const TDEE = BMR * activityMultipliers[activityLevel];

    const totalCalorieDeficit = parseFloat(weightLossGoal) * 3500;
    const dailyCalorieDeficit = totalCalorieDeficit / (parseFloat(weeks) * 7);

    const dailyCalories = TDEE - dailyCalorieDeficit;

    return {
      weeklyWeightLoss: (dailyCalorieDeficit * 7) / 3500,
      dailyCalories: dailyCalories.toFixed(2),
      timeToGoal: weeks,
    };
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };


  const handleReset = () => {
    setFormData({
      currentWeight: "",
      height: "",
      age: "",
      gender: "",
      activityLevel: "",
      weightLossGoal: "",
      weeks: "",
    });
    setStep(1);
  };
  console.log(step)
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box display="flex" justifyContent="center" marginBottom={2}>
              <ToggleButtonGroup
                value={unitSystem}
                exclusive
                onChange={handleUnitChange}
                aria-label="Unit System"
              >
                <ToggleButton value="metric" aria-label="Metric System">
                  Metric (kg, cm)
                </ToggleButton>
                <ToggleButton value="imperial" aria-label="Imperial System">
                  Imperial (lbs, in)
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <TextField
              fullWidth
              label={`Weight (${unitSystem === "metric" ? "kg" : "lbs"})`}
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleInputChange}
              error={!!errors.currentWeight}
              helperText={errors.currentWeight}
              variant="outlined"
              margin="normal"
              inputProps={{ type: "number" }}
            />
            <TextField
              fullWidth
              label={`Height (${unitSystem === "metric" ? "cm" : "in"})`}
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              error={!!errors.height}
              helperText={errors.height}
              variant="outlined"
              margin="normal"
              inputProps={{ type: "number" }}
            />
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              error={!!errors.age}
              helperText={errors.age}
              variant="outlined"
              margin="normal"
              inputProps={{ min: 10, max: 120, type: "number" }}
            />
            <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
              <Typography variant="body1">Gender</Typography>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="nonBinary" control={<Radio />} label="Non-Binary" />
              </RadioGroup>
              {errors.gender && <Typography color="error">{errors.gender}</Typography>}
            </FormControl>
            <Box display="flex" justifyContent={step !== 1 ? "space-between" : "end"} marginTop={2}>
              {step !== 1 && <Button
                variant="outlined"
                color="primary"
                onClick={() => setStep(step - 1)}
              >
                ← Back
              </Button>}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next →
              </Button>
            </Box>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FormControl fullWidth margin="normal" error={!!errors.activityLevel}>
              <InputLabel>Activity Level</InputLabel>
              <Select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleInputChange}
              >
                <MenuItem value="">Choose an option</MenuItem>
                <MenuItem value="sedentary">Sedentary</MenuItem>
                <MenuItem value="lightlyActive">Lightly Active</MenuItem>
                <MenuItem value="moderatelyActive">Moderately Active</MenuItem>
                <MenuItem value="veryActive">Very Active</MenuItem>
                <MenuItem value="extremelyActive">Extremely Active</MenuItem>
              </Select>
              {errors.activityLevel && <Typography color="error">{errors.activityLevel}</Typography>}
            </FormControl>
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setStep(step - 1)}
              >
                ← Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next →
              </Button>
            </Box>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TextField
              fullWidth
              label={`Total Target Loss (${unitSystem === "metric" ? "kg" : "lbs"})`}
              name="weightLossGoal"
              value={formData.weightLossGoal}
              onChange={handleInputChange}
              error={!!errors.weightLossGoal}
              helperText={errors.weightLossGoal}
              variant="outlined"
              margin="normal"
              inputProps={{ min: 1, max: 100, type: "number" }}
            />
            <TextField
              fullWidth
              label="Time Frame (weeks)"
              name="weeks"
              value={formData.weeks}
              onChange={handleInputChange}
              error={!!errors.weeks}
              helperText={errors.weeks}
              variant="outlined"
              margin="normal"
              inputProps={{ min: 1, max: 52, type: "number" }}
            />
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setStep(step - 1)}
              >
                ← Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Calculate My Plan!
              </Button>
            </Box>
          </motion.div>
        );
      case 4:
        const results = calculateResults();
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Your Results
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Weekly Caloric Deficit:</strong> {parseFloat(results.weeklyWeightLoss).toFixed(2)} {unitSystem === "metric" ? "kg/week" : "lbs/week"}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Daily Caloric Target:</strong> {parseFloat(results.dailyCalories).toFixed(2)} calories/day
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Estimated Time to Goal:</strong> {results.timeToGoal} weeks
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleReset}
              >
                Calculate Again
              </Button>
            </Box>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "400px", width: "100%", overflow: "hidden" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Weight Loss Predictor
        </Typography>
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </Paper>
    </Grid>
  );
};

export default WeightLossPredictor;
