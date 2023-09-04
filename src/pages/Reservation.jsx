import React, {useState} from "react";
import Nav from "../components/layout/Nav";
import BreadcrumbsComponent from "@mui/material/Breadcrumbs";
import {Typography} from "@mui/material";
import {BiTime} from "react-icons/bi";
import Scheduler, {SchedulerData, ViewTypes} from "react-big-scheduler";
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import DragDropContext from "./withDnDContext";


//2. create the view model, put it in the props obj
let schedulerData = new SchedulerData(moment().format('YYYY-MM-DD'), ViewTypes.Day);
schedulerData.localeMoment(moment.toString());

let resources = [
    {
        id: 'r1',
        name: 'Resource1'
    },
    {
        id: 'r2',
        name: 'Resource2',
    },
    {
        id: 'r3',
        name: 'Resource3',
    },
    {
        id: 'r4',
        name: 'Resource4',
    },
];
let events = [
    {
        id: 1,
        start: '2023-09-04 09:30:00',
        end: '2023-09-04 20:30:00',
        resourceId: 'r1',
        title: 'I am finished',
        bgColor: '#D9D9D9'
    },
    {
        id: 2,
        start: '2023-09-04 10:30:00',
        end: '2023-09-04 23:30:00',
        resourceId: 'r2',
        title: 'I am not resizable',
        resizable: false
    },
    {
        id: 3,
        start: '2023-09-04 12:30:00',
        end: '2023-09-04 15:30:00',
        resourceId: 'r3',
        title: 'I am not movable',
        movable: false
    },
    {
        id: 4,
        start: '2023-09-04 09:30:00',
        end: '2023-09-04 13:30:00',
        resourceId: 'r4',
        title: 'I am not start-resizable',
        startResizable: false,
        evraeiz: 'test'
    }
];
schedulerData.setResources(resources);
schedulerData.setEvents(events);


function CustomBreadcrumbs() {
    return (
        <BreadcrumbsComponent aria-label="breadcrumb" separator="/">
            <BiTime size={20}/>
            <Typography
                key="3"
                color="#666666"
                style={{
                    fontWeight: 300,
                }}
            >
                Réservations
            </Typography>
        </BreadcrumbsComponent>
    );
}


function Reservation() {

    function nextClick() {
        let newSchedulerData = new SchedulerData(viewModel.startDate, viewModel.viewType);
        newSchedulerData.setResources(resources);
        newSchedulerData.next();
        newSchedulerData.setEvents(events);
        // 0.5 seconds delay to show the loading mask
        setTimeout(() => {
            setViewModel(newSchedulerData);
        }, 500);
        console.log(newSchedulerData)


    }


    function prevClick() {
        let newSchedulerData = new SchedulerData(viewModel.startDate, viewModel.viewType);
        newSchedulerData.setResources(resources);
        newSchedulerData.prev();
        newSchedulerData.setEvents(events);
        setTimeout(() => {
            setViewModel(newSchedulerData);
        }, 500);
        console.log(newSchedulerData);
    }

    function onSelectDate(schedulerData, date) {
        let newSchedulerData = new SchedulerData(date, viewModel.viewType, viewModel.isEventPerspective);
        newSchedulerData.setDate(date);
        newSchedulerData.setEvents(events);
        setTimeout(() => {
            setViewModel(newSchedulerData);
        }, 500);
    }

    function onViewChange(schedulerData, view) {
        let newSchedulerData = new SchedulerData(viewModel.startDate, view.viewType, viewModel.isEventPerspective);
        newSchedulerData.setViewType(view.viewType);
        newSchedulerData.setEvents(events);
        setTimeout(() => {
            setViewModel(newSchedulerData);
        }, 500);
    }


    const [viewModel, setViewModel] = useState(schedulerData)

    return (
        <Nav Breadcrumbs={CustomBreadcrumbs}>

            <Scheduler
                schedulerData={viewModel}
                nextClick={nextClick}
                onSelectDate={onSelectDate}
                onViewChange={onViewChange}
                prevClick={prevClick}

                eventItemClick={(x) => {
                    // log all data of the clicked event
                    console.log(x);
                }}
                newEvent={(schedulerData, slotId, slotName, start, end, type, item) => {
                    // log all data of the new event
                    console.log(slotId, slotName, start, end, type, item);
                }}
                viewEventText="Valider"
                viewEvent2Text="Ops 2"
                viewEventClick={(schedulerData, event) => {
                    // log all data of the clicked event
                    console.log("ops 1 clicked");
                    console.log(event)
                }}
                viewEvent2Click={(schedulerData, event) => {
                    // log all data of the clicked event
                    console.log("ops 2 clicked");
                    console.log(event)
                }}
            />
        </Nav>
    );
}


export default DragDropContext(Reservation);
