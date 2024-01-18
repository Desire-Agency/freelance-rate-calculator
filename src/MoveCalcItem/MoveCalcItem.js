import { useState, useCallback, useEffect } from "react"
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import "./moveCalcItem.css"

const dataByState = {
  "Alabama": {
    division: "East South Central",
    medianHomeSize: 2146,
    averageHouseholdSize: 3,
    costPerKWh: 0.146,
    stateAverageConsumption: 1136.77902
  },
  "Alaska": {
    division: "Pacific",
    medianHomeSize: 1910,
    averageHouseholdSize: 3,
    costPerKWh: 0.238,
    stateAverageConsumption: 553.5931709
  },
  "Arizona": {
    division: "Mountain",
    medianHomeSize: 2049,
    averageHouseholdSize: 3,
    costPerKWh: 0.140,
    stateAverageConsumption: 1123.890574
  },
  "Arkansas": {
    division: "West South Central",
    medianHomeSize: 1860,
    averageHouseholdSize: 3,
    costPerKWh: 0.123,
    stateAverageConsumption: 1082.661373
  },
  "California": {
    division: "Pacific",
    medianHomeSize: 1860,
    averageHouseholdSize: 3,
    costPerKWh: 0.289,
    stateAverageConsumption: 499.7540338
  },
  "Colorado": {
    division: "Mountain",
    medianHomeSize: 2464,
    averageHouseholdSize: 3,
    costPerKWh: 0.143,
    stateAverageConsumption: 693.890068
  },
  "Connecticut": {
    division: "New England",
    medianHomeSize: 2158,
    averageHouseholdSize: 3,
    costPerKWh: 0.305,
    stateAverageConsumption: 672.3569012
  },
  "Delaware": {
    division: "South Atlantic",
    medianHomeSize: 2277,
    averageHouseholdSize: 3,
    costPerKWh: 0.156,
    stateAverageConsumption: 900.0154841
  },
  "Florida": {
    division: "South Atlantic",
    medianHomeSize: 1960,
    averageHouseholdSize: 3,
    costPerKWh: 0.152,
    stateAverageConsumption: 1138.183838
  },
  "Georgia": {
    division: "South Atlantic",
    medianHomeSize: 2262,
    averageHouseholdSize: 3,
    costPerKWh: 0.139,
    stateAverageConsumption: 1065.923953
  },
  "Hawaii": {
    division: "Pacific",
    medianHomeSize: 1164,
    averageHouseholdSize: 3,
    costPerKWh: 0.423,
    stateAverageConsumption: 498.3470667
  },
  "Idaho": {
    division: "Mountain",
    medianHomeSize: 2311,
    averageHouseholdSize: 3,
    costPerKWh: 0.110,
    stateAverageConsumption: 928.8990961
  },
  "Illinois": {
    division: "East North Central",
    medianHomeSize: 1700,
    averageHouseholdSize: 3,
    costPerKWh: 0.159,
    stateAverageConsumption: 678.6323614
  },
  "Indiana": {
    division: "East North Central",
    medianHomeSize: 2011,
    averageHouseholdSize: 3,
    costPerKWh: 0.150,
    stateAverageConsumption: 900.4030641
  },
  "Iowa": {
    division: "West North Central",
    medianHomeSize: 1623,
    averageHouseholdSize: 2,
    costPerKWh: 0.134,
    stateAverageConsumption: 861.1440452
  },
  "Kansas": {
    division: "West North Central",
    medianHomeSize: 2020,
    averageHouseholdSize: 2,
    costPerKWh: 0.137,
    stateAverageConsumption: 904.2241237
  },
  "Kentucky": {
    division: "East South Central",
    medianHomeSize: 1953,
    averageHouseholdSize: 2,
    costPerKWh: 0.125,
    stateAverageConsumption: 1043.237181
  },
  "Louisiana": {
    division: "West South Central",
    medianHomeSize: 1955,
    averageHouseholdSize: 3,
    costPerKWh: 0.116,
    stateAverageConsumption: 1275.069186
  },
  "Maine": {
    division: "New England",
    medianHomeSize: 1680,
    averageHouseholdSize: 2,
    costPerKWh: 0.273,
    stateAverageConsumption: 546.770582
  },
  "Maryland": {
    division: "South Atlantic",
    medianHomeSize: 2207,
    averageHouseholdSize: 3,
    costPerKWh: 0.164,
    stateAverageConsumption: 891.2711649
  },
  "Massachusetts": {
    division: "New England",
    medianHomeSize: 1800,
    averageHouseholdSize: 3,
    costPerKWh: 0.295,
    stateAverageConsumption: 564.1838176
  },
  "Michigan": {
    division: "East North Central",
    medianHomeSize: 1726,
    averageHouseholdSize: 2,
    costPerKWh: 0.187,
    stateAverageConsumption: 604.7713033
  },
  "Minnesota": {
    division: "West North Central",
    medianHomeSize: 2026,
    averageHouseholdSize: 2,
    costPerKWh: 0.147,
    stateAverageConsumption: 762.3303778
  },
  "Mississippi": {
    division: "East South Central",
    medianHomeSize: 2065,
    averageHouseholdSize: 3,
    costPerKWh: 0.134,
    stateAverageConsumption: 1206.417596
  },
  "Missouri": {
    division: "West North Central",
    medianHomeSize: 1848,
    averageHouseholdSize: 2,
    costPerKWh: 0.130,
    stateAverageConsumption: 1046.810261
  },
  "Montana": {
    division: "Mountain",
    medianHomeSize: 2200,
    averageHouseholdSize: 2,
    costPerKWh: 0.124,
    stateAverageConsumption: 854.081568
  },
  "Nebraska": {
    division: "West North Central",
    medianHomeSize: 2016,
    averageHouseholdSize: 2,
    costPerKWh: 0.114,
    stateAverageConsumption: 993.8986314
  },
  "Nevada": {
    division: "Mountain",
    medianHomeSize: 2060,
    averageHouseholdSize: 3,
    costPerKWh: 0.167,
    stateAverageConsumption: 914.9530668
  },
  "New Hampshire": {
    division: "New England",
    medianHomeSize: 1934,
    averageHouseholdSize: 2,
    costPerKWh: 0.289,
    stateAverageConsumption: 591.6385649
  },
  "New Jersey": {
    division: "Middle Atlantic",
    medianHomeSize: 1753,
    averageHouseholdSize: 3,
    costPerKWh: 0.178,
    stateAverageConsumption: 652.6124871
  },
  "New Mexico": {
    division: "Mountain",
    medianHomeSize: 2087,
    averageHouseholdSize: 3,
    costPerKWh: 0.142,
    stateAverageConsumption: 684.3620854
  },
  "New York": {
    division: "Middle Atlantic",
    medianHomeSize: 1490,
    averageHouseholdSize: 3,
    costPerKWh: 0.222,
    stateAverageConsumption: 575.5411363
  },
  "North Carolina": {
    division: "South Atlantic",
    medianHomeSize: 2152,
    averageHouseholdSize: 3,
    costPerKWh: 0.132,
    stateAverageConsumption: 989.1089285
  },
  "North Dakota": {
    division: "West North Central",
    medianHomeSize: 2190,
    averageHouseholdSize: 2,
    costPerKWh: 0.111,
    stateAverageConsumption: 1046.45788
  },
  "Ohio": {
    division: "East North Central",
    medianHomeSize: 1803,
    averageHouseholdSize: 2,
    costPerKWh: 0.154,
    stateAverageConsumption: 822.3501233
  },
  "Oklahoma": {
    division: "West South Central",
    medianHomeSize: 1941,
    averageHouseholdSize: 3,
    costPerKWh: 0.124,
    stateAverageConsumption: 1096.081766
  },
  "Oregon": {
    division: "Pacific",
    medianHomeSize: 1946,
    averageHouseholdSize: 2,
    costPerKWh: 0.127,
    stateAverageConsumption: 899.7386343
  },
  "Pennsylvania": {
    division: "Middle Atlantic",
    medianHomeSize: 2045,
    averageHouseholdSize: 2,
    costPerKWh: 0.182,
    stateAverageConsumption: 786.9233716
  },
  "Rhode Island": {
    division: "New England",
    medianHomeSize: 1913,
    averageHouseholdSize: 2,
    costPerKWh: 0.274,
    stateAverageConsumption: 554.5480597
  },
  "South Carolina": {
    division: "South Atlantic",
    medianHomeSize: 2123,
    averageHouseholdSize: 3,
    costPerKWh: 0.141,
    stateAverageConsumption: 1049.231145
  },
  "South Dakota": {
    division: "West North Central",
    medianHomeSize: 1915,
    averageHouseholdSize: 2,
    costPerKWh: 0.123,
    stateAverageConsumption: 1024.950271
  },
  "Tennessee": {
    division: "East South Central",
    medianHomeSize: 2157,
    averageHouseholdSize: 3,
    costPerKWh: 0.122,
    stateAverageConsumption: 1160.725527
  },
  "Texas": {
    division: "West South Central",
    medianHomeSize: 2170,
    averageHouseholdSize: 3,
    costPerKWh: 0.143,
    stateAverageConsumption: 1193.508393
  },
  "Utah": {
    division: "Mountain",
    medianHomeSize: 2800,
    averageHouseholdSize: 3,
    costPerKWh: 0.113,
    stateAverageConsumption: 779.1582012
  },
  "Vermont": {
    division: "New England",
    medianHomeSize: 2000,
    averageHouseholdSize: 2,
    costPerKWh: 0.207,
    stateAverageConsumption: 553.6528612
  },
  "Virginia": {
    division: "South Atlantic",
    medianHomeSize: 2105,
    averageHouseholdSize: 3,
    costPerKWh: 0.145,
    stateAverageConsumption: 986.6734377
  },
  "Washington": {
    division: "Pacific",
    medianHomeSize: 2185,
    averageHouseholdSize: 3,
    costPerKWh: 0.110,
    stateAverageConsumption: 946.7261146
  },
  "Washington DC": {
    division: "South Atlantic",
    medianHomeSize: 954,
    averageHouseholdSize: 2,
    costPerKWh: 0.162,
    stateAverageConsumption: 643.2627611
  },
  "West Virginia": {
    division: "South Atlantic",
    medianHomeSize: 1752,
    averageHouseholdSize: 2,
    costPerKWh: 0.141,
    stateAverageConsumption: 956.5293829
  },
  "Wisconsin": {
    division: "East North Central",
    medianHomeSize: 1822,
    averageHouseholdSize: 2,
    costPerKWh: 0.168,
    stateAverageConsumption: 663.6287281
  },
  "Wyoming": {
    division: "Mountain",
    medianHomeSize: 2285,
    averageHouseholdSize: 2,
    costPerKWh: 0.115,
    stateAverageConsumption: 853.9739538
  }
}

