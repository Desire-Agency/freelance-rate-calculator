import { useState, useEffect } from "react"
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

  useEffect(() => {
    if (Object.values(formData).every(x => !!x)) {
      const { loanAmount, annualInterestRate, amortizationPeriod, numberOfRegularPayments, beginDate } = formData;

      const loanAmountNum = loanAmount;
      const annualInterestRateNum = annualInterestRate / 100;
      const amortizationPeriodNum = amortizationPeriod;
      const numberOfRegularPaymentsNum = numberOfRegularPayments;

      const monthlyInterestRate = annualInterestRateNum / 12;
      const x = Math.pow(1 + monthlyInterestRate, numberOfRegularPaymentsNum);
      const monthlyPaymentNum = (loanAmountNum * x * monthlyInterestRate) / (x - 1);
      const totalPaymentsNum = monthlyPaymentNum * numberOfRegularPaymentsNum;
      const totalInterestPaidNum = totalPaymentsNum - loanAmountNum;

      const schedule = [];
      let balance = loanAmountNum;

      for (let i = 1; i <= amortizationPeriodNum; i++) {
        const interest = balance * monthlyInterestRate;
        const payment = i === amortizationPeriodNum ? balance + interest : monthlyPaymentNum;
        const principal = payment - interest;
        balance -= principal;

        const date = new Date(beginDate);
        date.setMonth(date.getMonth() + i);
        schedule.push({
          month: i,
          date: date.toLocaleDateString('en-US'),
          payment: payment.toFixed(2),
          interest: prettify(interest.toFixed(2)),
          principal: prettify(principal.toFixed(2)),
          balance: prettify(balance.toFixed(2))
        });
      }

      setOutputData({
        balloonPayment: prettify(schedule[schedule.length - 1].payment),
        totalPayments: prettify((totalPaymentsNum).toFixed(2)),
        totalInterestPaid: prettify(totalInterestPaidNum.toFixed(2))
      });

      setAmortizationSchedule(schedule);
    } else {
      setOutputData({})
    }
  }, [formData]);

  console.log(formData)

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
                  e.target.value <= 120 && e.target.value.length <= 3 && setFormData({ ...formData, amortizationPeriod: e.target.value })
                  formData.numberOfRegularPayments > e.target.value && setFormData({ ...formData, numberOfRegularPayments: "" })
                }}
                label="Amortization Period"
                endAdornment={<InputAdornment position="end">months</InputAdornment>}
              />
            </FormControl>
            <FormControl>
              <InputLabel># of Regular Payments</InputLabel>
              <OutlinedInput
                type="number"
                onWheel={(e) => e.target.blur()}
                value={formData.numberOfRegularPayments}
                onChange={(e) => e.target.value <= 120 && e.target.value.length <= 3 && e.target.value <= formData.amortizationPeriod && setFormData({ ...formData, numberOfRegularPayments: e.target.value })}
                label="# of Regular Payments"
                endAdornment={<InputAdornment position="end">max {formData.amortizationPeriod}</InputAdornment>}

              />
            </FormControl>
          </div>
          <div className="row_wrap grid-2">
            <DatePicker value={formData.beginDate} onChange={(e) => setFormData({ ...formData, beginDate: e })} />
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
                      <TableCell align="left">Month</TableCell>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Payment</TableCell>
                      <TableCell align="center">Interest</TableCell>
                      <TableCell align="center">Principal</TableCell>
                      <TableCell align="right">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {amortizationSchedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell component="th" scope="row">{row.month}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.payment}</TableCell>
                        <TableCell align="center">{row.interest}</TableCell>
                        <TableCell align="center">{row.principal}</TableCell>
                        <TableCell align="right">{row.balance}</TableCell>
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