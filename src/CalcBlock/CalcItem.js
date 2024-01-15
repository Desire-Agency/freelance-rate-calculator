import { useState, useCallback } from "react"
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from '@mui/material/FormHelperText';

import "./calcItem.css"

const loanLengthOptions = ["12 months", "24 months", "36 months", "48 months", "60 months", "72 months", "84 months", "96 months"];

const dataByState = {
  "Alabama": {
    newOrUsed: { new: 7.37, used: 11.68 },
    salesTaxRate: 4.00,
    priceGas: { regular: 2.79, mid: 3.18, premium: 3.57, diesel: 3.83 },
    costPerKWH: 14.83,
    averageAnnualMileage: 17817,
    carInsurance: { average: 1542, highest: 2770, lowest: 847 }
  },
  "Alaska": {
    newOrUsed: { new: 8.95, used: 10.81 },
    salesTaxRate: 0.00,
    priceGas: { regular: 3.81, mid: 4.03, premium: 4.23, diesel: 4.24 },
    costPerKWH: 24.50,
    averageAnnualMileage: 11111,
    carInsurance: { average: 1359, highest: 2546, lowest: 812 }
  },
  "Arizona": {
    newOrUsed: { new: 7.40, used: 10.80 },
    salesTaxRate: 5.60,
    priceGas: { regular: 3.33, mid: 3.63, premium: 3.92, diesel: 4.15 },
    costPerKWH: 14.39,
    averageAnnualMileage: 13090,
    carInsurance: { average: 1617, highest: 4235, lowest: 799 }
  },
  "Arkansas": {
    newOrUsed: { new: 7.22, used: 11.15 },
    salesTaxRate: 6.50,
    priceGas: { regular: 2.73, mid: 3.11, premium: 3.49, diesel: 3.78 },
    costPerKWH: 12.67,
    averageAnnualMileage: 17224,
    carInsurance: { average: 1597, highest: 3830, lowest: 874 }
  },
  "California": {
    newOrUsed: { new: 6.99, used: 10.14 },
    salesTaxRate: 7.25,
    priceGas: { regular: 4.71, mid: 4.92, premium: 5.09, diesel: 5.63 },
    costPerKWH: 29.99,
    averageAnnualMileage: 12524,
    carInsurance: { average: 2115, highest: 5744, lowest: 950 }
  },
  "Colorado": {
    newOrUsed: { new: 7.30, used: 9.98 },
    salesTaxRate: 2.90,
    priceGas: { regular: 2.85, mid: 3.21, premium: 3.51, diesel: 3.85 },
    costPerKWH: 15.03,
    averageAnnualMileage: 12899,
    carInsurance: { average: 1940, highest: 5566, lowest: 733 }
  },
  "Connecticut": {
    newOrUsed: { new: 6.69, used: 9.44 },
    salesTaxRate: 6.35,
    priceGas: { regular: 3.31, mid: 3.90, premium: 4.31, diesel: 4.41 },
    costPerKWH: 29.25,
    averageAnnualMileage: 12117,
    carInsurance: { average: 1750, highest: 7636, lowest: 737 }
  },
  "Delaware": {
    newOrUsed: { new: 6.58, used: 10.98 },
    salesTaxRate: 0.00,
    priceGas: { regular: 3.01, mid: 3.53, premium: 3.81, diesel: 4.03 },
    costPerKWH: 15.83,
    averageAnnualMileage: 12609,
    carInsurance: { average: 2137, highest: 7679, lowest: 973 }
  },
  "District of Columbia": {
    newOrUsed: { new: 9.14, used: 10.78 },
    salesTaxRate: 6.00,
    priceGas: { regular: 3.38, mid: 4.00, premium: 4.32, diesel: 4.38 },
    costPerKWH: 16.28,
    averageAnnualMileage: 7013,
    carInsurance: { average: 2560, highest: 7910, lowest: 1162 }
  },
  "Florida": {
    newOrUsed: { new: 7.68, used: 10.89 },
    salesTaxRate: 6.00,
    priceGas: { regular: 2.99, mid: 3.41, premium: 3.74, diesel: 3.83 },
    costPerKWH: 15.51,
    averageAnnualMileage: 14557,
    carInsurance: { average: 1647, highest: 3690, lowest: 843 }
  },
  "Georgia": {
    newOrUsed: { new: 7.91, used: 12.15 },
    salesTaxRate: 4.00,
    priceGas: { regular: 3.02, mid: 3.45, premium: 3.82, diesel: 4.02 },
    costPerKWH: 14.01,
    averageAnnualMileage: 18334,
    carInsurance: { average: 1306, highest: 1833, lowest: 879 }
  },
  "Hawaii": {
    newOrUsed: { new: 7.70, used: 11.99 },
    salesTaxRate: 4.00,
    priceGas: { regular: 4.70, mid: 4.91, premium: 5.15, diesel: 5.68 },
    costPerKWH: 41.52,
    averageAnnualMileage: 11688,
    carInsurance: { average: 1121, highest: 2051, lowest: 573 }
  },
  "Idaho": {
    newOrUsed: { new: 6.74, used: 10.51 },
    salesTaxRate: 6.00,
    priceGas: { regular: 3.45, mid: 3.64, premium: 3.89, diesel: 4.30 },
    costPerKWH: 11.60,
    averageAnnualMileage: 14417,
    carInsurance: { average: 1578, highest: 10121, lowest: 645 }
  },
  "Illinois": {
    newOrUsed: { new: 6.85, used: 10.34 },
    salesTaxRate: 6.25,
    priceGas: { regular: 3.29, mid: 3.78, premium: 4.21, diesel: 4.09 },
    costPerKWH: 14.79,
    averageAnnualMileage: 12581,
    carInsurance: { average: 1256, highest: 3782, lowest: 521 }
  },
  "Indiana": {
    newOrUsed: { new: 6.77, used: 11.27 },
    salesTaxRate: 7.00,
    priceGas: { regular: 2.89, mid: 3.40, premium: 3.86, diesel: 4.15 },
    costPerKWH: 14.10,
    averageAnnualMileage: 18024,
    carInsurance: { average: 1321, highest: 4174, lowest: 731 }
  },
  "Iowa": {
    newOrUsed: { new: 6.31, used: 9.02 },
    salesTaxRate: 6.00,
    priceGas: { regular: 2.80, mid: 3.17, premium: 3.59, diesel: 3.89 },
    costPerKWH: 14.03,
    averageAnnualMileage: 14745,
    carInsurance: { average: 1594, highest: 3523, lowest: 830 }
  },
  "Kansas": {
    newOrUsed: { new: 6.61, used: 10.61 },
    salesTaxRate: 6.50,
    priceGas: { regular: 2.79, mid: 3.08, premium: 3.40, diesel: 3.84 },
    costPerKWH: 13.46,
    averageAnnualMileage: 14781,
    carInsurance: { average: 2105, highest: 6108, lowest: 972 }
  },
  "Kentucky": {
    newOrUsed: { new: 7.30, used: 11.92 },
    salesTaxRate: 6.00,
    priceGas: { regular: 2.82, mid: 3.29, premium: 3.70, diesel: 3.88 },
    costPerKWH: 12.43,
    averageAnnualMileage: 16305,
    carInsurance: { average: 2546, highest: 5958, lowest: 1050 }
  },
  "Louisiana": {
    newOrUsed: { new: 6.94, used: 11.97 },
    salesTaxRate: 4.45,
    priceGas: { regular: 2.72, mid: 3.09, premium: 3.48, diesel: 3.66 },
    costPerKWH: 11.39,
    averageAnnualMileage: 14951,
    carInsurance: { average: 1116, highest: 2542, lowest: 619 }
  },
  "Maine": {
    newOrUsed: { new: 6.22, used: 9.38 },
    salesTaxRate: 5.50,
    priceGas: { regular: 3.30, mid: 3.72, premium: 4.15, diesel: 4.41 },
    costPerKWH: 26.86,
    averageAnnualMileage: 14215,
    carInsurance: { average: 1640, highest: 4810, lowest: 707 }
  },
  "Maryland": {
    newOrUsed: { new: 6.96, used: 10.52 },
    salesTaxRate: 6.00,
    priceGas: { regular: 3.15, mid: 3.70, premium: 4.00, diesel: 4.12 },
    costPerKWH: 16.96,
    averageAnnualMileage: 13490,
    carInsurance: { average: 1538, highest: 4414, lowest: 495 }
  },
  "Massachusetts": {
    newOrUsed: { new: 6.90, used: 9.23 },
    salesTaxRate: 6.25,
    priceGas: { regular: 3.33, mid: 3.91, premium: 4.25, diesel: 4.33 },
    costPerKWH: 28.00,
    averageAnnualMileage: 13109,
    carInsurance: { average: 2133, highest: 16397, lowest: 847 }
  },
  "Michigan": {
    newOrUsed: { new: 6.96, used: 9.81 },
    salesTaxRate: 6.00,
    priceGas: { regular: 3.10, mid: 3.64, premium: 4.13, diesel: 4.11 },
    costPerKWH: 19.35,
    averageAnnualMileage: 14307,
    carInsurance: { average: 1493, highest: 3545, lowest: 791 }
  },
  "Minnesota": {
    newOrUsed: { new: 5.80, used: 10.31 },
    salesTaxRate: 6.88,
    priceGas: { regular: 2.94, mid: 3.29, premium: 3.69, diesel: 4.08 },
    costPerKWH: 15.29,
    averageAnnualMileage: 17909,
    carInsurance: { average: 1606, highest: 2984, lowest: 821 }
  },
  "Mississippi": {
    newOrUsed: { new: 7.34, used: 13.31 },
    salesTaxRate: 7.00,
    priceGas: { regular: 2.67, mid: 3.05, premium: 3.42, diesel: 3.65 },
    costPerKWH: 13.05,
    averageAnnualMileage: 19966,
    carInsurance: { average: 2104, highest: 10332, lowest: 736 }
  },
  "Missouri": {
    newOrUsed: { new: 6.66, used: 10.90 },
    salesTaxRate: 4.23,
    priceGas: { regular: 2.71, mid: 3.06, premium: 3.38, diesel: 3.72 },
    costPerKWH: 14.23,
    averageAnnualMileage: 18521,
    carInsurance: { average: 1692, highest: 3340, lowest: 789 }
  },
  "Montana": {
    newOrUsed: { new: 6.54, used: 11.46 },
    salesTaxRate: 0.00,
    priceGas: { regular: 3.05, mid: 3.32, premium: 3.63, diesel: 3.82 },
    costPerKWH: 13.18,
    averageAnnualMileage: 15880,
    carInsurance: { average: 2018, highest: 8922, lowest: 802 }
  },
  "Nebraska": {
    newOrUsed: { new: 6.12, used: 9.80 },
    salesTaxRate: 5.50,
    priceGas: { regular: 2.91, mid: 3.17, premium: 3.61, diesel: 3.83 },
    costPerKWH: 12.39,
    averageAnnualMileage: 14836,
    carInsurance: { average: 2023, highest: 7072, lowest: 688 }
  },
  "Nevada": {
    newOrUsed: { new: 7.67, used: 11.94 },
    salesTaxRate: 6.85,
    priceGas: { regular: 4.04, mid: 4.30, premium: 4.54, diesel: 4.43 },
    costPerKWH: 16.94,
    averageAnnualMileage: 14016,
    carInsurance: { average: 1307, highest: 5129, lowest: 660 }
  },
  "New Hampshire": {
    newOrUsed: { new: 6.77, used: 9.41 },
    salesTaxRate: 0.00,
    priceGas: { regular: 3.20, mid: 3.68, premium: 4.09, diesel: 4.24 },
    costPerKWH: 23.31,
    averageAnnualMileage: 11570,
    carInsurance: { average: 1901, highest: 5029, lowest: 887 }
  },
  "New Jersey": {
    newOrUsed: { new: 7.09, used: 10.84 },
    salesTaxRate: 6.63,
    priceGas: { regular: 3.19, mid: 3.79, premium: 4.06, diesel: 4.23 },
    costPerKWH: 18.02,
    averageAnnualMileage: 12263,
    carInsurance: { average: 1505, highest: 3155, lowest: 819 }
  },
  "New Mexico": {
    newOrUsed: { new: 7.64, used: 11.07 },
    salesTaxRate: 5.13,
    priceGas: { regular: 2.94, mid: 3.32, premium: 3.60, diesel: 4.00 },
    costPerKWH: 15.25,
    averageAnnualMileage: 19157,
    carInsurance: { average: 2020, highest: 15851, lowest: 468 }
  },
  "New York": {
    newOrUsed: { new: 7.18, used: 10.17 },
    salesTaxRate: 4.00,
    priceGas: { regular: 3.48, mid: 3.98, premium: 4.36, diesel: 4.55 },
    costPerKWH: 23.23,
    averageAnnualMileage: 10167,
    carInsurance: { average: 1368, highest: 2961, lowest: 689 }
  },
  "North Carolina": {
    newOrUsed: { new: 7.00, used: 10.87 },
    salesTaxRate: 4.75,
    priceGas: { regular: 2.96, mid: 3.37, premium: 3.76, diesel: 4.02 },
    costPerKWH: 14.09,
    averageAnnualMileage: 16073,
    carInsurance: { average: 1419, highest: 3184, lowest: 614 }
  },
  "North Dakota": {
    newOrUsed: { new: 6.76, used: 11.48 },
    salesTaxRate: 5.00,
    priceGas: { regular: 2.98, mid: 3.30, premium: 3.68, diesel: 4.06 },
    costPerKWH: 12.77,
    averageAnnualMileage: 17671,
    carInsurance: { average: 1023, highest: 2024, lowest: 516 }
  },
  "Ohio": {
    newOrUsed: { new: 7.36, used: 11.85 },
    salesTaxRate: 5.75,
    priceGas: { regular: 2.82, mid: 3.31, premium: 3.77, diesel: 4.09 },
    costPerKWH: 15.68,
    averageAnnualMileage: 14278,
    carInsurance: { average: 1797, highest: 3629, lowest: 880 }
  },
  "Oklahoma": {
    newOrUsed: { new: 6.98, used: 10.90 },
    salesTaxRate: 4.50,
    priceGas: { regular: 2.68, mid: 2.97, premium: 3.28, diesel: 3.65 },
    costPerKWH: 13.25,
    averageAnnualMileage: 17699,
    carInsurance: { average: 1244, highest: 2276, lowest: 681 }
  },
  "Oregon": {
    newOrUsed: { new: 6.77, used: 10.71 },
    salesTaxRate: 0.00,
    priceGas: { regular: 3.92, mid: 4.15, premium: 4.35, diesel: 4.51 },
    costPerKWH: 13.13,
    averageAnnualMileage: 12218,
    carInsurance: { average: 1445, highest: 7370, lowest: 636 }
  },
  "Pennsylvania": {
    newOrUsed: { new: 6.91, used: 10.62 },
    salesTaxRate: 6.00,
    priceGas: { regular: 3.50, mid: 3.91, premium: 4.22, diesel: 4.64 },
    costPerKWH: 18.01,
    averageAnnualMileage: 11445,
    carInsurance: { average: 1845, highest: 4510, lowest: 778 }
  },
  "Rhode Island": {
    newOrUsed: { new: 7.36, used: 10.00 },
    salesTaxRate: 7.00,
    priceGas: { regular: 3.24, mid: 3.90, premium: 4.24, diesel: 4.36 },
    costPerKWH: 26.94,
    averageAnnualMileage: 9961,
    carInsurance: { average: 1894, highest: 6425, lowest: 1037 }
  },
  "South Carolina": {
    newOrUsed: { new: 7.52, used: 11.61 },
    salesTaxRate: 6.00,
    priceGas: { regular: 2.84, mid: 3.23, premium: 3.60, diesel: 3.84 },
    costPerKWH: 14.52,
    averageAnnualMileage: 14941,
    carInsurance: { average: 1581, highest: 3397, lowest: 838 }
  },
  "South Dakota": {
    newOrUsed: { new: 4.90, used: 10.62 },
    salesTaxRate: 4.50,
    priceGas: { regular: 3.05, mid: 3.28, premium: 3.76, diesel: 3.88 },
    costPerKWH: 13.05,
    averageAnnualMileage: 15541,
    carInsurance: { average: 1373, highest: 3550, lowest: 743 }
  },
  "Tennessee": {
    newOrUsed: { new: 7.15, used: 10.63 },
    salesTaxRate: 7.00,
    priceGas: { regular: 2.80, mid: 3.19, premium: 3.56, diesel: 3.83 },
    costPerKWH: 11.85,
    averageAnnualMileage: 15287,
    carInsurance: { average: 1875, highest: 4722, lowest: 841 }
  },
  "Texas": {
    newOrUsed: { new: 7.35, used: 11.42 },
    salesTaxRate: 6.25,
    priceGas: { regular: 2.62, mid: 3.01, premium: 3.36, diesel: 3.53 },
    costPerKWH: 14.58,
    averageAnnualMileage: 16172,
    carInsurance: { average: 1469, highest: 3048, lowest: 665 }
  },
  "Utah": {
    newOrUsed: { new: 7.05, used: 9.27 },
    salesTaxRate: 6.10,
    priceGas: { regular: 2.97, mid: 3.18, premium: 3.39, diesel: 3.99 },
    costPerKWH: 11.85,
    averageAnnualMileage: 15516,
    carInsurance: { average: 1158, highest: 1978, lowest: 689 }
  },
  "Vermont": {
    newOrUsed: { new: 6.99, used: 9.22 },
    salesTaxRate: 6.00,
    priceGas: { regular: 3.41, mid: 3.94, premium: 4.35, diesel: 4.40 },
    costPerKWH: 21.21,
    averageAnnualMileage: 13004,
    carInsurance: { average: 1321, highest: 4189, lowest: 629 }
  },
  "Virginia": {
    newOrUsed: { new: 6.95, used: 10.41 },
    salesTaxRate: 5.30,
    priceGas: { regular: 3.03, mid: 3.49, premium: 3.84, diesel: 4.05 },
    costPerKWH: 14.79,
    averageAnnualMileage: 14509,
    carInsurance: { average: 1371, highest: 4125, lowest: 673 }
  },
  "Washington": {
    newOrUsed: { new: 6.68, used: 9.48 },
    salesTaxRate: 6.50,
    priceGas: { regular: 4.28, mid: 4.48, premium: 4.70, diesel: 5.08 },
    costPerKWH: 11.38,
    averageAnnualMileage: 10949,
    carInsurance: { average: 1858, highest: 3830, lowest: 862 }
  },
  "West Virginia": {
    newOrUsed: { new: 7.70, used: 11.06 },
    salesTaxRate: 6.00,
    priceGas: { regular: 3.13, mid: 3.48, premium: 3.84, diesel: 4.08 },
    costPerKWH: 14.38,
    averageAnnualMileage: 16876,
    carInsurance: { average: 1610, highest: 3088, lowest: 733 }
  },
  "Wisconsin": {
    newOrUsed: { new: 6.42, used: 9.59 },
    salesTaxRate: 5.00,
    priceGas: { regular: 2.83, mid: 3.32, premium: 3.73, diesel: 3.83 },
    costPerKWH: 17.32,
    averageAnnualMileage: 15442,
    carInsurance: { average: 1499, highest: 7358, lowest: 505 }
  },
  "Wyoming": {
    newOrUsed: { new: 6.15, used: 10.29 },
    salesTaxRate: 4.00,
    priceGas: { regular: 3.03, mid: 3.26, premium: 3.55, diesel: 4.10 },
    costPerKWH: 12.64,
    averageAnnualMileage: 24069,
    carInsurance: { average: 1736, highest: 2950, lowest: 808 }
  }
}



