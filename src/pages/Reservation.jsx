import React, {useEffect, useState} from "react";
import Nav from "../components/layout/Nav";
import BreadcrumbsComponent from "@mui/material/Breadcrumbs";
import {Typography} from "@mui/material";
import {BiTime} from "react-icons/bi";
import {FaUser} from 'react-icons/fa';
import Scheduler, {SchedulerData, ViewTypes} from "react-big-scheduler";
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import DragDropContext from "./withDnDContext";
import Api from "../utils/Api";


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
    let schedulerData = new SchedulerData(moment().format('YYYY-MM-DD'), ViewTypes.Day);
    schedulerData.localeMoment(moment.toString());

    const [resources, setResources] = useState([]);
    const [events, setEvents] = useState([]);
    const [viewModel, setViewModel] = useState(
        new SchedulerData(moment().format("YYYY-MM-DD"), ViewTypes.Day)
    );

    useEffect(() => {
        console.log("useEffect 1 has been called!");
        let newSchedulerData = new SchedulerData(
            moment().format("YYYY-MM-DD"),
            ViewTypes.Day
        );

        newSchedulerData.localeMoment(moment.toString());
        newSchedulerData.setResources(resources);
        newSchedulerData.setEvents(events);
        setViewModel(newSchedulerData);
    }, [resources, events]);

    useEffect(() => {
        console.log("useEffect 2 has been called!");
        Api.instance.get('/api/reservation')
            .then((data) => {
                data.data.map((reservation) => {
                    reservation.Reserved.map((reserved) => {
                        // for all events, if the event is "Confirmed", set bgColor: '#28a745';
                        // if the event is "Pending", set bgColor: '#ffc107';
                        // else set bgColor: '#dc3545';
                        let newEvent = {
                            id: reserved.id,
                            resourceId: reserved.Table.id,
                            start: moment(reservation.date).format("YYYY-MM-DD HH:mm:ss"),
                            end: moment(reservation.date).add(1, 'hours').add(30, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
                            title: reservation.Client.firstname + " " + reservation.Client.lastname,
                            bgColor: reservation.status === "Confirmed" ? '#28a7a3' : reservation.status === "Pending" ? '#b4891d' : '#dc3545',
                            Client: {
                                clientId: reservation.Client.id,
                                firstname: reservation.Client.firstname,
                                lastname: reservation.Client.lastname,
                                email: reservation.Client.email,
                                phone: reservation.Client.mobileNumber,
                                noShow: reservation.Client.countNoShow
                            },
                            Table: {
                                id: reserved.Table.id,
                                name: reserved.Table.name,
                                capacity: reserved.Table.capacity
                            },
                            Reservation: {
                                id: reservation.id,
                                numberOfPerson: reservation.numberOfPersons,
                                comment: reservation.comment,
                                status: reservation.status
                            },
                            resizable: false
                        };
                        setEvents((events) => [...events, newEvent]);
                    });
                });
            })
            .catch((error) => console.error("Erreur lors de la récupération des données:", error));

        Api.instance.get(
            '/api/table',
            {withCredentials: true}
        )
            .then((response) => {
                const result = response.data;
                const result2 = result.map((table) => {
                    return {
                        id: table.id,
                        name: table.name + " (" + table.capacity + ")",
                    }
                });
                setResources(result2);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
            });

    }, []);

    function nextClick() {
        let newSchedulerData = new SchedulerData(viewModel.startDate, viewModel.viewType);
        newSchedulerData.next();
        newSchedulerData.setResources(resources);
        newSchedulerData.setEvents(events);
        setViewModel(newSchedulerData);
        // Trigger window resize event
        window.dispatchEvent(new Event('resize'));
    }

    function prevClick() {
        let newSchedulerData = new SchedulerData(viewModel.startDate, viewModel.viewType);
        newSchedulerData.prev();
        newSchedulerData.setResources(resources);
        newSchedulerData.setEvents(events);
        setViewModel(newSchedulerData);
        // Trigger window resize event
        window.dispatchEvent(new Event('resize'));
    }

    function onSelectDate(schedulerData, date) {
        let newSchedulerData = new SchedulerData(date, viewModel.viewType, viewModel.isEventPerspective);
        newSchedulerData.setDate(date);
        newSchedulerData.setEvents(events);
        newSchedulerData.setResources(resources);
        setViewModel(newSchedulerData);
    }

    function onViewChange(schedulerData, view) {
        let newSchedulerData = new SchedulerData(viewModel.startDate, view.viewType);
        newSchedulerData.setViewType(view.viewType);
        newSchedulerData.setEvents(events);
        newSchedulerData.setResources(resources);
        setViewModel(newSchedulerData);
    }

    function newEvent(schedulerData, slotId, slotName, start, end, type, item) {


        const dataToSend = {
            email: "maris13127@gmail.com",
            mobileNumber: "0646251728",
            firstname: "anasse",
            lastname: "el bourachdi",
            date: moment(start).format("YYYY-MM-DDTHH:mm:ssZ"),
            numberOfPersons: 3,
            comment: "commentaire de test"
        }

        let newEvents = [];

        Api.instance.post(
            'api/reservation/create_reservation',
            dataToSend,
            {withCredentials: true}
        )
            .then((response) => {
                newEvents = response.data.Reserved.map((reserved) => {
                    let newEvent = {
                        resourceId: reserved.Table.id,
                        id: reserved.id,
                        ReservationId: response.data.id,
                        start: moment(response.data.date).format("YYYY-MM-DD HH:mm:ss"),
                        end: moment(response.data.date).add(1, 'hours').add(30, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
                        title: response.data.Client.firstname + " " + response.data.Client.lastname,
                        bgColor: response.data.status === "Confirmed" ? '#28a7a3' : response.data.status === "Pending" ? '#b4891d' : '#dc3545',
                        Client: {
                            clientId: response.data.Client.id,
                            firstname: response.data.Client.firstname,
                            lastname: response.data.Client.lastname,
                            email: response.data.Client.email,
                            phone: response.data.Client.mobileNumber,
                            noShow: response.data.Client.countNoShow
                        },
                        Table: {
                            id: reserved.Table.id,
                            name: reserved.Table.name,
                            capacity: reserved.Table.capacity
                        },
                        Reservation: {
                            id: response.data.id,
                            numberOfPerson: response.data.numberOfPersons,
                            comment: response.data.comment,
                            status: response.data.status
                        },
                        resizable: false
                    };
                    return newEvent;
                });
                setEvents((events) => [...events, ...newEvents]);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
            });

    }

    function moveEvent(schedulerData, event, slotId, slotName, start, end) {
        // replace the original event in the array with the same event but different ressourceId
        const newEvents = events.map((e) => {
            if (e.id === event.id) {
                return {
                    ...e,
                    resourceId: slotId,
                    start: moment(start).format("YYYY-MM-DD HH:mm:ss"),
                    end: moment(start).add(1, 'hours').add(30, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
                };
            } else if (e.Reservation.id === event.Reservation.id) {
                return {
                    ...e,
                    start: moment(start).format("YYYY-MM-DD HH:mm:ss"),
                    end: moment(start).add(1, 'hours').add(30, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
                };
            }
            return e;
        });
        // keep event with only the same Reservation.id
        const dataToSend = newEvents.filter((e) => e.Reservation.id === event.Reservation.id).map((e) => {
            return e.resourceId;
        })
        Api.instance.post(
            '/api/reservation/' + event.Reservation.id + '/reassign_table',
            {tables: dataToSend},
            {withCredentials: true}
        ).then((response) => {
            Api.instance.post(
                '/api/reservation/' + event.Reservation.id + '/change_date',
                {date: moment(start).format("YYYY-MM-DDTHH:mm:ssZ")},
                {withCredentials: true}
            ).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
            });
            setEvents(newEvents);
        }).catch((error) => {
            console.error("Erreur lors de la récupération des données:", error);
        })
    }

    function deleteEvent(schedulerData, event) {
        console.log("delete event clicked");
    }

    function modifyEvent(schedulerData, event) {
        console.log("modify event clicked")
    }

    function confirmEvent(schedulerData, event) {
        console.log("confirm event clicked")
    }

    function sendEmail(schedulerData, event) {
        console.log("send email clicked")
    }

    function eventItemPopoverTemplateResolver(schedulerData, eventItem, title, start, end, statusColor) {
        return (
            <div style={{padding: '0px'}}>
                <div style={{
                    wordWrap: 'break-word',
                    color: '#333',
                    marginBottom: '10px',
                    fontSize: '24px'
                }}>{title}</div>
                <div style={{
                    color: '#666',
                    marginBottom: '8px',
                    display: 'flex',
                    fontSize: '24px',
                    alignItems: 'center'
                }}>
                    <FaUser size={20} color="#666" style={{marginRight: '8px'}}/>
                    <div>{eventItem.Reservation.numberOfPerson}</div>
                </div>
                <div style={{fontSize: '24px', display: 'flex'}}>
                    <div style={{color: '#4CAF50'}}>
                        {moment(start).format('HH:mm')}
                    </div>
                    <div style={{fontSize: '12px'}}>
                        {moment(start).format('DD MMM')}
                    </div>
                    <div style={{margin: '0 15px'}}>
                        -
                    </div>
                    <div style={{color: '#4CAF50'}}>
                        {moment(end).format('HH:mm')}
                    </div>
                    <div style={{fontSize: '12px'}}>
                        {moment(end).format('DD MMM')}
                    </div>
                </div>

                <span>Commentaire:</span>
                <div style={{
                    wordWrap: 'break-word',
                    color: '#666',
                    marginBottom: '8px',
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '5px'
                }}>
                    {eventItem.Reservation.comment}
                </div>

                <div style={{
                    wordWrap: 'break-word',
                    color: '#666',
                    marginBottom: '15px'
                }}>
                    Status: {eventItem.Reservation.status}
                </div>

                <div style={{display: 'flex', gap: '10px'}}>
                    {eventItem.Reservation.status === "Confirmed" && (
                        <button
                            onClick={() => modifyEvent(schedulerData, eventItem)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            Modifier
                        </button>
                    )}

                    {eventItem.Reservation.status === "Pending" && (
                        <button
                            onClick={() => confirmEvent(schedulerData, eventItem)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            Confirmer
                        </button>
                    )}

                    <button
                        onClick={() => deleteEvent(schedulerData, eventItem)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Nav Breadcrumbs={CustomBreadcrumbs}>

            <Scheduler
                schedulerData={viewModel}
                nextClick={nextClick}
                onSelectDate={onSelectDate}
                onViewChange={onViewChange}
                prevClick={prevClick}

                eventItemClick={(schedulerData, event) => {
                    console.log(event);
                }}
                newEvent={newEvent}

                moveEvent={moveEvent}

                eventItemPopoverTemplateResolver={eventItemPopoverTemplateResolver}
            />
        </Nav>
    );
}


export default DragDropContext(Reservation);
