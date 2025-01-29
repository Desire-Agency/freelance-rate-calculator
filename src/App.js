import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

const FreelanceRateCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    rent: "",
    utilities: "",
    other: "",
    weeklyHours: "",
    yearlyIncome: "",
  });
  const [errors, setErrors] = useState({});

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value) && parseFloat(value) >= 0) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = () => {
    const stepErrors = {};

    if (step === 1) {
      if (!formData.rent || isNaN(formData.rent) || parseFloat(formData.rent) <= 0) {
        stepErrors.rent = "Enter valid rent.";
      }
      if (!formData.utilities || isNaN(formData.utilities) || parseFloat(formData.utilities) <= 0) {
        stepErrors.utilities = "Enter valid utilities.";
      }
      if (!formData.other || isNaN(formData.other) || parseFloat(formData.other) <= 0) {
        stepErrors.other = "Enter valid expenses.";
      }
    } else if (step === 2) {
      if (!formData.weeklyHours || isNaN(formData.weeklyHours) || parseFloat(formData.weeklyHours) <= 0) {
        stepErrors.weeklyHours = "Enter valid hours.";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const calculateResults = () => {
    const monthlyIncome = parseFloat(formData.rent) + parseFloat(formData.utilities) + parseFloat(formData.other);
    const yearlyIncome = monthlyIncome * 12;
    const taxAllocation = yearlyIncome * 0.25;
    const postTaxIncome = yearlyIncome - taxAllocation;
    const totalWorkingHours = parseFloat(formData.weeklyHours) * 52;
    const billableHours = totalWorkingHours * 0.6;
    const hourlyRate = postTaxIncome / billableHours;

    return {
      monthlyIncome,
      yearlyIncome,
      taxAllocation,
      postTaxIncome,
      totalWorkingHours,
      billableHours,
      hourlyRate,
    };
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Rate Calculator
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6">Monthly Expenses</Typography>
            <TextField
              fullWidth
              label="Rent"
              name="rent"
              value={formData.rent}
              onChange={handleInputChange}
              margin="normal"
              type="number"
              error={!!errors.rent}
              helperText={errors.rent}
            />
            <TextField
              fullWidth
              label="Utilities"
              name="utilities"
              value={formData.utilities}
              onChange={handleInputChange}
              margin="normal"
              type="number"
              error={!!errors.utilities}
              helperText={errors.utilities}
            />
            <TextField
              fullWidth
              label="Other"
              name="other"
              value={formData.other}
              onChange={handleInputChange}
              margin="normal"
              type="number"
              error={!!errors.other}
              helperText={errors.other}
            />
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (validateStep()) setStep(2);
                }}
              >
                Next
              </Button>
            </Box>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Rate Calculator
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6">Weekly Hours</Typography>
            <TextField
              fullWidth
              label="Hours per week"
              name="weeklyHours"
              value={formData.weeklyHours}
              onChange={handleInputChange}
              margin="normal"
              type="number"
              error={!!errors.weeklyHours}
              helperText={errors.weeklyHours}
            />
            <Typography marginTop={2}>
              Total hours/year: {formatNumber(parseFloat(formData.weeklyHours || 0) * 52)}
            </Typography>
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (validateStep()) setStep(3);
                }}
              >
                Calculate
              </Button>
            </Box>
          </motion.div>
        );
      case 3:
        const results = calculateResults();
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Results
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h5" align="center" gutterBottom>
              Hourly Rate: ${formatNumber(results.hourlyRate)}
            </Typography>
            <Stack spacing={2} sx={{ padding: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
              <Box display="flex" justifyContent="space-between">
                <Typography>Yearly Income (pre-tax):</Typography>
                <Typography>${formatNumber(results.yearlyIncome)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Taxes (25%):</Typography>
                <Typography>${formatNumber(results.taxAllocation)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Yearly Income (post-tax):</Typography>
                <Typography>${formatNumber(results.postTaxIncome)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Total Hours/Year:</Typography>
                <Typography>{formatNumber(results.totalWorkingHours)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Billable Hours:</Typography>
                <Typography>{formatNumber(results.billableHours)}</Typography>
              </Box>
            </Stack>
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setFormData({
                    rent: "",
                    utilities: "",
                    other: "",
                    weeklyHours: "",
                    yearlyIncome: "",
                  });
                  setStep(1);
                }}
              >
                Start Over
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
      <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px", width: "100%", borderRadius: "10px" }}>
        {renderStep()}
      </Paper>
    </Grid>
  );
};

export default FreelanceRateCalculator;
