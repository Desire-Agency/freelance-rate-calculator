import { useState, useEffect } from "react"
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./calcItem.css"

export default function CalcItem() {
  const [formData, setFormData] = useState({
    loanAmount: '',
    annualInterestRate: '',
    amortizationPeriod: '',
    numberOfRegularPayments: '',
    beginDate: null
  });

  const [outputData, setOutputData] = useState({
    monthlyPayment: '',
    balloonPayment: '',
    totalPayments: '',
    totalInterestPaid: ''
  });

  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  const prettify = (str) => str.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1,");

  const PMT = (rate, nper, pv, fv, type) => {
    let pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (rate === 0)
      return -(pv + fv) / nper;

    pvif = Math.pow(1 + rate, nper);
    pmt = - rate * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
      pmt /= (1 + rate);
    return pmt;
  }

  useEffect(() => {
    if (Object.values(formData).every(x => !!x)) {
      const { loanAmount, annualInterestRate, amortizationPeriod, numberOfRegularPayments, beginDate } = formData;

      const annualInterestRateNum = annualInterestRate / 100 / 12;
      const amortizationPeriodMonths = amortizationPeriod * 12;

      const monthlyPaymentNum = PMT(annualInterestRateNum, amortizationPeriodMonths, -loanAmount, 0, 0);

      const schedule = [];
      let balance = Number(loanAmount);

      for (let i = 1; i <= Number(numberOfRegularPayments); i++) {
        const interest = balance * annualInterestRateNum;
        const payment = i === Number(numberOfRegularPayments) ? balance + interest : monthlyPaymentNum;
        const principal = payment.toFixed(2) - interest.toFixed(2);
        balance -= principal;

        const date = new Date(beginDate);
        date.setMonth(date.getMonth() + i);
        schedule.push({
          date: date.toLocaleDateString('en-US'),
          payment: payment.toFixed(2),
          interest: prettify(interest.toFixed(2)),
          principal: prettify(principal.toFixed(2)),
          balance: prettify(Math.abs(balance).toFixed(2))
        });
      }

      const totalPaymentsNum = schedule.reduce((acc, item) => Number(acc) + Number(item.payment), 0);
      const totalInterestPaidNum = totalPaymentsNum - loanAmount;

      setOutputData({
        monthlyPayment: prettify(monthlyPaymentNum.toFixed(2)),
        balloonPayment: prettify(schedule[schedule.length - 1].payment),
        totalPayments: prettify((totalPaymentsNum).toFixed(2)),
        totalInterestPaid: prettify(totalInterestPaidNum.toFixed(2))
      });

      setAmortizationSchedule(schedule);
    } else {
      setOutputData({})
    }
  }, [formData]);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div className="calculator">
        <h1>Commercial Real Estate Loan Calculator</h1>
        <div className="content">
          <div className="row_wrap grid-2">
            <FormControl>
              <InputLabel>Amount of the Loan</InputLabel>
              <OutlinedInput
                type="number"
                onWheel={(e) => e.target.blur()}
                value={formData.loanAmount}
                onChange={(e) => e.target.value.length <= 10 && setFormData({ ...formData, loanAmount: e.target.value })}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount of the Loan"
              />
            </FormControl>
            <FormControl>
              <InputLabel>Annual Interest Rate</InputLabel>
              <OutlinedInput
                onWheel={(e) => e.target.blur()}
                type="number"
                value={formData.annualInterestRate}
                onChange={(e) => e.target.value <= 100 && e.target.value.length <= 5 && setFormData({ ...formData, annualInterestRate: e.target.value })}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                label="Annual Interest Rate"
              />
            </FormControl>
          </div>
          <div className="row_wrap grid-2">
            <FormControl>
              <InputLabel>Amortization Period</InputLabel>
              <OutlinedInput
                type="number"
                onWheel={(e) => e.target.blur()}
                value={formData.amortizationPeriod}
                onChange={(e) => {
                  e.target.value <= 15 && e.target.value.length <= 2 && setFormData({ ...formData, amortizationPeriod: e.target.value })
                  formData.numberOfRegularPayments > e.target.value && setFormData({ ...formData, numberOfRegularPayments: "" })
                }}
                label="Amortization Period"
                endAdornment={<InputAdornment position="end">years</InputAdornment>}
              />
              <FormHelperText >max 10 years</FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel># of Regular Payments</InputLabel>
              <OutlinedInput
                type="number"
                onWheel={(e) => e.target.blur()}
                value={formData.numberOfRegularPayments}
                onChange={(e) => e.target.value.length <= 3 && e.target.value <= (formData.amortizationPeriod * 12) && setFormData({ ...formData, numberOfRegularPayments: e.target.value })}
                label="# of Regular Payments"
              />
              <FormHelperText>{formData.amortizationPeriod ? `max ${formData.amortizationPeriod * 12} payments` : "max 12 payments in year"}</FormHelperText>
            </FormControl>
          </div>
          <div className="row_wrap grid-2">
            <MobileDatePicker
              label="Start Date"
              disablePast
              value={formData.beginDate}
              onChange={(e) => setFormData({ ...formData, beginDate: e })}
            />
            <div className="reset_wrap">
              <button onClick={() => setFormData({
                loanAmount: '',
                annualInterestRate: '',
                amortizationPeriod: '',
                numberOfRegularPayments: '',
                beginDate: null
              })}>Reset</button>
            </div>
          </div>

          {!!Object.values(outputData)?.length && Object.values(outputData).every(x => !!x) &&
            <div className="table_wrap">
              <h2>Summary</h2>
              <div className="row_inner total_block total_inner">
                <div className="total_block_item">
                  <p>Monthly Payment:</p>
                  <span>${outputData.monthlyPayment}</span>
                </div>
                <div className="total_block_item">
                  <p>Balloon Payment:</p>
                  <span>${outputData.balloonPayment}</span>
                </div>
                <div className="total_block_item">
                  <p>Total Payments:</p>
                  <span>${outputData.totalPayments}</span>
                </div>
                <div className="total_block_item">
                  <p>Total Interest Paid:</p>
                  <span>${outputData.totalInterestPaid}</span>
                </div>
              </div>
            </div>}

          {!!Object.values(outputData)?.length && Object.values(outputData).every(x => !!x) &&
            <div className="table_wrap">
              <h2>Amortization Schedule</h2>
              <TableContainer component={Paper} sx={{ maxHeight: 560 }}>
                <Table stickyHeader sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="center">Payment</TableCell>
                      <TableCell align="center">Interest</TableCell>
                      <TableCell align="center">Principal</TableCell>
                      <TableCell align="right">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {amortizationSchedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="center">${prettify(row.payment)}</TableCell>
                        <TableCell align="center">${row.interest}</TableCell>
                        <TableCell align="center">${row.principal}</TableCell>
                        <TableCell align="right">${row.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>}

        </div>
      </div >
    </LocalizationProvider>)
}