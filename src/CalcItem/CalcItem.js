import { useState, useCallback, useEffect, useRef } from "react"
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./calcItem.css";

const CssTextField = styled(TextField)({
  '& label': {
    textAlign: 'center',
  },
  '&:hover label': {
    color: '#F5A800',
  },
  '& label.Mui-focused': {
    color: '#F5A800',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#F5A800',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#F5A800',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F5A800',
    },
  },
});

const CssAutocomplete = styled(Autocomplete)({
  '& label.Mui-focused': {
    color: '#F5A800',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#F5A800',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F5A800',
    },
    '&label.Mui-focused': {
      color: '#F5A800',
    },
  },
  borderColor: 'red',
});

const centsPerKWhByState = {
  "Alabama": 15.02,
  "Alaska": 23.98,
  "Arizona": 14.52,
  "Arkansas": 12.71,
  "California": 26.72,
  "Colorado": 14.54,
  "Connecticut": 28.95,
  "District of Columbia": 18.02,
  "Delaware": 17.46,
  "Florida": 15.48,
  "Georgia": 13.75,
  "Hawaii": 42.69,
  "Idaho": 12.15,
  "Illinois": 15.83,
  "Indiana": 15.17,
  "Iowa": 13.37,
  "Kansas": 13.72,
  "Kentucky": 12.99,
  "Louisiana": 11.92,
  "Maine": 29.13,
  "Maryland": 18.4,
  "Massachusetts": 28.02,
  "Michigan": 19.06,
  "Minnesota": 15.29,
  "Mississippi": 13.67,
  "Missouri": 12.42,
  "Montana": 12.96,
  "Nebraska": 11.76,
  "Nevada": 14.63,
  "New Hampshire": 25.76,
  "New Jersey": 17.51,
  "New Mexico": 14.5,
  "New York": 22.7,
  "North Carolina": 14.75,
  "North Dakota": 11.66,
  "Ohio": 16.01,
  "Oklahoma": 13.27,
  "Oregon": 13.24,
  "Pennsylvania": 18.43,
  "Rhode Island": 31.78,
  "South Carolina": 14.47,
  "South Dakota": 12.99,
  "Tennessee": 12.57,
  "Texas": 14.71,
  "Utah": 11.22,
  "Vermont": 22.11,
  "Virginia": 14.27,
  "Washington": 11.34,
  "West Virginia": 15.07,
  "Wisconsin": 17.05,
  "Wyoming": 12.47
};

const listOfDevices = {
  "Cooling And Heating": {
    "Central Air Conditioner": { watts: 3000 },
    "Window Air Conditioner": { watts: 950 },
    "Furnace": { watts: 20000 },
    "Heat Pump": { watts: 15000 },
    "Portable Heater": { watts: 1125 },
    "Ceiling Fans": { watts: 120 },
    "Electric Water Heater": { watts: 2000, fullTime: true }
  },
  "Appliances": {
    "Refrigerator": { watts: 625, fullTime: true },
    "Freezer": { watts: 600, fullTime: true },
    "Stove": { watts: 3000 },
    "Oven": { watts: 3500 },
    "Microwave Oven": { watts: 925 },
    "Dishwasher": { watts: 1800 },
    "Clothes Washer": { watts: 425 },
    "Clothes Dryer": { watts: 3400 },
    "Clothes iron": { watts: 1400 },
    "Television": { watts: 120 },
    "Desktop Computer and Monitor": { watts: 270 },
    "Laptop Computer": { watts: 50 },
    "Printer": { watts: 45 },
    "Game Console": { watts: 90 },
    "Coffee Maker": { watts: 1050 },
    "Toaster": { watts: 1100 },
    "Blender": { watts: 650 },
    "Hair Dryer": { watts: 1538 },
    "Home Security System": { watts: 4, fullTime: true }
  },
  "Lighting": {
    "LED Bulbs": { watts: 10 },
    "Incandescent Bulbs": { watts: 70 }
  }
}

const prettify = (str) => str === "NaN" ? "0" : Number(str).toFixed(0).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1,");

