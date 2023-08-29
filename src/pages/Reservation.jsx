import React, {useState} from "react";
import Nav from "../components/layout/Nav";
import BreadcrumbsComponent from "@mui/material/Breadcrumbs";
import {Typography} from "@mui/material";
import {BiTime} from "react-icons/bi";
import withDragDropContext from "./withDnDContext.js";
import DragDropContext from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


//1. import
import Scheduler, {SchedulerData, ViewTypes} from "react-big-scheduler";
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'

//2. create the view model, put it in the props obj
let schedulerData = new SchedulerData(moment().format('YYYY-MM-DD'), ViewTypes.Day);
//set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
schedulerData.localeMoment(moment.toString());
let resources = [
    {
        id: 'r0',
        name: 'Resource0',
        groupOnly: true
    },
    {
        id: 'r1',
        name: 'Resource1'
    },
    {
        id: 'r2',
        name: 'Resource2',
        parentId: 'r0'
    },
    {
        id: 'r3',
        name: 'Resource3',
        parentId: 'r4'
    },
    {
        id: 'r4',
        name: 'Resource4',
        parentId: 'r2'
    },
];
schedulerData.setResources(resources);

let events = [
    {
        id: 1,
        start: '2017-12-18 09:30:00',
        end: '2017-12-19 23:30:00',
        resourceId: 'r1',
        title: 'I am finished',
        bgColor: '#D9D9D9'
    },
    {
        id: 2,
        start: '2017-12-18 12:30:00',
        end: '2017-12-26 23:30:00',
        resourceId: 'r2',
        title: 'I am not resizable',
        resizable: false
    },
    {
        id: 3,
        start: '2017-12-19 12:30:00',
        end: '2017-12-20 23:30:00',
        resourceId: 'r3',
        title: 'I am not movable',
        movable: false
    },
    {
        id: 4,
        start: '2017-12-19 14:30:00',
        end: '2017-12-20 23:30:00',
        resourceId: 'r1',
        title: 'I am not start-resizable',
        startResizable: false
    },
    {
        id: 5,
        start: '2017-12-19 15:30:00',
        end: '2017-12-20 23:30:00',
        resourceId: 'r2',
        title: 'R2 has recurring tasks every week on Tuesday, Friday',
        rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
        bgColor: '#f759ab'
    }
];


let state = {
    viewModel: schedulerData
}


let prevClick;
prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(events);
    this.setState({
        viewModel: schedulerData
    })
}

let nextClick;
nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(events);
    this.setState({
        viewModel: schedulerData
    })
}

let onViewChange;
onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(events);
    this.setState({
        viewModel: schedulerData
    })
}

let onSelectDate;
onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(events);
    this.setState({
        viewModel: schedulerData
    })
}

let eventClicked;
eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
};

let ops1;
ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
};

let ops2;
ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
};

let newEvent;
newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (window.confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)) {

        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if (item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: 'New event you just created',
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: 'purple'
        }
        schedulerData.addEvent(newEvent);
        this.setState({
            viewModel: schedulerData
        })
    }
}

let updateEventStart = (schedulerData, event, newStart) => {
    if (window.confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
        schedulerData.updateEventStart(event, newStart);
    }
    this.setState({
        viewModel: schedulerData
    })
}

let updateEventEnd = (schedulerData, event, newEnd) => {
    if (window.confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
        schedulerData.updateEventEnd(event, newEnd);
    }
    this.setState({
        viewModel: schedulerData
    })
}

let moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (window.confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({
            viewModel: schedulerData
        })
    }
}

let onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
        schedulerData.next();
        schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData
        });

        schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
}

let onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
        schedulerData.prev();
        schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData
        });

        schedulerContent.scrollLeft = 10;
    }
}

let onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollTop');
}

let onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollBottom');
}

let toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
        viewModel: schedulerData
    });
}
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
    // const {schedulerData} = this.props;
    const [viewModel, setViewModel] = useState(schedulerData)

    return (
        <Nav Breadcrumbs={CustomBreadcrumbs}>
            <Row>
                <Col span={24}>

                    <Scheduler schedulerData={viewModel}
                               prevClick={prevClick}
                               nextClick={nextClick}
                               onSelectDate={onSelectDate}
                               onViewChange={onViewChange}
                               eventItemClick={eventClicked}
                               viewEventClick={ops1}
                               viewEventText="Ops 1"
                               viewEvent2Text="Ops 2"
                               viewEvent2Click={ops2}
                               updateEventStart={updateEventStart}
                               updateEventEnd={updateEventEnd}
                               moveEvent={moveEvent}
                               newEvent={newEvent}
                               onScrollLeft={onScrollLeft}
                               onScrollRight={onScrollRight}
                               onScrollTop={onScrollTop}
                               onScrollBottom={onScrollBottom}
                               toggleExpandFunc={toggleExpandFunc}
                    />
                </Col>
            </Row>
        </Nav>
    );
}

Reservation = withDragDropContext(Reservation);

export default Reservation;