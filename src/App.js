import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Tooltip,
  Grid,
  Paper,
  Stack,
  IconButton,
  useMediaQuery
} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion } from "framer-motion";

import "./App.css"

const FreelanceRateCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    rent: "",
    utilities: "",
    other: "",
    workEveryWeek: "",
  });
  const [errors, setErrors] = useState({});
  const matches = useMediaQuery('(min-width:600px)');


  const formatNumber = (num) => {
    return Math.round(num).toLocaleString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value) && parseFloat(value) >= 0) {
      setErrors({ ...errors, [name]: false });
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
        stepErrors.workEveryWeek = "Enter valid hours per week .";
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
            <Box style={{
              display: "flex", width: "100%",
              flexDirection: "column",
              gap: matches ? "24px" : "16px"

            }}>
              <Box style={{
                display: "flex",
                gap: matches ? "24px" : "16px",
                flexDirection: matches ? "row" : "column"

              }}>
                <Box style={{
                  display: "flex",
                  width: matches ? "calc(50% - 12px)" : "100%",
                  flexDirection: "column",
                }}>
                  <Typography
                    variant="p"
                    style={{ marginBottom: "12px", fontSize: matches ? "16px" : "14px", color: "#222222", fontWeight: 500, }}
                  >Rent or home payments</Typography>
                  <input
                    style={{
                      backgroundColor: "white",
                      '&:hover': { borderColor: "black" },
                      '&.Mui-focused': { borderColor: "black" },
                      padding: "0 10px",
                      height: "34px",
                      borderRadius: "4px",
                      border: `1px solid ${errors.rent ? "red" : "#D5E0D5"}`,
                    }}
                    placeholder="$/month"
                    type="number"
                    label="Rent or home payments"
                    name="rent"
                    value={formData.rent}
                    onChange={handleInputChange}

                  />
                </Box>
                <Box style={{
                  display: "flex",
                  width: matches ? "calc(50% - 12px)" : "100%",
                  flexDirection: "column"
                }}>
                  <Typography
                    variant="p"
                    style={{ marginBottom: "12px", fontSize: matches ? "16px" : "14px", color: "#222222", fontWeight: 500, }}
                  >Utilities</Typography>
                  <input
                    style={{
                      backgroundColor: "white",
                      '&:hover': { borderColor: "black" },
                      '&.Mui-focused': { borderColor: "black" },
                      padding: "0 10px",
                      height: "34px",
                      borderRadius: "4px",
                      border: `1px solid ${errors.utilities ? "red" : "#D5E0D5"}`
                    }}
                    placeholder="$/month"
                    label="Utilities"
                    type="number"
                    name="utilities"
                    value={formData.utilities}
                    onChange={handleInputChange}
                  />
                </Box>
              </Box>
              <Box style={{ display: "flex", width: "100%", flexDirection: "column", }}>
                <Typography
                  variant="p"
                  style={{ marginBottom: "12px", fontSize: matches ? "16px" : "14px", color: "#222222", fontWeight: 500, }}
                >Other (including food, health insurance, etc.)</Typography>
                <input
                  style={{
                    backgroundColor: "white",
                    '&:hover': { borderColor: "black" },
                    '&.Mui-focused': { borderColor: "black" },
                    padding: "0 10px",
                    height: "34px",
                    borderRadius: "4px",
                    border: `1px solid ${errors.other ? "red" : "#D5E0D5"}`
                  }}
                  placeholder="$/month"
                  label="Other"
                  name="other"
                  type="number"
                  value={formData.other}
                  onChange={handleInputChange}
                />
              </Box>
              <Box style={{ display: "flex", width: "100%", flexDirection: "column", }}>
                <Typography
                  variant="p"
                  style={{ marginBottom: "12px", fontSize: matches ? "16px" : "14px", color: "#222222", fontWeight: 500, }}
                >Minimum required monthly income</Typography>
                <input
                  style={{
                    backgroundColor: "#eee",
                    '&:hover': { borderColor: "black" },
                    '&.Mui-focused': { borderColor: "black" },
                    padding: "0 10px",
                    height: "34px",
                    borderRadius: "4px",
                    border: "1px solid #D5E0D5"
                  }}
                  placeholder="$/month"
                  label="Utilities"
                  name="utilities"
                  value={monthlyIncome ? `$ ${formatNumber(monthlyIncome)}` : ""}
                  disabled
                />
              </Box>
              <Box display="flex" justifyContent="end" marginTop="40px">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    if (validateStep()) setStep(2);
                  }}
                  style={{
                    borderRadius: "25px",
                    fontSize: "18px",
                    textTransform: "capitalize",
                    background: "#0f8a00",
                    '&:hover': { background: "#1cd006 !important" },
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box style={{ display: "flex", width: "100%", flexDirection: "column", gap: matches ? "24px" : "16px" }}>
              <Box style={{ display: "flex", width: "100%", flexDirection: "column", }}>
                <Typography
                  variant="p"
                  style={{ marginBottom: "12px", fontSize: matches ? "16px" : "14px", color: "#222222", fontWeight: 500, }}
                >How many hours do you plan to work every week?</Typography>
                <input
                  style={{
                    backgroundColor: "white",
                    '&:hover': { borderColor: "black" },
                    '&.Mui-focused': { borderColor: "black" },
                    padding: "0 10px",
                    height: "34px",
                    borderRadius: "4px",
                    border: `1px solid ${errors.workEveryWeek ? "red" : "#D5E0D5"}`
                  }}
                  placeholder="hours"
                  label="WorkEveryWeek"
                  type="number"
                  name="workEveryWeek"
                  value={formData.workEveryWeek}
                  onChange={handleInputChange}
                />
              </Box>
              <Box style={{ display: "flex", width: "100%", flexDirection: "column", }}>
                <Typography
                  variant="p"
                  style={{ marginBottom: "12px", fontSize: matches ? "16px" : "14px", color: "#222222", fontWeight: 500, }}
                >Total working hours every year</Typography>
                <input
                  style={{
                    backgroundColor: "#eee",
                    '&:hover': { borderColor: "black" },
                    '&.Mui-focused': { borderColor: "black" },
                    padding: "0 10px",
                    height: "34px",
                    borderRadius: "4px",
                    border: "1px solid #D5E0D5"
                  }}
                  placeholder="hours/year"
                  label="Total working hours every year"
                  name="utilities"
                  value={formData.workEveryWeek ? `${formatNumber((parseFloat(formData.workEveryWeek || 0)) * 52)}` : ""}
                  disabled
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop={4}>
              <Button
                variant="contained"
                onClick={() => setStep(1)}
                style={{
                  borderRadius: "25px",
                  fontSize: "18px",
                  textTransform: "capitalize",
                  background: "#0f8a00",
                  '&:hover': { background: "#1cd006 !important" },
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
                  borderRadius: "25px",
                  fontSize: "18px",
                  textTransform: "capitalize",
                  background: "#0f8a00",
                  '&:hover': { background: "#1cd006 !important" },
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
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5", color: "#5E6D55" }} display="flex" justifyContent="center" alignItems="center">${formatNumber(results.yearlyIncome)}</Box>
                <Typography>Estimated minimum required yearly income (pre-tax)</Typography>
              </Box>
              <Divider style={{ margin: "0px" }} />
              <Box style={{ margin: "10px 0" }} gap="24px" display="flex" justifyContent="start" marginTop={10} alignItems="center">
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5", color: "#5E6D55" }} display="flex" justifyContent="center" alignItems="center">${formatNumber(results.taxAllocation)}</Box>
                <Typography>Estimated tax allocation set aside (25%)</Typography>
              </Box>
              <Divider style={{ margin: "0px" }} />
              <Box style={{ margin: "10px 0" }} gap="24px" display="flex" justifyContent="start" marginTop={10} alignItems="center">
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5", color: "#5E6D55" }} display="flex" justifyContent="center" alignItems="center">${formatNumber(results.postTaxIncome)}</Box>
                <Typography>Estimated minimum required yearly income (post-tax)</Typography>
              </Box>
              <Divider style={{ margin: "0px" }} />
              <Box style={{ margin: "10px 0" }} gap="24px" display="flex" justifyContent="start" marginTop={10} alignItems="center">
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5", color: "#5E6D55" }} display="flex" justifyContent="center" alignItems="center">{formatNumber(results.totalWorkingHours)}</Box>
                <Typography>Estimated working hours per year</Typography>
              </Box>
              <Divider style={{ margin: "0px" }} />
              <Box style={{ margin: "10px 0" }} gap="24px" display="flex" justifyContent="start" marginTop={10} alignItems="center">
                <Box style={{ background: "#eee", width: "100px", minWidth: "100px", height: "34px", borderRadius: "10px", border: "1px solid D5E0D5", color: "#5E6D55" }} display="flex" justifyContent="center" alignItems="center">{formatNumber(results.billableHours)}</Box>
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
                    workEveryWeek: "",
                  });
                  setStep(1);
                }}
                style={{
                  borderRadius: "25px",
                  fontSize: "18px",
                  textTransform: "capitalize",
                  background: "#0f8a00",
                  '&:hover': { background: "#1cd006 !important" },
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
      <Paper elevation={3} style={{ padding: matches ? "24px" : "16px", maxWidth: "652px", width: "100%", borderRadius: "10px", background: "#F2F7F2", margin: "auto" }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ color: "#001e00", fontWeight: 500, marginBottom: "15px", fontSize: matches ? "52px" : "38px" }}
        >
          Freelance Rate Calculator
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          style={{ color: "#5e6d55", fontWeight: 400, fontSize: "16px", marginBottom: "32px", maxWidth: "532px" }}
        >
          Are you new to freelancing or re-evaluating your current hourly rate for your freelance business?
          Use our free tool to quickly learn tips on how to establish your minimum hourly freelance rate.
        </Typography>
        <Typography variant="h6" style={{ color: "#001e00", fontWeight: 500, fontSize: matches ? "22px" : "18px" }} display="flex" justifyContent="space-between" alignItems="center">
          <Box>{step === 1 ? "Monthly Expenses" : step === 2 ? "Weekly Working Hours" : "Your Estimated Minimum Hourly Rate"}</Box> <Box style={{ fontSize: "16px", textAlign: "end", minWidth: "60px", width: "60px" }}>{step} / 3</Box>
        </Typography>
        <Divider style={{ marginBottom: "10px" }} />
        {renderStep()}
      </Paper>
    </Grid>
  );
};

export default FreelanceRateCalculator;
