import React, { useState, useEffect } from "react";
import styles from "./cityToCity.module.scss";
import Autocomplete from "react-google-autocomplete";
import { useRouter } from "next/router";

import { Alert } from "reactstrap";
import { Spinner } from "reactstrap";
import { getQuoteCityToCity } from "../../../redux/Bookings/Quote/action";
import { useDispatch } from "react-redux";
import { Input } from 'reactstrap';
import moment from "moment";

function CityToCity() {
  const history = useRouter();
  const [state, setState] = useState({
    from: false,
    to: false,
    date: false,
    time: false,
  });
  const [toLat, setToLat] = useState();
  const [toLng, setToLng] = useState();
  const [fromLat, setFromLat] = useState();
  const [fromLng, setFromLng] = useState();
  const [ischanges, setischanges] = useState(false)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTime, setcurrentTime] = useState()
  const [currentDate, setCurrentDate] = useState();
const [clickable, setclickable] = useState(false)
  const dispatch = useDispatch();
 
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  var travelTime = moment().add(30, 'minutes').format('HH:mm:ss');
  useEffect(() => {
    var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  setCurrentDate([year, month, day].join("-"));
  setDate([year, month, day].join("-"))
  let hour = d.getHours();
  let minutes = d.getMinutes();

  let tim = [hour, minutes].join(":");
  setcurrentTime(tim)
  setTime(tim)

 
  }, []);
  const handleChangeTo = (address) => {
    setError("");
    if (address.name) {
      setError("Location Not Valid");
    } else {
      setToLat(address.geometry.location.lat());
      setToLng(address.geometry.location.lng());
    }
  };
  const handleChangeFrom = (address) => {
    setError("");
    if (address.name) {
      setError("Location Not Valid");
    } else {
      setFromLat(address.geometry.location.lat());
      setFromLng(address.geometry.location.lng());
    }
  };
  function ChangeDate(e) {
  
 
    if (moment(e).isBefore(currentDate)) {
      setclickable(true)
      setError("You can't Select Past Date!")
    }
    else {
      setclickable(false)
      if(ischanges){
        setError("Please Select Updated Time!")
      }
    
     


      setDate(e)
    }
  }
  function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  function ChangeTime(e) {

    let noch = tConvert(e)

    const d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();

    let tim = [hour, minutes].join(":")

    let afcon = tConvert(tim)



    var beginningTime = moment(noch, 'h:mma');
    var endTime = moment(afcon, 'h:mma');
    const date1 = new Date(date);
    const date2 = new Date(currentDate);
    var d1 = new Date ();
    var d2 = new Date ( d1 );
    d2.setMinutes ( d1.getMinutes() + 30 );
   
    let chtim=d2.getHours();
    let chmin=d2.getMinutes();
    let final =tConvert([chtim, chmin].join(":"))
  
    if (date1.toDateString() === date2.toDateString()) {
      if (beginningTime.isBefore(endTime)) {
        setError("You Can't select past time!")
      }else if(noch < final){
        setError("Please Enter 30 Minutes Ahead of your current time!");
      } else {
        setError(null);
        setTime(e);
        setischanges(true)
      }
    } else {
      setError(null);
      setTime(e);
      setischanges(true);
    }




  }
  const findDistance = () => {
    if (date < currentDate) {
      setError("You can't select the past date.");
      return;
    }
  
    
    

    if (!time || !date) {
      setError("Please select date or time frist!");
    } else {
      setLoading(true);
      var origin = new window.google.maps.LatLng(fromLat, fromLng);
      var destination = new window.google.maps.LatLng(toLat, toLng);
      var service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: "DRIVING",
          // transitOptions: TransitOptions,
          // drivingOptions: ,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false,
        },
        callback
      );

      function callback(response, status) {
        setError("");
        if (response?.rows[0]?.elements[0]?.distance?.value / 1609 < 81) {
          setError(
            "Minimum distance for city to city is 81 miles, you can use Point To Point instead."
          );
          setLoading(false);
          return;
        }
        setLoading(false);
        if (response) {
          let data = {
            from: response?.originAddresses[0],
            to: response?.destinationAddresses[0],
            time: time,
            date: moment(date).format("MM-DD-YYYY"),
            distance: response?.rows[0]?.elements[0]?.distance,
            duration: response?.rows[0]?.elements[0]?.duration,
            bookingType: 2,
          };
          if(data?.from ===undefined  ){
            setError("Please enter pickup Location")
          }
          else if(data?.to === undefined){
            setError("Please enter dropoff location")
          }
          else {
          dispatch(getQuoteCityToCity(data, history));
          }
        } else {
          setError("Something went wrong!");
        }
      }
    }
  };

  const onFocusHandler = (event) => {
    setState({ ...state, [event.target.name]: true });
  };
  const onBlurHandler = (event) => {
    setState({ ...state, [event.target.name]: false });
  };
  return (
    <div>
      {error ? <Alert color="danger">{error}</Alert> : null}
      <div className={`${state.from ? styles.inputBox1 : styles.inputBox}`}>
        <label for="from">Pickup Address</label>
        <div className={styles.input}>
          <img src="/Assets/Icon awesome-map-marker-alt.svg" alt="Map12" loading="lazy"  />
          <Autocomplete
            style={{ width: "90%" }}
            onPlaceSelected={(place) => handleChangeFrom(place)}
            types={["address"]}
            componentRestrictions={{ country: "USA" }}
            placeholder="Address, airport, hotel, ..."
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            name="from"
          />
        </div>
      </div>
      <div className={`${state.to ? styles.inputBox1 : styles.inputBox}`}>
        <label for="to">Drop off Address</label>
        <div className={styles.input}>
          <img src="/Assets/Icon awesome-map-marker-alt.svg" alt="Map13" loading="lazy"  />
          <Autocomplete
            style={{ width: "90%" }}
            onPlaceSelected={(place) => handleChangeTo(place)}
            types={["address"]}
            componentRestrictions={{ country: "USA" }}
            placeholder="Address, airport, hotel, ..."
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            name="to"
          />
        </div>
      </div>
      <div className={`${state.date ? styles.inputBox1 : styles.inputBox}`}>
        <label for="date">Pickup Date</label>
        <div className={styles.input} style={{ cursor: 'pointer' }}>
          <img src="/Assets/Icon awesome-calendar-alt.svg" alt="Map14"  loading="lazy"/>
          <Input
            style={{ cursor: 'pointer' }}
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
            onChange={(e) => ChangeDate(e.target.value)}
            onBlur={onBlurHandler}
            defaultValue={currentDate}
            onFocus={onFocusHandler}
          />
        </div>
      </div>
      <div className={`${state.time ? styles.inputBox1 : styles.inputBox}`}>
        <label for="time">Pickup Time</label>
        <div className={styles.input} style={{ cursor: 'pointer' }}>
          <img src="/Assets/Icon awesome-clock.svg" alt="Map15"  loading="lazy" />
          <Input
            type="time"
            style={{ cursor: 'pointer' }}
            name="time"
            id="exampleTime"
            onChange={(e) => ChangeTime(e.target.value)}
            onBlur={onBlurHandler}
            disabled={clickable}
            defaultValue={currentTime}
            onFocus={onFocusHandler}
          />
        </div>
      </div>
      <h6 className={styles.waiting}>We will wait 15 minutes free of charge</h6>
      {loading ? (
        <Spinner color="danger" />
      ) : (
        <button className={styles.button} onClick={findDistance}>
          Request Free Quote
        </button>
      )}
    </div>
  );
}

export default CityToCity;