export default function CalcItem() {
  const menuRef = useRef(null);

  const [selectedState, setSelectedState] = useState(null);
  const [menus, setMenus] = useState(Object.keys(listOfDevices).map((device) => ({ [device]: false })));
  const [currentData, setCurrentData] = useState(Object.keys(listOfDevices).reduce((acc, key) => ({ ...acc, [key]: [] }), {}))
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenus(Object.keys(listOfDevices).map((device) => ({ [device]: false })));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleAddDevice = useCallback((category, device) => {
    setCurrentData({ ...currentData, [category]: [...currentData[category], { title: device, numberOfUnits: null, averageHoursPerWeek: listOfDevices[category][device].fullTime ? 168 : null, watts: listOfDevices[category][device].watts, fullTime: listOfDevices[category][device].fullTime }] });
    setMenus(Object.keys(listOfDevices).map((device) => ({ [device]: false })));
  }, [currentData]);

  const handleReset = useCallback(() => {
    setCurrentData(Object.keys(listOfDevices).reduce((acc, key) => ({ ...acc, [key]: [] }), {}));
    setShowResult(false);
  }, []);

  const handleRemoveDevice = useCallback((category, device) => setCurrentData({ ...currentData, [category]: currentData[category].filter((dev) => dev.title !== device) }), [currentData]);

  const handleInputChange = useCallback((category, device, field, value) => setCurrentData({ ...currentData, [category]: currentData[category].map((dev) => dev.title === device ? { ...dev, [field]: value } : dev) }), [currentData]);

  const calculateTotalMonthlyKWH = useCallback(() => {
    let totalKwh = 0;

    for (const category in currentData) {
      for (const device of currentData[category]) {
        totalKwh += (Number(device.numberOfUnits) * (Number(device.averageHoursPerWeek) * 4.3) * Number(device.watts)) / 1000;
      }
    }

    return (totalKwh).toFixed(2);
  }, [currentData]);

  const checkResultValues = useCallback(() => {
    let hasNonEmptyCategory = false;

    for (const category in currentData) {
      const devices = currentData[category];
      if (devices.length > 0) {
        hasNonEmptyCategory = true;
        for (const device of devices) {
          if (!Number(device.numberOfUnits) || !Number(device.averageHoursPerWeek)) {
            return false;
          }
        }
      }
    }

    return hasNonEmptyCategory;
  }, [currentData])

  return (
    <div className="calculator">
      <h1>Total Energy Use Calculator</h1>
      <h2>Pick your location</h2>
      <CssAutocomplete
        onChange={(e, value) => setSelectedState(value)}
        options={Object.keys(centsPerKWhByState)}
        disableClearable
        renderInput={(params) => <TextField {...params} label="State" />}
        popupIcon={<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2606 8L6.71077 3.41L2.16098 8L0.763334 6.58L6.71077 0.58L12.6582 6.58L11.2606 8Z" fill="#F5A800" />
        </svg>}
      />
      <h2>Select your appliances and devices</h2>
      <div className="content">
        {Object.keys(listOfDevices).map((category) => (
          <div className="list-group" key={category}>
            <div className="list-group-item">
              <div className="list-group-title">
                <h4>{category}</h4>
              </div>
              <div className="list-group-button">
                <button onClick={() => setMenus({ ...menus, [category]: !menus[category] })}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM11 5H9V9H5V11H9V15H11V11H15V9H11V5Z" fill="#494737" />
                    <path d="M10 674C5.59 674 2 670.41 2 666C2 661.59 5.59 658 10 658C14.41 658 18 661.59 18 666C18 670.41 14.41 674 10 674ZM10 656C8.68678 656 7.38642 656.259 6.17317 656.761C4.95991 657.264 3.85752 658 2.92893 658.929C1.05357 660.804 0 663.348 0 666C0 668.652 1.05357 671.196 2.92893 673.071C3.85752 674 4.95991 674.736 6.17317 675.239C7.38642 675.741 8.68678 676 10 676C12.6522 676 15.1957 674.946 17.0711 673.071C18.9464 671.196 20 668.652 20 666C20 664.687 19.7413 663.386 19.2388 662.173C18.7362 660.96 17.9997 659.858 17.0711 658.929C16.1425 658 15.0401 657.264 13.8268 656.761C12.6136 656.259 11.3132 656 10 656ZM11 661H9V665H5V667H9V671H11V667H15V665H11V661Z" fill="#494737" />
                    <path d="M11.5 1186C7.09 1186 3.5 1182.41 3.5 1178C3.5 1173.59 7.09 1170 11.5 1170C15.91 1170 19.5 1173.59 19.5 1178C19.5 1182.41 15.91 1186 11.5 1186ZM11.5 1168C10.1868 1168 8.88642 1168.26 7.67317 1168.76C6.45991 1169.26 5.35752 1170 4.42893 1170.93C2.55357 1172.8 1.5 1175.35 1.5 1178C1.5 1180.65 2.55357 1183.2 4.42893 1185.07C5.35752 1186 6.45991 1186.74 7.67317 1187.24C8.88642 1187.74 10.1868 1188 11.5 1188C14.1522 1188 16.6957 1186.95 18.5711 1185.07C20.4464 1183.2 21.5 1180.65 21.5 1178C21.5 1176.69 21.2413 1175.39 20.7388 1174.17C20.2362 1172.96 19.4997 1171.86 18.5711 1170.93C17.6425 1170 16.5401 1169.26 15.3268 1168.76C14.1136 1168.26 12.8132 1168 11.5 1168ZM12.5 1173H10.5V1177H6.5V1179H10.5V1183H12.5V1179H16.5V1177H12.5V1173Z" fill="#494737" />
                    <path d="M11.5 1974C7.09 1974 3.5 1970.41 3.5 1966C3.5 1961.59 7.09 1958 11.5 1958C15.91 1958 19.5 1961.59 19.5 1966C19.5 1970.41 15.91 1974 11.5 1974ZM11.5 1956C10.1868 1956 8.88642 1956.26 7.67317 1956.76C6.45991 1957.26 5.35752 1958 4.42893 1958.93C2.55357 1960.8 1.5 1963.35 1.5 1966C1.5 1968.65 2.55357 1971.2 4.42893 1973.07C5.35752 1974 6.45991 1974.74 7.67317 1975.24C8.88642 1975.74 10.1868 1976 11.5 1976C14.1522 1976 16.6957 1974.95 18.5711 1973.07C20.4464 1971.2 21.5 1968.65 21.5 1966C21.5 1964.69 21.2413 1963.39 20.7388 1962.17C20.2362 1960.96 19.4997 1959.86 18.5711 1958.93C17.6425 1958 16.5401 1957.26 15.3268 1956.76C14.1136 1956.26 12.8132 1956 11.5 1956ZM12.5 1961H10.5V1965H6.5V1967H10.5V1971H12.5V1967H16.5V1965H12.5V1961Z" fill="#494737" />
                  </svg>
                  Add NEW device
                </button>
                {menus[category] &&
                  <ul className="list-group-list" ref={menuRef}>
                    {Object.keys(listOfDevices[category]).map((device) => {
                      const selected = currentData[category]?.find((dev) => dev.title === device);
                      return (<li
                        key={device}
                        className={`${selected ? "selected" : ""}`}
                        onClick={() => !selected && handleAddDevice(category, device)}
                      >
                        {selected &&
                          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                            <path d="M17.5 1.41L5.5 13.41L0 7.91L1.41 6.5L5.5 10.58L16.09 0L17.5 1.41Z" fill="#F5A800" />
                          </svg>}
                        <span>{device}</span>
                      </li>)
                    })}
                  </ul>}
              </div>
            </div>
            {!!currentData[category]?.length &&
              <div className="list-group-content">
                {currentData[category].map((device) => (
                  <div key={device} className="list-group-content-item">
                    <div className="list-group-content-item-form">
                      <div>
                        <button className="list-group-content-item-remove" onClick={() => handleRemoveDevice(category, device.title)}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z" fill="#758592" />
                          </svg>
                        </button>
                        <span className="list-group-content-item-title">{device.title}</span>
                      </div>
                      <div>
                        <CssTextField
                          label="Number of Units"
                          type="number"
                          value={device.numberOfUnits}
                          onChange={(e) =>
                            /^[0-9]{0,3}$/.test(e.target.value) &&
                            (e.target.value >= 0 || e.target.value === "") &&
                            handleInputChange(
                              category,
                              device.title,
                              "numberOfUnits",
                              e.target.value
                            )
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                        <CssTextField
                          type="number"
                          label="Average Hours Per Week"
                          value={device.averageHoursPerWeek}
                          onChange={!device?.fullTime ? (e) =>
                            /^[0-9]{0,3}$/.test(e.target.value) &&
                            e.target.value <= 168 &&
                            (e.target.value >= 0 || e.target.value === "") &&
                            handleInputChange(
                              category,
                              device.title,
                              "averageHoursPerWeek",
                              e.target.value
                            ) : null}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ readOnly: device?.fullTime }}
                          className={device?.fullTime ? "full-time" : ""}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
          </div>
        ))}
        {showResult ?
          (checkResultValues() && <div>
            <h3>Your estimated monthly bill</h3>
            <div className="result-section">
              <div className="result-section-item">
                <span>Estimated Total Monthly kwH</span>
                <div className="result-section-value">{prettify(calculateTotalMonthlyKWH())}</div>
              </div>
              <div className="result-section-item">
                <span>Estimated Energy Price</span>
                <div className="result-section-value">${prettify(calculateTotalMonthlyKWH() * centsPerKWhByState[selectedState])}</div>
              </div>
            </div>
            <button className="button-reset" onClick={handleReset}>
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                <path d="M0.5 9C0.5 13.97 4.53 18 9.5 18C11.89 18 14.18 17.06 15.9 15.4L14.4 13.9C13.13 15.25 11.36 16 9.5 16C3.26 16 0.14 8.46 4.55 4.05C8.96 -0.36 16.5 2.77 16.5 9H13.5L17.5 13H17.6L21.5 9H18.5C18.5 4.03 14.47 0 9.5 0C4.53 0 0.5 4.03 0.5 9Z" fill="#494737" />
              </svg>
              START OVER
            </button>
          </div>) :
          selectedState && checkResultValues() &&
          <button className="button-calculate" onClick={() => setShowResult(true)}>
            Calculate Total cost
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <circle cx="12.5" cy="12.5" r="12.5" fill="white" />
              <path d="M13.1944 7L11.8056 7L11.8056 15.3333L7.98611 11.5139L7 12.5L12.5 18L18 12.5L17.0139 11.5139L13.1944 15.3333L13.1944 7Z" fill="#758592" />
            </svg>
          </button>}
      </div>
    </div>
  );
}