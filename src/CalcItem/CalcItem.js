import { useState, useEffect } from "react"
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import "./calcItem.css"

export default function CalcItem() {
  const [fields, setFields] = useState({
    amount: "",
    annual: "",
    amortizationTerm: "",
    loanDueTerm: "",
  })

  const [totalData, setTotalData] = useState({})

  const prettify = (str) => str.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1,");

  useEffect(() => {
    if (Object.values(fields).every(x => !!x)) {
      const piPaymentValue = fields.amount * ((fields.annual / 100 / 12) / (1 - Math.pow((1 + (fields.annual / 100 / 12)), fields.amortizationTerm * -12)));
      const interestOnlyPaymentValue = fields.amount * (fields.annual / 100) / 12;
      const balloonPaymentValue = fields.amount - (fields.loanDueTerm * 12) * (piPaymentValue - interestOnlyPaymentValue.toFixed(2));

      setTotalData({
        piPayment: prettify((piPaymentValue).toFixed(2)).replace(/\.0+$/, ""),
        interestOnlyPayment: prettify((interestOnlyPaymentValue).toFixed(2)).replace(/\.0+$/, ""),
        balloonPayment: prettify((balloonPaymentValue).toFixed(2)).replace(/\.0+$/, "")
      })
    } else {
      setTotalData({})
    }
  }, [fields])

  return (
    <div className="calculator">
      <h1>Commercial Real Estate Loan Calculator</h1>
      <div className="content">
        <div className="row_wrap grid-2">
          <FormControl>
            <InputLabel>Amount of the Loan</InputLabel>
            <OutlinedInput
              type="number"
              onWheel={(e) => e.target.blur()}
              value={fields.amount}
              onChange={(e) => e.target.value.length <= 13 && setFields({ ...fields, amount: e.target.value })}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount of the Loan"
            />
          </FormControl>
          <FormControl>
            <InputLabel>Annual Interest Rate</InputLabel>
            <OutlinedInput
              onWheel={(e) => e.target.blur()}
              type="number"
              value={fields.annual}
              onChange={(e) => e.target.value <= 100 && e.target.value.length <= 6 && setFields({ ...fields, annual: e.target.value })}
              endAdornment={<InputAdornment position="end">APR</InputAdornment>}
              label="Annual Interest Rate"
            />
          </FormControl>
        </div>
        <div className="row_wrap grid-2">
          <FormControl>
            <InputLabel>Amortization Term</InputLabel>
            <OutlinedInput
              type="number"
              onWheel={(e) => e.target.blur()}
              value={fields.amortizationTerm}
              onChange={(e) => e.target.value.length <= 3 && setFields({ ...fields, amortizationTerm: e.target.value })}
              label="Amortization Term"
              endAdornment={<InputAdornment position="end">Years</InputAdornment>}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Loan Due Term</InputLabel>
            <OutlinedInput
              type="number"
              onWheel={(e) => e.target.blur()}
              value={fields.loanDueTerm}
              onChange={(e) => e.target.value.length <= 3 && setFields({ ...fields, loanDueTerm: e.target.value })}
              label="Loan Due Term"
              endAdornment={<InputAdornment position="end">Years</InputAdornment>}
            />
          </FormControl>
        </div>

        {Object.values(fields).every(x => !!x) &&
          <>
            <div className="row_inner total_block total_inner">
              <div className="total_block_item">
                <p>P&I Payment:</p>
                <span>${totalData.piPayment}</span>
              </div>
              <div className="total_block_item">
                <p>Interest-Only payment:</p>
                <span>${totalData.interestOnlyPayment}</span>
              </div>
              <div className="total_block_item">
                <p>Balloon Payment:</p>
                <span>${totalData.balloonPayment}</span>
              </div>
            </div>
            <div className="reset_wrap">
              <button onClick={() => setFields({ amount: "", annual: "", amortizationTerm: "", loanDueTerm: "" })} >Reset</button>
            </div>
          </>}
      </div>
    </div >)
}