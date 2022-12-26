import { useState } from "react";
import DataView from "./sections/DataView";
import Details from "./sections/Details";
import { countryData } from "./data/data.js";
import "./App.css";
import Select from "react-select";
import { Coordinates } from "./types";
import Header from "./sections/Header";
import Footer from "./sections/Footer";

export interface Location extends Coordinates {
  country?: string;
}

export type SetLocation = React.Dispatch<React.SetStateAction<Location>>;

function App() {
  const [location, setLocation] = useState<Location>(countryData[0]);

  const onSelectChange = (value: any) => {
    const result = countryData.find(
      (selection) =>
        selection.country.toLowerCase() === value.value.toLowerCase()
    );
    if (result) {
      setLocation(result);
    }
  };

  const options = countryData.map((entry) => {
    return { value: entry.country, label: entry.country };
  });

  return (
    <div className="main-content">
      <Header />
      <div className="select-text">
        What is the weather in&nbsp;
        <Select
          options={options}
          onChange={onSelectChange}
          className="react-select"
          value={{
            label: location.country,
          }}
        />
      </div>
      <DataView coordinates={location} setLocation={setLocation} />
      {/* <Details /> */}
      <Footer />
    </div>
  );
}

export default App;
