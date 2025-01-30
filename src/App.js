import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Tooltip,
  Grid,
  Paper,
  Stack,
  IconButton
} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion } from "framer-motion";

const FreelanceRateCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    rent: "",
    utilities: "",
    other: "",
    workEveryWeek: "",
  });
  const [errors, setErrors] = useState({});

  const formatNumber = (num) => {
    return Math.round(num).toLocaleString();
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
      if (!formData.rent || parseFloat(formData.rent) <= 0) {
        stepErrors.rent = "Enter valid rent or home payment.";
      }
      if (!formData.utilities || parseFloat(formData.utilities) <= 0) {
        stepErrors.utilities = "Enter valid utilities expense.";
      }
      if (!formData.other || parseFloat(formData.other) <= 0) {
        stepErrors.other = "Enter valid other expenses.";
      }
    } else if (step === 2) {
      if (!(formData.workEveryWeek > 0)) {
        stepErrors.sickDays = "Enter valid hours per week .";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const calculateResults = () => {
    const monthlyIncome =
      parseFloat(formData.rent || 0) +
      parseFloat(formData.utilities || 0) +
      parseFloat(formData.other || 0);
    const yearlyIncome = monthlyIncome * 12;
    const taxAllocation = yearlyIncome * 0.25;
    const postTaxIncome = yearlyIncome - taxAllocation;

    const totalWorkingHours = 52 * (parseFloat(formData.workEveryWeek) || 0);
    const billableHours = totalWorkingHours * 0.6;
    const hourlyRate = yearlyIncome / billableHours;

    return {
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
        const monthlyIncome = parseFloat(formData.rent || 0) + parseFloat(formData.utilities || 0) + parseFloat(formData.other || 0);
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box style={{ display: "flex", gap: "24px" }}>
              <TextField
                fullWidth
                label="Rent or home payments"
                name="rent"
                background="white"
                value={formData.rent}
                onChange={handleInputChange}
                margin="normal"
                size="small"
                type="number"
                error={!!errors.rent}
                style={{
                  backgroundColor: "white",
                  '&:hover': { borderColor: "black" },
                  '&.Mui-focused': { borderColor: "black" },
                }}
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
                size="small"
                style={{
                  backgroundColor: "white",
                  '&:hover': { borderColor: "black" },
                  '&.Mui-focused': { borderColor: "black" },
                }}
              />
            </Box>
            <TextField
              fullWidth
              label="Other Expenses (Food/Insurance)"
              name="other"
              value={formData.other}
              onChange={handleInputChange}
              margin="normal"
              type="number"
              error={!!errors.other}
              size="small"
              style={{
                backgroundColor: "white",
                '&:hover': { borderColor: "black" },
                '&.Mui-focused': { borderColor: "black" },
              }}
            />
            <TextField
              fullWidth
              label="Minimum Required Monthly Income"
              value={formatNumber(monthlyIncome)}
              margin="normal"
              type="text"
              size="small"
              disabled
              style={{
                backgroundColor: "#eee",
                '&:hover': { borderColor: "black" },
                '&.Mui-focused': { borderColor: "black" },
              }}
            />
            <Box display="flex" justifyContent="end" marginTop={4}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  if (validateStep()) setStep(2);
                }}
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#108a00",
                  '&:hover': { backgroundColor: "#14A800" },
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
            <TextField
              fullWidth
              label="How many hours do you plan to work every week?"
              name="workEveryWeek"
              value={formData.workEveryWeek}
              onChange={handleInputChange}
              margin="normal"
              size="small"
              type="number"
              style={{
                backgroundColor: "white",
                '&:hover': { borderColor: "black" },
                '&.Mui-focused': { borderColor: "black" },
              }}
            />
            <TextField
              size="small"
              fullWidth
              label="Total Working Hours/Year"
              value={formatNumber((parseFloat(formData.workEveryWeek || 0)) * 52)}
              margin="normal"
              type="text"
              disabled
              style={{
                marginTop: "16px",
                backgroundColor: "#eee",
                '&:hover': { borderColor: "black" },
                '&.Mui-focused': { borderColor: "black" },
              }}
            />
            <Box display="flex" justifyContent="space-between" marginTop={4}>
              <Button
                variant="contained"
                onClick={() => setStep(1)}
                style={{
                  backgroundColor: "#108a00",
                  borderRadius: "20px",
                  '&:hover': { backgroundColor: "#14A800" },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (validateStep()) setStep(3);
                }}
                style={{
                  backgroundColor: "#108a00",
                  borderRadius: "20px",
                  '&:hover': { backgroundColor: "#14A800" },
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
            <Stack spacing={2} style={{ borderRadius: "8px", marginTop: 4 }}  >
              <Box style={{ margin: "10px 0" }} display="flex" alignItems="center" justifyContent="space-between" marginBottom="35px">
                <Box style={{ fontSize: "56px", color: "#001E00", }}>${formatNumber(results.hourlyRate)}</Box>
                <img style={{ height: "100%", maxHeight: "80px", display: "block" }} src="images/img.png" alt="" />
              </Box>
              <Divider style={{ marginTop: "32px" }} />
              <Box style={{ margin: "10px 0" }} gap="24px" display="flex" justifyContent="start" marginTop={10} alignItems="center">
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5" }} display="flex" justifyContent="center" alignItems="center">${formatNumber(results.yearlyIncome)}</Box>
                <Typography>Estimated minimum required yearly income (pre-tax)</Typography>
              </Box>
              <Divider style={{ margin: "0px" }} />
              <Box style={{ margin: "10px 0" }} gap="24px" display="flex" justifyContent="start" marginTop={10} alignItems="center">
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5" }} display="flex" justifyContent="center" alignItems="center">${formatNumber(results.taxAllocation)}</Box>
                <Typography>Estimated tax allocation set aside (25%)</Typography>
              </Box>
              <Divider style={{ margin: "0px" }} />
              <Box style={{ margin: "10px 0" }} gap="24px" display="flex" justifyContent="start" marginTop={10} alignItems="center">
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5" }} display="flex" justifyContent="center" alignItems="center">${formatNumber(results.postTaxIncome)}</Box>
                <Typography>Estimated minimum required yearly income (post-tax)</Typography>
              </Box>
              <Divider style={{ margin: "0px" }} />
              <Box style={{ margin: "10px 0" }} gap="24px" display="flex" justifyContent="start" marginTop={10} alignItems="center">
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5" }} display="flex" justifyContent="center" alignItems="center">{formatNumber(results.totalWorkingHours)}</Box>
                <Typography>Estimated working hours per year</Typography>
              </Box>
              <Divider style={{ margin: "0px" }} />
              <Box style={{ margin: "10px 0" }} gap="24px" display="flex" justifyContent="start" marginTop={10} alignItems="center">
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5" }} display="flex" justifyContent="center" alignItems="center">{formatNumber(results.billableHours)}</Box>
                <Typography>Estimated billable hours
                  <Tooltip
                    title="To help determine your estimate for your total annual billable hours, let's start with how much you want to work. That means looking at the days you'd want to spend doing other things. You may be familiar with this equation: 40 hours/week x 52 weeks/year = 2,080 hours/year. This equation shows that if you work the conventional 40-hour workweek, 52 weeks per year without breaks, you will work 2,080 hours per year. On average, only 60% of your working hours will be billable for clients, while roughly 40% of the time will be spent on administrative tasks such as client sourcing. Calculate Again Create your freelance profile today Find Work"
                  >
                    <IconButton>
                      <InfoOutlinedIcon width="10px" />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </Box>
              <Divider style={{ margin: "0px" }} />
            </Stack >
            <Box display="flex" justifyContent="center" marginTop={4}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setFormData({
                    rent: "",
                    utilities: "",
                    other: "",
                    holidays: "",
                    sickDays: "",
                  });
                  setStep(1);
                }}
                style={{
                  backgroundColor: "#108a00",
                  borderRadius: "20px",
                  '&:hover': { backgroundColor: "#14A800" },
                }}
              >
                Calculate again
              </Button>
            </Box>
          </motion.div >
        );
      default:
        return null;
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100%", minHeight: "100dvh", padding: "15px" }}>
      <Paper elevation={3} style={{ padding: "24px", maxWidth: "652px", width: "100%", borderRadius: "10px", background: "#F2F7F2", margin: "auto" }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ color: "#001e00", fontWeight: 500, marginBottom: "15px" }}
        >
          Freelance Rate Calculator
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          style={{ color: "#5e6d55", fontWeight: 400, fontSize: "16px", marginBottom: "45px" }}
        >
          Are you new to freelancing or re-evaluating your current hourly rate for your freelance
          business? Use our free tool to quickly learn tips on how to establish your minimum
          hourly freelance rate.
        </Typography>
        <Typography variant="h6" style={{ color: "#001e00", fontWeight: 400, fontSize: "22px" }} display="flex" justifyContent="space-between" alignItems="center">
          <Box>{step !== 3 ? "Monthly Expenses" : "Your Estimated Minimum Hourly Rate"}</Box> <Box style={{ fontSize: "20px", textAlign: "end", minWidth: "60px", width: "60px" }}>{step} / 3</Box>
        </Typography>
        <Divider style={{ marginBottom: "10px" }} />
        {renderStep()}
      </Paper>
    </Grid>
  );
};

export default FreelanceRateCalculator;
