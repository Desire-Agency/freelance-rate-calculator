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
        stepErrors.rent = "Enter valid rent or home payment.";
      }
      if (!formData.utilities || isNaN(formData.utilities) || parseFloat(formData.utilities) <= 0) {
        stepErrors.utilities = "Enter valid utilities expense.";
      }
      if (!formData.other || isNaN(formData.other) || parseFloat(formData.other) <= 0) {
        stepErrors.other = "Enter valid other expenses (food, insurance, etc.).";
      }
    } else if (step === 2) {
      if (!formData.weeklyHours || isNaN(formData.weeklyHours) || parseFloat(formData.weeklyHours) <= 0) {
        stepErrors.weeklyHours = "Enter valid weekly working hours.";
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
              Freelance Rate Calculator
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6">Monthly Expenses</Typography>
            <TextField
              fullWidth
              label="Rent or Home Payments"
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
              label="Other (Food, Insurance, etc.)"
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
              Freelance Rate Calculator
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6">Weekly Working Hours</Typography>
            <TextField
              fullWidth
              label="Hours Per Week"
              name="weeklyHours"
              value={formData.weeklyHours}
              onChange={handleInputChange}
              margin="normal"
              type="number"
              error={!!errors.weeklyHours}
              helperText={errors.weeklyHours}
            />
            <Typography marginTop={2}>
              Total Working Hours Per Year: {formatNumber(parseFloat(formData.weeklyHours || 0) * 52)}
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
              Your Estimated Minimum Hourly Rate: ${formatNumber(results.hourlyRate)}
            </Typography>
            <Stack spacing={2} sx={{ padding: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
              <Box display="flex" justifyContent="space-between">
                <Typography>Estimated Yearly Income (Pre-Tax):</Typography>
                <Typography>${formatNumber(results.yearlyIncome)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Tax Allocation (25%):</Typography>
                <Typography>${formatNumber(results.taxAllocation)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Estimated Yearly Income (Post-Tax):</Typography>
                <Typography>${formatNumber(results.postTaxIncome)}</Typography>
              </Box>
            </Stack>
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
