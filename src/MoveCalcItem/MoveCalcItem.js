import { useState, useEffect } from "react"

import "./moveCalcItem.css"

export default function MoveCalcItem() {
  const [values, setValues] = useState({})
  const [totalData, setTotalData] = useState({})

  const prettify = (str) => str.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1,");

  useEffect(() => {
    if (values?.billedAmount &&
      values?.desiredTip &&
      values?.numberOfMovers) {

      const tipAmountValue = Number(values.billedAmount) * Number(values.desiredTip) / 100;

      setTotalData({
        tipAmount: prettify((tipAmountValue).toFixed(0)).replace(/\.0+$/, ""),
        tipPerMover: prettify((tipAmountValue / Number(values.numberOfMovers)).toFixed(2)).replace(/\.0+$/, ""),
        totalBill: prettify((Number(values.billedAmount) + tipAmountValue).toFixed(0)).replace(/\.0+$/, ""),
      })
    } else {
      setTotalData({})
    }
  }, [values])

  return (
    <div className="calculator">
      <div className="calculator_top">
        <div className="calculator_top_item">
          <svg width="69" height="49" viewBox="0 0 69 49" fill="none" >
            <path d="M64 41.4271H60.9593C60.9593 36.1589 56.6886 31.8881 51.4203 31.8881H50.5119C45.4945 31.8881 41.4271 35.9555 41.4271 40.9729H27.1186C27.1186 35.9555 23.0513 31.8881 18.0339 31.8881H17.8068C12.664 31.8881 8.49492 36.0572 8.49492 41.2V41.4271H5C2.79086 41.4271 1 39.6363 1 37.4271V5C1 2.79086 2.79086 1 5 1H40.1525C42.3617 1 44.1525 2.79086 44.1525 5V10.3119H57.2288C58.5662 10.3119 59.8151 10.9803 60.557 12.0931L67.3282 22.2499C67.7662 22.907 68 23.679 68 24.4687V37.4271C68 39.6363 66.2091 41.4271 64 41.4271Z" stroke="#CCC1B4" />
            <path d="M25.0746 12.5831H7.81354" stroke="#CCC1B4" />
            <path d="M12.8102 6.67798L7.58643 12.5831L12.8102 18.261" stroke="#CCC1B4" />
            <path d="M21.4408 22.122L38.7018 22.122" stroke="#CCC1B4" />
            <path d="M33.7051 28.0271L38.9288 22.122L33.7051 16.444" stroke="#CCC1B4" />
            <circle cx="17.8067" cy="41.4272" r="6.7678" stroke="#CCC1B4" />
            <circle cx="17.8068" cy="41.4271" r="2.22542" stroke="#CCC1B4" />
            <circle cx="51.4204" cy="41.4272" r="6.7678" stroke="#CCC1B4" />
            <circle cx="51.4203" cy="41.4271" r="2.22542" stroke="#CCC1B4" />
            <path d="M53.9253 15.5356H51.1932C49.0609 15.5356 47.3322 17.2642 47.3322 19.3966C47.3322 21.529 49.0609 23.2576 51.1932 23.2576H53.9253C56.9721 23.2576 58.8185 19.8939 57.1826 17.3235C56.4738 16.2099 55.2453 15.5356 53.9253 15.5356Z" stroke="#CCC1B4" />
          </svg>
          <h1>Total Moving Cost Calculator</h1>
          <svg width="82" height="49" viewBox="0 0 82 49" fill="none" >
            <path d="M80.7175 48.7404V5C80.7175 2.79086 78.9267 1 76.7175 1H5C2.79086 1 1 2.79086 1 5V33.9313C1 36.1404 2.79086 37.9313 5 37.9313H70.8091" stroke="#CCC1B4" />
            <path d="M39.2823 5.95422V32.9771" stroke="#CCC1B4" />
            <path d="M43.9149 12.782C43.4002 11.8572 41.8045 10.0076 39.5398 10.0076C36.7088 10.0076 34.6499 12.0253 34.6499 14.5475C34.6499 17.0696 37.371 18.2903 39.5398 19.0873C41.5986 19.844 44.687 20.6006 44.687 23.8794C44.687 27.1582 42.1134 28.9236 39.5398 28.9236C36.9661 28.9236 33.8778 27.032 33.8778 24.3838" stroke="#CCC1B4" />
            <circle cx="14.5114" cy="18.5648" r="3.55343" stroke="#CCC1B4" />
            <circle cx="64.0534" cy="18.5648" r="3.55343" stroke="#CCC1B4" />
          </svg>
        </div>
      </div>
      <div className="calculator_content">
        <div className="input_wrap">
          <label>Billed Amount:</label>
          <div className="input_item start">
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              value={values.billedAmount}
              onChange={(e) => e.target.value.length <= 6 && setValues({ ...values, billedAmount: e.target.value })}
            />
            <span>$</span>
          </div>
        </div>
        <div className="input_wrap">
          <label>Desired Tip Percentage:</label >
          <div className="input_item end">
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              value={values.desiredTip}
              onChange={(e) => e.target.value.length <= 2 && setValues({ ...values, desiredTip: e.target.value })}
            />
            <span>%</span>
          </div>
        </div>
        <div className="input_wrap">
          <label>Number of Movers:</label >
          <input
            type="number"
            onWheel={(e) => e.target.blur()}
            value={values.numberOfMovers}
            onChange={(e) => e.target.value.length <= 2 && setValues({ ...values, numberOfMovers: e.target.value })}
          />
        </div>
      </div>
      {!!totalData?.tipAmount &&
        !!totalData?.tipPerMover &&
        !!totalData?.totalBill &&
        <div className="calculator_result">
          <div className="result_item">
            <span className="result_item_label">Tip Amount:</span>
            <span className="result_item_value">${totalData.tipAmount}</span>
          </div>
          <div className="result_item">
            <span className="result_item_label">Tip per Mover:</span>
            <span className="result_item_value">${totalData.tipPerMover}</span>
          </div>
          <div className="result_item">
            <span className="result_item_label">Total Bill:</span>
            <span className="result_item_value">${totalData.totalBill}</span>
          </div>
        </div>}
    </div >
  )
}