const DEF_ANNUAL_INCOME = "";
const DEF_NEW_OR_USED = "new";
const DEF_TYPE_OF_CAR = "gas";
const DEF_LOAN_LENGTH = "48 months";
const DEF_CAR_MPG = 24.2;
const DEF_CAR_MPKW = 3;
const DEF_STATE = {};


export default function CalcItem() {
  const [selectedStateName, setSelectedStateName] = useState()
  const [countAutocomplete, setCountAutocomplete] = useState(1)
  const [selectedState, setSelectedState] = useState(dataByState[DEF_STATE])
  const [annualIncome, setAnnualIncome] = useState(DEF_ANNUAL_INCOME)

  const [newOrUsed, setNewOrUsed] = useState(DEF_NEW_OR_USED)
  const [typeOfCar, setTypeOfCar] = useState(DEF_TYPE_OF_CAR)

  const [loanLength, setLoanLength] = useState(DEF_LOAN_LENGTH)
  const [loanInterest, setLoanInterest] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [monthlyDrivingDistance, setMonthlyDrivingDistance] = useState("")

  const [totalData, setTotalData] = useState({})

  const prettify = (str) => str === "NaN" ? "0" : str.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1,");

  const changeTotalInfo = useCallback((obj) => {
    if ((!!selectedStateName || obj.stateName) && (!!obj.annualIncome || annualIncome)) {
      const priceAffordValue = Number(obj.annualIncome || annualIncome) * 0.36;
      const monthlyLoanPaymentValue = (((obj.loanInterest || loanInterest) / 100 / 12) * (priceAffordValue - (obj.downPayment || downPayment)) / (1 - Math.pow((1 + ((obj.loanInterest || loanInterest) / 100 / 12)), -Number((obj.loanLength || loanLength).replace(" months", "")))))
      const totalLoanAmountValue = monthlyLoanPaymentValue * Number((obj.loanLength || loanLength).replace(" months", ""))
      const monthlyMaintenanceValue = 0.053 * (obj.monthlyDrivingDistance || monthlyDrivingDistance);
      const monthlyInterestPaidValue = (totalLoanAmountValue - (priceAffordValue - (obj.downPayment || downPayment))) / Number((obj.loanLength || loanLength).replace(" months", ""));
      const monthlyFuelCostValue = (obj.typeOfCar || typeOfCar) === "gas" ? (selectedState?.priceGas?.regular || obj.stateData.priceGas.regular) * (obj.monthlyDrivingDistance || monthlyDrivingDistance) / DEF_CAR_MPG :
        ((selectedState?.costPerKWH || obj.stateData.costPerKWH)) * (obj.monthlyDrivingDistance || monthlyDrivingDistance) / DEF_CAR_MPKW / 100;
      const estimatedMonthlyPaymentValue = monthlyLoanPaymentValue + ((selectedState?.carInsurance?.average || obj.stateData.carInsurance.average) / 12) + monthlyFuelCostValue + monthlyMaintenanceValue

      setTotalData({
        priceAfford: prettify((priceAffordValue).toFixed(0)).replace(/\.0+$/, ""),
        recommendedBudgetL: prettify((Number(obj.annualIncome || annualIncome) / 12 * 0.1).toFixed(0)).replace(/\.0+$/, ""),
        recommendedBudgetH: prettify((Number(obj.annualIncome || annualIncome) / 12 * 0.15).toFixed(0)).replace(/\.0+$/, ""),
        monthlyInsuranceCost: prettify(((selectedState?.carInsurance?.average || obj.stateData.carInsurance.average) / 12).toFixed(0)).replace(/\.0+$/, ""),
        monthlyFuelCost: prettify((monthlyFuelCostValue).toFixed(0)).replace(/\.0+$/, ""),
        monthlyLoanPayment: prettify((monthlyLoanPaymentValue).toFixed(0)).replace(/\.0+$/, ""),
        totalLoanAmount: prettify(totalLoanAmountValue.toFixed(0)).replace(/\.0+$/, ""),
        monthlyInterestPaid: prettify(monthlyInterestPaidValue.toFixed(0)).replace(/\.0+$/, ""),
        estimatedMonthlyPayment: prettify(estimatedMonthlyPaymentValue.toFixed(0)).replace(/\.0+$/, ""),
        monthlyMaintenance: prettify((monthlyMaintenanceValue).toFixed(0)).replace(/\.0+$/, ""),
      })
    }
  }, [loanInterest, monthlyDrivingDistance, annualIncome, selectedStateName, loanLength, downPayment, typeOfCar, selectedState])

  const changeAnnualIncome = useCallback((val) => {
    setAnnualIncome(val)
    setDownPayment((val * 0.072).toFixed(3).replace(/\.0+$/, ""))

    if (!!selectedStateName) {
      changeTotalInfo({
        annualIncome: val,
        downPayment: (val * 0.072).toFixed(3)
      })
    }
  }, [changeTotalInfo, selectedStateName])

  const changeSate = useCallback((val) => {
    setSelectedStateName(val);
    setSelectedState(dataByState[val])

    if (!!val) {
      setMonthlyDrivingDistance((dataByState[val].averageAnnualMileage / 12).toFixed(0))
      setLoanInterest(dataByState[val].newOrUsed[newOrUsed]);
      changeTotalInfo({
        stateName: val,
        stateData: dataByState[val],
        loanInterest: dataByState[val].newOrUsed[newOrUsed],
        monthlyDrivingDistance: (dataByState[val].averageAnnualMileage / 12).toFixed(0)
      })
    } else {
      setCountAutocomplete(countAutocomplete + 1)
    }
  }, [newOrUsed, changeTotalInfo, countAutocomplete])

  const changeNewOrUsed = useCallback((val) => {
    setNewOrUsed(val)

    if (!!selectedStateName) {
      setLoanInterest(dataByState[selectedStateName].newOrUsed[val]);
      changeTotalInfo({
        newOrUsed: val,
        loanInterest: dataByState[selectedStateName].newOrUsed[val],
      })
    }
  }, [changeTotalInfo, selectedStateName])

  const changeTypeOfCar = useCallback((val) => {
    setTypeOfCar(val)

    if (!!selectedStateName) {
      changeTotalInfo({ typeOfCar: val })
    }
  }, [changeTotalInfo, selectedStateName])

  const changeLoanLength = useCallback((val) => {
    setLoanLength(val)

    if (!!selectedStateName) {
      changeTotalInfo({ loanLength: val })
    }
  }, [changeTotalInfo, selectedStateName])

  const changeLoanInterest = useCallback((val) => {
    val ? setLoanInterest(val) : setLoanInterest(selectedState.newOrUsed[newOrUsed]);

    if (!!selectedStateName) {
      changeTotalInfo({ loanInterest: val ? val : selectedState.newOrUsed[newOrUsed] })
    }
  }, [changeTotalInfo, selectedStateName, newOrUsed, selectedState])

  const changeDownPayment = useCallback((val) => {
    val ? setDownPayment(val) : setDownPayment((annualIncome * 0.072).toFixed(3).replace(/\.0+$/, ""))


    if (!!selectedStateName) {
      changeTotalInfo({ downPayment: val ? val : (annualIncome * 0.072).toFixed(3) })
    }
  }, [changeTotalInfo, selectedStateName, annualIncome])

  const changeMonthlyDrivingDistance = useCallback((val) => {
    val ? setMonthlyDrivingDistance(val) : setMonthlyDrivingDistance((selectedState.averageAnnualMileage / 12).toFixed(0));

    if (!!selectedStateName) {
      changeTotalInfo({ monthlyDrivingDistance: val ? val : (selectedState.averageAnnualMileage / 12).toFixed(0) })

    }
  }, [changeTotalInfo, selectedStateName, selectedState])

  return (
    <div className="calculator">
      <h2>Car Affordability Calculator</h2>
      <div className="content">
        <div className="row_wrap grid-2">
          <FormControl>
            <InputLabel>Annual income</InputLabel>
            <OutlinedInput
              type="number"
              value={annualIncome}
              onChange={(e) => e.target.value.length <= 13 && changeAnnualIncome(e.target.value)}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Annual income"
            />
          </FormControl>
          <Autocomplete
            key={countAutocomplete}
            onChange={(e, value) => changeSate(value)}
            options={Object.keys(dataByState)}
            renderInput={(params) => <TextField  {...params} label="State of Residence " />}
          />
        </div>
        {(!!annualIncome && selectedState?.costPerKWH && !!selectedStateName) &&
          <>
            <div className="row_wrap grid-2">
              <div className="row_inner">
                <FormControl>
                  <InputLabel>New or Used?</InputLabel>
                  <Select label="New or Used?" value={newOrUsed} onChange={(e) => changeNewOrUsed(e.target.value)}  >
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="used">Used</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>Car Type</InputLabel>
                  <Select label="Car Type" value={typeOfCar} onChange={(e) => changeTypeOfCar(e.target.value)}    >
                    <MenuItem value="gas">Gas</MenuItem>
                    <MenuItem value="electric">Electric</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>Loan Length</InputLabel>
                  <Select label="Loan Length" value={loanLength} onChange={(e) => changeLoanLength(e.target.value)}   >
                    {loanLengthOptions.map((length) => <MenuItem key={length} value={length}>{length}</MenuItem>)}
                  </Select>
                  <FormHelperText>Recommended: 48 months or lower</FormHelperText>
                </FormControl>
                <FormControl>
                  <InputLabel>Car Loan Interest Rate</InputLabel>
                  <OutlinedInput
                    type="number"
                    value={loanInterest} onChange={(e) => e.target.value <= 100 && e.target.value.length <= 5 && changeLoanInterest(e.target.value)}
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    label="Car Loan Interest Rate"
                  />
                  <FormHelperText>Default car interest rate based on state average for {newOrUsed.toLocaleLowerCase()}</FormHelperText>
                </FormControl>
                <FormControl>
                  <InputLabel>Down Payment Amount</InputLabel>
                  <OutlinedInput
                    type="number"
                    value={downPayment} onChange={(e) => e.target.value.length <= 8 && changeDownPayment(e.target.value)}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Down Payment Amount"
                  />
                  <FormHelperText>Recommended: Down Payment should be between 10-20% of car price, at least, to reduce total interest paid and lower monthly payment</FormHelperText>
                </FormControl>
                <FormControl>
                  <InputLabel>Estimated Monthly Driving Distance</InputLabel>
                  <OutlinedInput
                    type="number"
                    value={monthlyDrivingDistance} onChange={(e) => e.target.value.length <= 7 && changeMonthlyDrivingDistance(e.target.value)}
                    endAdornment={<InputAdornment position="end">miles</InputAdornment>}
                    label="Estimated Monthly Driving Distance"
                  />
                </FormControl>
              </div>
              {!!(annualIncome && !!selectedStateName) &&
                <div className="row_inner total_block">
                  <div className="total_inner">
                    <div className="total_block_item">
                      <p>Price of car you can afford:</p>
                      <p className="helper">*Including sales taxes</p>
                      <span>${totalData.priceAfford}</span>
                    </div>
                  </div>
                  <span className="border_line"></span>
                  <div className="total_inner">
                    <div className="total_block_item">
                      <p>Total Loan Amount (including Interest):</p>
                      <span>${totalData.totalLoanAmount}</span>
                    </div>
                    <div className="total_block_item">
                      <p>Estimated monthly payment:</p>
                      <span>${totalData.estimatedMonthlyPayment}</span>
                    </div>
                    <div className="total_block_item">
                      <p>Recommended monthly budget (low - high):</p>
                      <span>${totalData.recommendedBudgetL} - {totalData.recommendedBudgetH}</span>
                    </div>
                  </div>
                  <span className="border_line"></span>
                  <div className="row_wrap">
                    <h3>Breakdown of Estimated Monthly Payment</h3>
                    <div className="row_wrap grid-2">
                      <div className="total_inner first">
                        <div className="total_block_item">
                          <p>Monthly Loan <br /> Payment:</p>
                          <span>${totalData.monthlyLoanPayment}</span>
                        </div>
                        <div className="total_block_item">
                          <p>Monthly Interest <br /> Paid:</p>
                          <span>${totalData.monthlyInterestPaid}</span>
                        </div>
                        <div className="total_block_item">
                          <p>Estimated Monthly Maintenance:</p>
                          <span>${totalData.monthlyMaintenance}</span>
                        </div>
                      </div>
                      <div className="total_inner last">
                        <div className="total_block_item">
                          <p>Estimated Monthly Insurance Cost:</p>
                          <span>${totalData.monthlyInsuranceCost}</span>
                        </div>
                        <div className="total_block_item">
                          <p>Estimated Monthly Fuel Cost:</p>
                          <span>${totalData.monthlyFuelCost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>
            <div className="reset_wrap">
              <button onClick={() => { setAnnualIncome(""); changeSate(undefined) }} >Reset</button>
            </div>
          </>}
      </div>
    </div >)
}
