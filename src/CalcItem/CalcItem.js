import { useState, useEffect } from "react"
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import "./calcItem.css"

export default function CalcItem() {
  const [formData, setFormData] = useState({
    preTaxHouseholdIncome: "",
    payPeriod: 'Yearly',
    monthlySpending: "",
    monthlyDebts: "",
  });

  const [outputData, setOutputData] = useState({
    monthlyIncome: '',
    estimatedTaxation: '',
    spending: '',
    debt: '',
    savings: '',
    monthlyRentBudget: ''
  });

  const prettify = (str) => parseFloat(str).toFixed(0).toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1,");

  useEffect(() => {
    if (!!formData.preTaxHouseholdIncome && !!formData.monthlySpending) {
      const { preTaxHouseholdIncome, payPeriod, monthlySpending, monthlyDebts } = formData;
      const monthlyIncome = payPeriod === "Yearly" ?
        Number(preTaxHouseholdIncome) / 12 : payPeriod === "Biweekly" ?
          Number(preTaxHouseholdIncome) * 2 : Number(preTaxHouseholdIncome);
      const estimatedTaxation = monthlyIncome * 0.25;
      const spending = Number(monthlySpending);

      const monthlyRentBudget =
        estimatedTaxation + spending + Number(monthlyDebts) + 0.3 * monthlyIncome <= monthlyIncome ?
          monthlyIncome * 0.3 :
          monthlyIncome - (estimatedTaxation + spending + Number(monthlyDebts))

      setOutputData({
        monthlyIncome: prettify(monthlyIncome),
        estimatedTaxation: prettify(estimatedTaxation),
        spending: prettify(spending),
        debt: prettify(monthlyDebts),
        savings: prettify(monthlyIncome - (estimatedTaxation + spending + Number(monthlyDebts) + monthlyRentBudget)),
        monthlyRentBudget: prettify(monthlyRentBudget),
        estimatedTaxationProc: prettify((estimatedTaxation / monthlyIncome) * 100),
        spendingProc: prettify((spending / monthlyIncome) * 100),
        debtProc: prettify((monthlyDebts / monthlyIncome) * 100),
        savingsProc: prettify((monthlyIncome - (estimatedTaxation + spending + Number(monthlyDebts) + monthlyRentBudget) / monthlyIncome) * 100),
        monthlyRentBudgetProc: prettify((monthlyRentBudget / monthlyIncome) * 100),
      });

    } else {
      setOutputData({})
    }
  }, [formData]);


  console.log(outputData)
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div className="calculator">
        <h1>Rental Affordability Calculator</h1>
        <div className="content">
          <div className="row_wrap grid-2">
            <FormControl>
              <InputLabel>Pre-Tax Household Income</InputLabel>
              <OutlinedInput
                type="number"
                onWheel={(e) => e.target.blur()}
                value={formData.preTaxHouseholdIncome}
                onChange={(e) => e.target.value.length <= 10 && setFormData({ ...formData, preTaxHouseholdIncome: e.target.value })}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Pre-Tax Household Income"
              />
            </FormControl>
            <FormControl>
              <InputLabel>Pay Period</InputLabel>
              <Select
                value={formData.payPeriod}
                label="Pay Period"
                onChange={(e) => setFormData({ ...formData, payPeriod: e.target.value })} >
                <MenuItem value="Yearly">Yearly</MenuItem>
                <MenuItem value="Biweekly">Biweekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Annually">Annually</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="row_wrap grid-2">
            <FormControl>
              <InputLabel>Monthly Spending</InputLabel>
              <OutlinedInput
                type="number"
                onWheel={(e) => e.target.blur()}
                value={formData.monthlySpending}
                onChange={(e) => e.target.value.length <= 10 && setFormData({ ...formData, monthlySpending: e.target.value })}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Monthly Spending"
              />
            </FormControl>
            <FormControl>
              <InputLabel>Monthly Debts</InputLabel>
              <OutlinedInput
                type="number"
                onWheel={(e) => e.target.blur()}
                value={formData.monthlyDebts}
                onChange={(e) => e.target.value.length <= 10 && setFormData({ ...formData, monthlyDebts: e.target.value })}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Monthly Debts"
              />
            </FormControl>
          </div>

          {!!formData.preTaxHouseholdIncome && !!formData.monthlySpending &&
            <div className="table_wrap">
              <h2>Budgeting Breakdown</h2>
              <div className="row_inner total_block total_inner">
                <div className="total_block_item">
                  <p>Monthly Income</p>
                  <span>${outputData.monthlyIncome}</span>
                </div>
                <div className="total_block_item">
                  <p>Estimated Taxation
                    <Tooltip
                      title="This is an estimation. Your actual taxation may vary based on factors including filing status, location, and tax brackets."
                      placement="top"
                      fontSize="sm"
                    >
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </p>
                  <div>
                    <span>${outputData.estimatedTaxation}</span>
                    <span>{outputData.estimatedTaxationProc}%</span>
                  </div>
                </div>
                <div className="total_block_item">
                  <p>Spending</p>
                  <div>
                    <span>${outputData.spending}</span>
                    <span>{outputData.spendingProc}%</span>
                  </div>
                </div>
                {Number(outputData.debt) > 0 &&
                  <div className="total_block_item">
                    <p>Debt</p>
                    <div>
                      <span>${outputData.debt}</span>
                      <span>{outputData.debtProc}%</span>
                    </div>
                  </div>
                }
                {Number(outputData.savings) > 0 &&
                  <div className="total_block_item">
                    <p>Savings</p>
                    <div>
                      <span>${outputData.savings}</span>
                      <span>{outputData.savingsProc}%</span>
                    </div>
                  </div>
                }
                <div className="total_block_item">
                  <p>Monthly Rent Budget</p>
                  <div>
                    <span>${outputData.monthlyRentBudget}</span>
                    <span>{outputData.monthlyRentBudgetProc}%</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </LocalizationProvider>)
}