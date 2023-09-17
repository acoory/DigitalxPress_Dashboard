import React, {useEffect, useState} from "react";
import Nav from "../components/layout/Nav";
import BreadcrumbsComponent from "@mui/material/Breadcrumbs";
import {Box, TextField, Typography} from "@mui/material";
import {BiTime} from "react-icons/bi";
import {FaBan, FaCalendarCheck, FaEnvelope, FaPhone, FaUsers} from 'react-icons/fa';
import Scheduler, {SchedulerData, ViewTypes} from "react-big-scheduler";
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import DragDropContext from "./withDnDContext";
import Api from "../utils/Api";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function CustomBreadcrumbs() {
    return (<BreadcrumbsComponent aria-label="breadcrumb" separator="/">
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
    </BreadcrumbsComponent>);
}


function Reservation() {
    let schedulerData = new SchedulerData(moment().format('YYYY-MM-DD'), ViewTypes.Day);
    schedulerData.localeMoment(moment.toString());

    const [resources, setResources] = useState([]);
    const [events, setEvents] = useState([]);
    const [viewModel, setViewModel] = useState(new SchedulerData(moment().format("YYYY-MM-DD"), ViewTypes.Day));

    const [isModalCreateReservationOpen, setIsModalCreateReservationOpen] = useState(false);
    const [dataModalCreateReservation, setDataModalCreateReservation] = useState({
        email: "", date: "", firstname: "", lastname: "", numberOfPersons: 1
    });

    useEffect(() => {
        console.log("useEffect 1 has been called!");
        let newSchedulerData = new SchedulerData(viewModel.startDate, viewModel.viewType);
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
                                mobileNumber: reservation.Client.mobileNumber,
                                count_no_shows: reservation.Client.count_no_shows,
                                count_reservations: reservation.Client.count_reservations
                            },
                            Table: {
                                id: reserved.Table.id, name: reserved.Table.name, capacity: reserved.Table.capacity
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

        Api.instance.get('/api/table', {withCredentials: true})
            .then((response) => {
                const result = response.data.map((table) => {
                    return {
                        id: table.id, name: table.name + " (" + table.capacity + ")",
                    }
                });
                setResources(result);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
            });

    }, []);

    function cleanModalCreateReservation() {
        setIsModalCreateReservationOpen(false);
        setDataModalCreateReservation({
            email: "", date: "", firstname: "", lastname: "", numberOfPersons: 1
        });
    }

    function nextClick(schedulerData) {
        let newSchedulerData = new SchedulerData(schedulerData.startDate, schedulerData.viewType);
        newSchedulerData.next();
        newSchedulerData.setResources(resources);
        newSchedulerData.setEvents(events);
        setViewModel(newSchedulerData);
    }

    function prevClick(schedulerData) {
        let newSchedulerData = new SchedulerData(schedulerData.startDate, schedulerData.viewType);
        newSchedulerData.prev();
        newSchedulerData.setResources(resources);
        newSchedulerData.setEvents(events);
        setViewModel(newSchedulerData);
    }

    function onSelectDate(schedulerData, date) {
        let newSchedulerData = new SchedulerData(date, schedulerData.viewType);
        newSchedulerData.setResources(resources);
        newSchedulerData.setEvents(events);
        setViewModel(newSchedulerData);
    }

    function onViewChange(schedulerData, view) {
        let newSchedulerData = new SchedulerData(schedulerData.startDate, view.viewType, schedulerData.isEventPerspective);
        newSchedulerData.setResources(resources);
        newSchedulerData.setEvents(events);
        setViewModel(newSchedulerData);
    }

    function createReservation() {

        console.log("createReservation has been called!")
        console.log("Here is the dataModalCreateReservation: ", dataModalCreateReservation)
        let newEvents = [];

        Api.instance.post('api/reservation/create_reservation', dataModalCreateReservation, {withCredentials: true})
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
                            mobileNumber: response.data.Client.mobileNumber,
                            count_no_shows: response.data.Client.count_no_shows,
                            count_reservations: response.data.Client.count_reservations
                        },
                        Table: {
                            id: reserved.Table.id, name: reserved.Table.name, capacity: reserved.Table.capacity
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
                setIsModalCreateReservationOpen(false);
                cleanModalCreateReservation();
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
            });

    }

    function newEvent(schedulerData, slotId, slotName, start, end, type, item) {
        setDataModalCreateReservation({
            ...dataModalCreateReservation, date: moment(start).format("YYYY-MM-DDTHH:mm:ssZ")
        });
        setIsModalCreateReservationOpen(true);
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
        Api.instance.post('/api/reservation/' + event.Reservation.id + '/reassign_table', {tables: dataToSend}, {withCredentials: true}).then((response) => {
            Api.instance.post('/api/reservation/' + event.Reservation.id + '/change_date', {date: moment(start).format("YYYY-MM-DDTHH:mm:ssZ")}, {withCredentials: true}).then((response) => {
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
            <Box p={2}>
                {/* Nom du client */}
                <Typography variant="h6" gutterBottom>
                    {eventItem.Client.firstname} {eventItem.Client.lastname}
                </Typography>

                {/* Email et numéro de téléphone du client */}
                <Box display="flex" marginBottom={2} justifyContent={"space-between"}>
                    <Box display="flex" alignItems="center">
                        <FaEnvelope size={20} color="#666" style={{marginRight: '8px'}}/>
                        <Typography variant="body1" color="textSecondary">
                            {eventItem.Client.email}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <FaPhone size={20} color="#666" style={{marginRight: '8px'}}/>
                        <Typography variant="body1" color="textSecondary">
                            {eventItem.Client.mobileNumber}
                        </Typography>
                    </Box>
                </Box>

                {/* Nombre de personnes, nombre de réservations et nombre de no-shows du client */}
                <Box display="flex" marginBottom={2} justifyContent={"space-between"}>

                    <Box display="flex" alignItems="center" marginBottom={1}>
                        <FaUsers size={20} color="#666" style={{marginRight: '8px'}}/>
                        <Typography variant="subtitle1">
                            {eventItem.Reservation.numberOfPerson} pers.
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" marginBottom={1}>
                        <FaCalendarCheck size={20} color="#666" style={{marginRight: '8px'}}/>
                        <Typography variant="subtitle1">
                            {eventItem.Client.count_reservations} réserv.
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" marginBottom={1}>
                        <FaBan size={20} color="#666" style={{marginRight: '8px'}}/>
                        <Typography variant="subtitle1">
                            {eventItem.Client.count_no_shows} no-shows
                        </Typography>
                    </Box>

                </Box>

                {/* Heure de début et de fin */}
                <Box marginBottom={2} display="flex" alignItems="center">
                    {/* Heure de début */}
                    <Typography variant="h4" color="primary" style={{marginRight: '15px', fontWeight: 'bold'}}>
                        {moment(start).format('HH:mm')}
                    </Typography>

                    {/* Jour de début */}
                    <Typography variant="body2" color="textSecondary">
                        {moment(start).format('DD MMM')}
                    </Typography>

                    <Typography style={{margin: '0 15px', fontSize: '12px'}}>
                        -
                    </Typography>

                    {/* Heure de fin */}
                    <Typography variant="h4" color="primary" style={{marginRight: '15px', fontWeight: 'bold'}}>
                        {moment(end).format('HH:mm')}
                    </Typography>

                    {/* Jour de fin */}
                    <Typography variant="body2" color="textSecondary">
                        {moment(end).format('DD MMM')}
                    </Typography>
                </Box>

                {/* Tables associées à la même réservation */}
                <Box marginBottom={2}>
                    <Typography variant="subtitle2" gutterBottom>
                        Tables associées:
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        {events.filter((e) => e.Reservation.id === eventItem.Reservation.id).map((e) => {
                            return (
                                <Box
                                    key={e.id}
                                    bgcolor={e.bgColor}
                                    color="white"
                                    borderRadius={1}
                                    p={1}
                                    fontSize={12}
                                >
                                    {e.Table.name}
                                </Box>
                            );
                        })}
                    </Box>
                </Box>

                {/* Commentaire */}
                {eventItem.Reservation.comment &&
                    <>

                        <Typography variant="subtitle2" gutterBottom>
                            Commentaire:
                        </Typography>
                        <Box
                            style={{wordWrap: 'break-word'}}
                            marginBottom={2}
                            border={1}
                            borderColor="grey.300"
                            p={1}
                            borderRadius={1}
                        >
                            <Typography color="textSecondary">
                                {eventItem.Reservation.comment}
                            </Typography>
                        </Box>
                    </>
                }

                {/* Status */}
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Status: {eventItem.Reservation.status}
                </Typography>

                {/* Boutons d'action */}
                <Box display="flex" gap={2}>
                    <Button variant="contained" color="primary" onClick={() => modifyEvent(schedulerData, eventItem)}>
                        Modifier
                    </Button>

                    {eventItem.Reservation.status === "Pending" && (
                        <Button variant="contained" color="success"
                                onClick={() => confirmEvent(schedulerData, eventItem)}>
                            Confirmer
                        </Button>
                    )}

                    <Button variant="contained" color="error" onClick={() => deleteEvent(schedulerData, eventItem)}>
                        Supprimer
                    </Button>
                </Box>
            </Box>);
    }

    return (<Nav Breadcrumbs={CustomBreadcrumbs}>

        {isModalCreateReservationOpen && (
            <Dialog open={isModalCreateReservationOpen} onClose={() => cleanModalCreateReservation()}>
                <DialogTitle>
                    Créer une réservation
                    <IconButton style={{position: 'absolute', top: '10px', right: '10px'}}
                                onClick={() => setIsModalCreateReservationOpen(false)}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        type="email"
                        value={dataModalCreateReservation.email}
                        onChange={(e) => setDataModalCreateReservation({
                            ...dataModalCreateReservation, email: e.target.value
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Prénom"
                        type="text"
                        value={dataModalCreateReservation.firstname}
                        onChange={(e) => setDataModalCreateReservation({
                            ...dataModalCreateReservation, firstname: e.target.value
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Nombre de personnes"
                        type="number"
                        value={dataModalCreateReservation.numberOfPersons}
                        onChange={(e) => setDataModalCreateReservation({
                            ...dataModalCreateReservation, numberOfPersons: parseInt(e.target.value)
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Date"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={moment(dataModalCreateReservation.date).format("YYYY-MM-DDTHH:mm:ss")}
                        onChange={(e) => setDataModalCreateReservation({
                            ...dataModalCreateReservation, date: moment(e.target.value).format("YYYY-MM-DDTHH:mm:ssZ")
                        })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => createReservation()} color="primary">
                        Créer
                    </Button>
                </DialogActions>
            </Dialog>)}


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
    </Nav>);
}


export default DragDropContext(Reservation);
