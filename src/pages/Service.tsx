import Nav from "../components/layout/Nav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { BiTime } from "react-icons/bi";
import Switch from "@mui/material/Switch";
import React, { useState, useEffect } from "react";
import { formatISO, set } from "date-fns";
import { async } from "@firebase/util";
import { format } from "date-fns";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import Snackbar from "@mui/material/Snackbar";
import { MdCheckCircle, MdError } from "react-icons/md";


const Days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  
  interface TimeSlot {
    name: string;
    startTime: string;
    endTime: string;
    activeDays: boolean[];
  }

function Service() {

    const [selected, setSelected] = React.useState(0);
    const [horaires, setHoraires] = useState<any[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openSnackbarErreur, setOpenSnackbarErreur] = useState(false);
  
    const handleOpenSnackbar = () => {
      setOpenSnackbar(true);
    };
  
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
  
    const handleOpenSnackbarErreur = () => {
      setOpenSnackbarErreur(true);
    };
    const handleCloseSnackbarErreur = () => {
      setOpenSnackbarErreur(false);
    };
    const daysOfWeek = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ];
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  
    const [timeSlotsJson, setTimeSlotsJson] = useState<string>("");
  
    const createNewTimeSlot = () => {
      const newTimeSlot: TimeSlot = {
        name: "",
        startTime: "Nouvelle heure de début",
        endTime: "Nouvelle heure de fin",
        activeDays: [false, false, false, false, false, false, false],
      };
      setTimeSlots([...timeSlots, newTimeSlot]);
    };
    const updateStartTime = (index: number, startTime: string) => {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[index].startTime = startTime;
      setTimeSlots(updatedTimeSlots);
    };
    const updateName = (index: number, name: string) => {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[index].name = name;
      setTimeSlots(updatedTimeSlots);
    };
    const updateEndTime = (index: number, endTime: string) => {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[index].endTime = endTime;
      setTimeSlots(updatedTimeSlots);
    };
    const deleteTimeSlot = (index: number) => {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots.splice(index, 1);
      setTimeSlots(updatedTimeSlots);
    };
    const toggleActiveDay = (slotIndex: number, dayIndex: number) => {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[slotIndex].activeDays[dayIndex] =
        !updatedTimeSlots[slotIndex].activeDays[dayIndex];
      setTimeSlots(updatedTimeSlots);
    };
    const addTimeSlotToJson = (timeSlot: TimeSlot) => {
      const updatedTimeSlots = [...timeSlots, timeSlot];
      const updatedTimeSlotsJson = JSON.stringify(updatedTimeSlots);
      setTimeSlotsJson(updatedTimeSlotsJson);
    };
  
    const getActiveDayNames = (activeDays: boolean[]): string[] => {
      const activeDayNames: string[] = [];
      activeDays.forEach((isActive, dayIndex) => {
        if (isActive) {
          activeDayNames.push(daysOfWeek[dayIndex]);
        }
      });
      return activeDayNames;
    };
  
    const frenchToEnglishDayMap: Record<string, string> = {
      Lundi: "Monday",
      Mardi: "Tuesday",
      Mercredi: "Wednesday",
      Jeudi: "Thursday",
      Vendredi: "Friday",
      Samedi: "Saturday",
      Dimanche: "Sunday",
    };
    const formatTimeToISO = (time: string): string => {
      const currentDate = new Date();
      const [hours, minutes] = time.split(":");
      const timeWithDate = set(currentDate, {
        hours: parseInt(hours),
        minutes: parseInt(minutes),
      });
  
      return format(timeWithDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    };
  
    useEffect(() => {
      axios
        .get(process.env.REACT_APP_API_URL + "/api/service")
        .then((response) => {
          console.log("response ", response.data);
          // le get : {name: 'a', start_at: '1970-01-01T12:26:29.000Z', end_at: '1970-01-01T13:25:29.000Z', days: Array(2)
          // le slot : {name: 'a', startTime: '13:47', endTime: '11:50', activeDays: Array(7)}
          const arrayToPutInTimeSlot = response.data.map(
            (slotInReq: {
              name: string;
              start_at: string;
              end_at: string;
              days: string[];
            }) => {
              const newSlot = {
                name: slotInReq.name,
                startTime:
                  slotInReq.start_at.split("T")[1].split(".")[0].split(":")[0] +
                  ":" +
                  slotInReq.start_at.split("T")[1].split(".")[0].split(":")[1],
                endTime:
                  slotInReq.end_at.split("T")[1].split(".")[0].split(":")[0] +
                  ":" +
                  slotInReq.end_at.split("T")[1].split(".")[0].split(":")[1],
                activeDays: Days.map((jour) =>
                  slotInReq.days.includes(jour) ? true : false
                ),
              };
              return newSlot;
            }
          );
          setTimeSlots(arrayToPutInTimeSlot);
  
          // setHoraires(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des horaires :", error);
        });
    }, []);
  
    const exportToJson = async () => {
      console.log("Le timeslot utilisé pour l'envoie", timeSlots);
  
      const timeSlotsWithActiveDays = timeSlots.map((slot) => {
        const { name } = slot;
        const activeDayNames = getActiveDayNames(slot.activeDays);
        const formattedStartTime = formatTimeToISO(slot.startTime);
        const formattedEndTime = formatTimeToISO(slot.endTime);
        const englishActiveDays = slot.activeDays
          .map((isActive, index) => (isActive ? daysOfWeek[index] : null))
          .filter((day) => day !== null)
          .map(
            (day) =>
              frenchToEnglishDayMap[day as keyof typeof frenchToEnglishDayMap]
          );
  
        return {
          name,
          start_at: formattedStartTime,
          end_at: formattedEndTime,
          days: englishActiveDays,
        };
      });
  
      const timeSlotsString = JSON.stringify(timeSlotsWithActiveDays, null, 2);
      setTimeSlotsJson(timeSlotsString);
      console.log("Time slots JSON exported:", timeSlotsString);
      try {
        const response = await fetch(
            process.env.REACT_APP_API_URL + "/api/service/update",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: timeSlotsString,
          }
        );
  
        if (response.ok) {
          console.log("JSON sent to the backend successfully.");
          handleOpenSnackbar();

        } else {
          console.error("Failed to send JSON to the backend.");
          handleOpenSnackbarErreur();

        }
      } catch (error) {
        console.error("Error while sending JSON to the backend:", error);
        handleOpenSnackbarErreur();

      }
    };
  
  return (
  
        <>
           
          {timeSlots &&
            timeSlots.map((slot, index) => (
              <div
                key={index}
                className="w-1143 h-214 flex-shrink-0 rounded-2xl bg-white shadow p-4 mb-10"
              >
                <input
                  type="text"
                  placeholder="Nouveau créneau"
                  value={slot.name}
                  className="border rounded-md p-1 focus:ring focus:ring-gray-50 focus:border-gray-100"
                  onChange={(e) => updateName(index, e.target.value)}
                />
                <div
                  className="mb-4 mt-4 space-x-8"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="grid grid-cols-1">
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateStartTime(index, e.target.value)}
                    />
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateEndTime(index, e.target.value)}
                    />
                  </div>
                  <div className="space-x-8">
                    <div className="grid grid-cols-7 space-x-4">
                      {slot.activeDays.map((isActive, dayIndex) => (
                        <div
                          key={dayIndex}
                          className="flex justify-between flex-col items-center"
                        >
                          <span className="inline-block bg-white-500 px-4 py-2 rounded border text-center">
                            {daysOfWeek[dayIndex]}
                          </span>
                          <Switch
                            checked={isActive}
                            onChange={() => toggleActiveDay(index, dayIndex)}
                            inputProps={{ "aria-label": "controlled" }}
                            className="mt-20 place-content-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => deleteTimeSlot(index)}>Supprimer</button>
              </div>
            ))}
            <div className="flex space-x-4 fixed bottom-5 right-6">
          <button className="bg-[#202020] flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px]" onClick={createNewTimeSlot}>
            <AiOutlinePlus size={20} className="mr-2" />
            Ajouter un nouveau service
          </button>
          <button className="bg-[#202020] flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px]" onClick={exportToJson}>
            Valider les modifications</button>
            <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={
            <div className="flex items-center">
              <MdCheckCircle size={24} style={{ marginRight: "8px" }} />{" "}
              Opération réussie !
            </div>
          }
          anchorOrigin={{
            vertical: "top", // Position verticale en haut
            horizontal: "right", // Position horizontale à droite
          }}
        />
        <Snackbar
          open={openSnackbarErreur}
          autoHideDuration={3000}
          onClose={handleCloseSnackbarErreur}
          message={
            <div className="flex items-center">
              <MdError size={24} style={{ marginRight: "8px" }} />{" "}
              Opération échouée !
</div>
          }
          anchorOrigin={{
            vertical: "top", // Position verticale en haut
            horizontal: "right", // Position horizontale à droite
          }}
        /></div>
         
        </>
      )
    }



export default Service