import { useState, useEffect } from "react"
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import "./calcItem.css"

export default function CalcItem() {
  const [formData, setFormData] = useState({
    preTaxHouseholdIncome: "",
    payPeriod: undefined,
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
      const monthlyIncome = payPeriod === "Monthly" ?
        Number(preTaxHouseholdIncome) : payPeriod === "Biweekly" ?
          Number(preTaxHouseholdIncome) * 2  : Number(preTaxHouseholdIncome) / 12;

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
              <div className="row_inner total_block total_inner">
                <h2>Budgeting Breakdown</h2>
                <div class="total_block_item_wrap">
                  <div className="total_block_item monthlyIncome">
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z" fill="#EE454F" />
                    </svg>
                    <p>Monthly Income</p>
                    <span>${outputData.monthlyIncome}</span>
                  </div>
                  <div className="total_block_item estimatedTaxation">
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z" fill="#37A564" />
                    </svg>
                    <p>Estimated Taxation</p>
                    <div>
                      <span>${outputData.estimatedTaxation}</span>
                      <span>{outputData.estimatedTaxationProc}%</span>
                    </div>
                  </div>
                  <div className="total_block_item spending">
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z" fill="#f8ab16" />
                    </svg>
                    <p>Spending</p>
                    <div>
                      <span>${outputData.spending}</span>
                      <span>{outputData.spendingProc}%</span>
                    </div>
                  </div>
                  {Number(outputData.debt) > 0 &&
                    <div className="total_block_item debt">
                      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z" fill="#9b45ad" />
                      </svg>
                      <p>Debt</p>
                      <div>
                        <span>${outputData.debt}</span>
                        <span>{outputData.debtProc}%</span>
                      </div>
                    </div>}
                  {Number(outputData.savings) > 0 &&

                    <div className="total_block_item savings">
                      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z" fill="#2681DB" />
                      </svg>
                      <p>Savings</p>
                      <div>
                        <span>${outputData.savings}</span>
                        <span>{outputData.savingsProc}%</span>
                      </div>
                    </div>}
                  <div className="total_block_item monthlyRentBudget">
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z" fill="#373373" />
                    </svg>
                    <p>Monthly Rent Budget</p>
                    <div>
                      <span>${outputData.monthlyRentBudget}</span>
                      <span>{outputData.monthlyRentBudgetProc}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </LocalizationProvider>)
}