const DEF_STATE = {};


export default function MoveCalcItem() {
  const [selectedStateCurrentHome, setSelectedStateCurrentHome] = useState(dataByState[DEF_STATE])
  const [selectedStateNewHome, setSelectedStateNewHome] = useState(dataByState[DEF_STATE])

  const [currentHomeFields, setCurrentHomeFields] = useState({
    stateName: "",
    homeSize: "",
    numberResidents: "",
  })

  const [newHomeFields, setNewHomeFields] = useState({
    stateName: "",
    homeSize: "",
    numberResidents: "",
  })

  const [totalData, setTotalData] = useState({})

  const prettify = (str) => str.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1,");

  const getHomeSizeAdjust = (value) => {
    switch (true) {
      case value >= 3000:
        return 15489
      case value >= 2500 && value < 2999:
        return 13031
      case value >= 2000 && value < 2499:
        return 12173
      case value >= 1500 && value < 1999:
        return 11009
      case value >= 1000 && value < 1499:
        return 9407
      default:
        return 6802;
    }
  };

  const getHFamilySizeAdjust = (value) => {
    switch (true) {
      case value === 1:
        return 7184
      case value === 2:
        return 10648
      case value === 3:
        return 12120
      case value === 4:
        return 13072
      case value === 5:
        return 14336
      default:
        return 14730
    }
  };

  useEffect(() => {
    if (currentHomeFields?.stateName && selectedStateCurrentHome?.costPerKWh && newHomeFields?.stateName && selectedStateNewHome?.costPerKWh) {
      const homeSizeAdjustMultipleCurrentHomeValue = getHomeSizeAdjust(Number(currentHomeFields.homeSize)) / getHomeSizeAdjust(Number(selectedStateCurrentHome.medianHomeSize));
      const familySizeAdjustMultipleCurrentHomeValue = getHFamilySizeAdjust(Number(currentHomeFields.numberResidents)) / getHFamilySizeAdjust(Number(selectedStateCurrentHome.averageHouseholdSize));
      const monthlyConsumptionCurrentHomeValue = familySizeAdjustMultipleCurrentHomeValue * selectedStateCurrentHome.stateAverageConsumption.toFixed(0) * homeSizeAdjustMultipleCurrentHomeValue;
      const estimatedMonthlyCostCurrentHomeValue = monthlyConsumptionCurrentHomeValue * selectedStateCurrentHome.costPerKWh;
      const estimatedYearlyCostCurrentHomeValue = estimatedMonthlyCostCurrentHomeValue * 12;

      const homeSizeAdjustMultipleNewHomeValue = getHomeSizeAdjust(Number(newHomeFields.homeSize)) / getHomeSizeAdjust(Number(selectedStateNewHome.medianHomeSize));
      const familySizeAdjustMultipleNewHomeValue = getHFamilySizeAdjust(Number(newHomeFields.numberResidents)) / getHFamilySizeAdjust(Number(selectedStateNewHome.averageHouseholdSize));
      const monthlyConsumptionNewHomeValue = familySizeAdjustMultipleNewHomeValue * selectedStateNewHome.stateAverageConsumption.toFixed(0) * homeSizeAdjustMultipleNewHomeValue;
      const estimatedMonthlyCostNewHomeValue = monthlyConsumptionNewHomeValue * selectedStateNewHome.costPerKWh;
      const estimatedYearlyCostNewHomeValue = estimatedMonthlyCostNewHomeValue * 12;

      setTotalData({
        current: {
          stateName: currentHomeFields.stateName,
          monthlyConsumption: prettify((monthlyConsumptionCurrentHomeValue).toFixed(0)).replace(/\.0+$/, ""),
          estimatedMonthlyCost: prettify((estimatedMonthlyCostCurrentHomeValue).toFixed(2)).replace(/\.0+$/, ""),
          estimatedYearlyCost: prettify((estimatedYearlyCostCurrentHomeValue).toFixed(2)).replace(/\.0+$/, ""),
        },
        new: {
          stateName: newHomeFields.stateName,
          monthlyConsumption: prettify((monthlyConsumptionNewHomeValue).toFixed(0)).replace(/\.0+$/, ""),
          estimatedMonthlyCost: prettify((estimatedMonthlyCostNewHomeValue).toFixed(2)).replace(/\.0+$/, ""),
          estimatedYearlyCost: prettify((estimatedYearlyCostNewHomeValue).toFixed(2)).replace(/\.0+$/, ""),
        },
        totalText: estimatedYearlyCostCurrentHomeValue < estimatedYearlyCostNewHomeValue ?
          `You will save an estimated $${prettify((estimatedYearlyCostNewHomeValue - estimatedYearlyCostCurrentHomeValue).toFixed(0)).replace(/\.0+$/, "")} annually on your electricity bill if you move.` :
          estimatedYearlyCostCurrentHomeValue > estimatedYearlyCostNewHomeValue ?
            `Your annual electricity spend will increase by $${prettify((estimatedYearlyCostCurrentHomeValue - estimatedYearlyCostNewHomeValue).toFixed(0)).replace(/\.0+$/, "")} if you move` :
            "Your estimated electricity bill will be exactly the same if you move."
      })
    }
  }, [currentHomeFields, newHomeFields, selectedStateNewHome, selectedStateCurrentHome])

  const changeSateCurrentHome = useCallback((val) => {
    setCurrentHomeFields({ ...currentHomeFields, stateName: val })
    setSelectedStateCurrentHome(dataByState[val])
  }, [currentHomeFields])

  const changeSateNewHome = useCallback((val) => {
    setNewHomeFields({ ...newHomeFields, stateName: val })
    setSelectedStateNewHome(dataByState[val])
  }, [newHomeFields])

  return (
    <div className="calculator">
      <h2>Move & Save Calculator</h2>
      <div className="content">
        <div className="row_wrap grid-2">
          <h3>Current Home</h3>
          <h3>New Home</h3>
        </div>
        <div className="row_wrap grid-2">
          <Autocomplete
            onChange={(e, value) => changeSateCurrentHome(value)}
            options={Object.keys(dataByState)}
            renderInput={(params) => <TextField  {...params} label="State" />}
          />
          <Autocomplete
            onChange={(e, value) => changeSateNewHome(value)}
            options={Object.keys(dataByState)}
            renderInput={(params) => <TextField  {...params} label="State" />}
          />
        </div>
        <div className="row_wrap grid-2">
          <FormControl>
            <InputLabel>Home Size</InputLabel>
            <OutlinedInput
              type="number"
              onWheel={(e) => e.target.blur()}

              value={currentHomeFields.homeSize}
              onChange={(e) => e.target.value.length <= 13 && setCurrentHomeFields({ ...currentHomeFields, homeSize: e.target.value })}
              endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
              label="Home Size"
            />
          </FormControl>
          <FormControl>
            <InputLabel>Home Size</InputLabel>
            <OutlinedInput
              onWheel={(e) => e.target.blur()}
              type="number"
              value={newHomeFields.homeSize}
              onChange={(e) => e.target.value.length <= 13 && setNewHomeFields({ ...newHomeFields, homeSize: e.target.value })}
              endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
              label="Home Size"
            />
          </FormControl>
        </div>
        <div className="row_wrap grid-2">
          <FormControl>
            <InputLabel>Number of Residents</InputLabel>
            <OutlinedInput
              type="number"
              onWheel={(e) => e.target.blur()}
              value={currentHomeFields.numberResidents}
              onChange={(e) => e.target.value.length <= 4 && setCurrentHomeFields({ ...currentHomeFields, numberResidents: e.target.value })}
              label="Number of Residents"
            />
          </FormControl>
          <FormControl>
            <InputLabel>Number of Residents</InputLabel>
            <OutlinedInput
              type="number"
              onWheel={(e) => e.target.blur()}
              value={newHomeFields.numberResidents}
              onChange={(e) => e.target.value.length <= 4 && setNewHomeFields({ ...newHomeFields, numberResidents: e.target.value })}
              label="Number of Residents"
            />
          </FormControl>
        </div>

        {totalData?.current?.stateName &&
          totalData?.new?.stateName &&
          totalData?.current?.monthlyConsumption &&
          totalData?.new?.monthlyConsumption &&
          totalData?.current?.estimatedMonthlyCost &&
          totalData?.new?.estimatedMonthlyCost &&
          totalData?.current?.estimatedYearlyCost &&
          totalData?.new?.estimatedYearlyCost &&
          <>
            <div className="row_inner total_block">
              <div className="total_inner">
                <div className="total_block_item">
                  <p>Estimated Monthly Consumption(kWh):</p>
                  <div className="row_wrap grid-2">
                    <span>{totalData.current.monthlyConsumption}</span>
                    <span>{totalData.new.monthlyConsumption}</span>
                  </div>
                </div>
                <div className="total_block_item">
                  <p>Estimated Monthly Cost:</p>
                  <div className="row_wrap grid-2">
                    <span>${totalData.current.estimatedMonthlyCost}</span>
                    <span>${totalData.new.estimatedMonthlyCost}</span>
                  </div>
                </div>
                <div className="total_block_item">
                  <p>Estimated Yearly Cost:</p>
                  <div className="row_wrap grid-2">
                    <span>${totalData.current.estimatedYearlyCost}</span>
                    <span>${totalData.new.estimatedYearlyCost}</span>
                  </div>
                </div>
              </div>
            </div>
            {totalData.totalText && <p className="total_text">{totalData.totalText}</p>}
          </>}
      </div>
    </div>)
}
