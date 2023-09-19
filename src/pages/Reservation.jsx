import React, {useEffect, useState} from "react";
import Nav from "../components/layout/Nav";
import BreadcrumbsComponent from "@mui/material/Breadcrumbs";
import {Box, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
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


// ################################################### UTILS #########################################################
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

const getStatusColors = (status) => {
    switch (status) {
        case 'Pending':
            return '#b4891d';
        case 'Confirmed':
            return '#28a7a3';
        default:
            return ''; // retourne une chaîne vide pour la couleur par défaut
    }
};

// ################################################### MODALS ########################################################

function CreateReservationModal({isOpen, onClose, data, setData, createReservation}) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                Créer une réservation
                <IconButton style={{position: 'absolute', top: '10px', right: '10px'}}
                            onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Email"
                    type="email"
                    value={data.email || ""}
                    onChange={(e) => setData({...data, email: e.target.value || ""})}
                    placeholder="(requis)"
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Prénom"
                    type="text"
                    value={data.firstname || ""}
                    onChange={(e) => setData({...data, firstname: e.target.value || ""})}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Nombre de personnes"
                    type="number"
                    value={data.numberOfPersons || ""}
                    onChange={(e) => setData({...data, numberOfPersons: parseInt(e.target.value) || ""})}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Date"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={moment(data.date).format("YYYY-MM-DDTHH:mm:ss") || ""}
                    onChange={(e) => setData({
                        ...data,
                        date: moment(e.target.value).format("YYYY-MM-DDTHH:mm:ssZ") || ""
                    })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => createReservation()} color="primary" disabled={data.email === ""}>
                    Créer
                </Button>
            </DialogActions>
        </Dialog>
    )
        ;
}

function ModifyReservationModal({isOpen, onClose, data, setData, modifyReservation, allTables}) {

    const [availableTables, setAvailableTables] = useState([]);


    useEffect(() => {
        // Charger les tables disponibles depuis l'API
        if (moment(data.date).isValid()) {
            Api.instance.get('api/reservation/available_tables/' + moment(data.date).format("YYYY-MM-DDTHH:mm:ssZ"))
                .then(response => {
                    const apiTableIds = response.data.map(table => table.id); // Extrait seulement les IDs
                    // Fusionner les IDs de tables de l'API avec les tables sélectionnées
                    const mergedTables = [...new Set([...apiTableIds, ...data.tables])];
                    setAvailableTables(mergedTables);
                })
                .catch(error => {
                    console.error("Error fetching available tables:", error);
                });
        } else {
            console.log("Invalid date during useEffect in ModifyReservationModal");
        }
    }, [data]);

    const isTableAvailable = (tableId) => {
        return availableTables.includes(tableId);
    }

    const toggleTableSelection = (tableId) => {
        if (data.tables.includes(tableId)) {
            setData(prevData => ({
                ...prevData,
                tables: prevData.tables.filter(id => id !== tableId)
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                tables: [...prevData.tables, tableId]
            }));
        }
        console.log("data.tables: ", data.tables)
    };
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                Modifier la reservation de {data.Client.firstname} {data.Client.lastname} (id: {data.id})
                <IconButton style={{position: 'absolute', top: '10px', right: '10px'}}
                            onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField
                    label="Prénom"
                    value={data.Client.firstname}
                    onChange={(e) => setData(prev => ({
                        ...prev,
                        Client: {...prev.Client, firstname: e.target.value || ""}
                    }))}
                    fullWidth
                    margin="dense"
                />

                <TextField
                    label="Nom de famille"
                    value={data.Client.lastname}
                    onChange={(e) => setData(prev => ({
                        ...prev,
                        Client: {...prev.Client, lastname: e.target.value || ""}
                    }))}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Number of Persons"
                    value={data.numberOfPersons}
                    onChange={(e) => setData(prev => ({...prev, numberOfPersons: e.target.value || 1}))}
                    fullWidth
                    margin="dense"
                    type={"number"}
                />
                <TextField
                    label="Comment"
                    value={data.comment}
                    onChange={(e) => setData(prev => ({...prev, comment: e.target.value || ""}))}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Date et Heure"
                    type="datetime-local"
                    value={moment(data.date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm")} // Convertissez au format attendu pour l'affichage
                    onChange={(e) => {
                        const formattedDate = moment(e.target.value).format("YYYY-MM-DD HH:mm:ss"); // Convertissez au format que vous utilisez en interne
                        setData(prev => ({...prev, date: formattedDate || ""}));
                    }}
                    fullWidth
                    margin="dense"
                    inputProps={{
                        step: 900, // Pour les intervalles de 15 minutes
                    }}
                />


                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={data.status}
                        onChange={(e) => setData(prev => ({...prev, status: e.target.value}))}
                    >
                        <MenuItem value="Pending">En attente</MenuItem>
                        <MenuItem value="Confirmed">Confirmé</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Client Email"
                    value={data.Client.email}
                    onChange={(e) => setData(prev => ({
                        ...prev,
                        Client: {...prev.Client, email: e.target.value || ""}
                    }))}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Mobile Number"
                    value={data.Client.mobileNumber}
                    onChange={(e) => setData(prev => ({
                        ...prev,
                        Client: {...prev.Client, mobileNumber: e.target.value || ""}
                    }))}
                    fullWidth
                    margin="dense"
                />

                <Box marginBottom={2}>
                    <Typography variant="subtitle2" gutterBottom>
                        Tables associées:
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                        {allTables.map((table) => {
                            const isSelected = data.tables.includes(table.id);
                            const tableAvailable = isTableAvailable(table.id);
                            return (
                                <Chip
                                    key={table.id}
                                    label={table.name}
                                    clickable
                                    size="small"
                                    style={{
                                        margin: '4px',
                                        borderRadius: '8px',
                                        backgroundColor: isSelected ? getStatusColors(data.status) : '',
                                        color: isSelected ? 'white' : '',
                                        textDecoration: !tableAvailable ? 'line-through' : '' // Modification ici
                                    }}
                                    onClick={() => toggleTableSelection(table.id)}
                                />
                            );
                        })}
                    </Box>
                </Box>
            </DialogContent>


            <DialogActions>

                <Button onClick={() => {
                    modifyReservation()
                }} color="primary" disabled={data.Client.email === ""}>
                    Modifier
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function DeleteReservationModal({isOpen, onClose, data, setData, deleteTable, deleteFullReservation, noShow}) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                Supprimer la réservation de {data.Client.firstname} {data.Client.lastname} (réservation
                id: {data.reservationId} - reserved id: {data.reservedId} - table: {data.tableName})
                <IconButton style={{position: 'absolute', top: '10px', right: '10px'}}
                            onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                Que souhaitez-vous faire avec cette réservation ?
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={deleteTable}>
                    Supprimer uniquement {data.tableName}
                </Button>
                <Button variant="contained" color="secondary" onClick={deleteFullReservation}>
                    Supprimer toute la réservation
                </Button>
                <Button variant="contained" color="error" onClick={noShow}>
                    Signaler comme absent
                </Button>
            </DialogActions>
        </Dialog>
    );
}


// ################################################### MAIN ##########################################################

function Reservation() {

    // ######### STATE #########

    const [resources, setResources] = useState([]);
    const [events, setEvents] = useState([]);
    const [viewModel, setViewModel] = useState(new SchedulerData(moment().format("YYYY-MM-DD"),
        ViewTypes.Day,
        false,
        false,
        {
            dayStartFrom: 8,
            dayStopTo: 23,
        }));


    const [isModalCreateReservationOpen, setIsModalCreateReservationOpen] = useState(false);
    const [dataModalCreateReservation, setDataModalCreateReservation] = useState({
        email: "", date: "", firstname: "", lastname: "", numberOfPersons: 1
    });

    const [isModalModifyReservationOpen, setIsModalModifyReservationOpen] = useState(false);
    const [dataModalModifyReservation, setDataModalModifyReservation] = useState({
        id: 0,
        numberOfPersons: 1,
        comment: "",
        tables: [],
        date: "",
        status: "",
        Client: {
            id: 0,
            email: "",
            mobileNumber: "",
            firstname: "",
            lastname: ""
        }
    });

    const [isModalDeleteReservationOpen, setIsModalDeleteReservationOpen] = useState(false);
    const [dataModalDeleteReservation, setDataModalDeleteReservation] = useState({
        reservationId: 0,
        reservedId: 0,
        tableName: "",
        Client: {
            firstname: "",
            lastname: "",
            email: ""
        }
    });


    // ######### USE EFFECTS #########

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
                                id: reservation.Client.id,
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
                        id: table.id,
                        name: table.name + " (" + table.capacity + " pers.)",
                        trueName: table.name,
                        capacity: table.capacity,
                    }
                });
                setResources(result);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
            });

    }, []);

    // ### SCHEDULER FUNCTIONS ###

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
        let newSchedulerData = new SchedulerData(schedulerData.startDate, view.viewType, false, false, {
            agendaResourceTableWidth: 1600,
            dayStartFrom: 8,
            dayStopTo: 23,
        });
        newSchedulerData.setViewType(view.viewType)
        newSchedulerData.setResources(resources);
        newSchedulerData.setEvents(events);
        setViewModel(newSchedulerData);
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

                    {eventItem.Reservation.status === "Pending" &&
                        <Button variant="contained" color="success"
                                onClick={() => confirmEvent(schedulerData, eventItem)}>
                            Accepter
                        </Button>
                    }

                    <Button variant="contained" color="primary"
                            onClick={() => appearModalModify(schedulerData, eventItem)}>
                        Modifier
                    </Button>

                    {
                        eventItem.Reservation.status !== "Confirmed" ?
                            <Button variant="contained" color="error"
                                    onClick={() => absent(schedulerData, eventItem)}>
                                Refuser
                            </Button>
                            :
                            <Button variant="contained" color="error"
                                    onClick={() => appearModalDelete(schedulerData, eventItem)}>
                                Supprimer
                            </Button>
                    }
                </Box>
            </Box>);
    }

    function newEvent(schedulerData, slotId, slotName, start, end, type, item) {
        appearModalCreate(start);
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

    // ### MODAL AND BUTTON FUNCTIONS ###

    function appearModalModify(schedulerData, event) {
        setDataModalModifyReservation({
            id: event.Reservation.id,
            numberOfPersons: event.Reservation.numberOfPerson || "",
            comment: event.Reservation.comment || "",
            tables: events.filter((e) => e.Reservation.id === event.Reservation.id).map((e) => e.Table.id),
            date: event.start,
            status: event.Reservation.status || "",
            Client: {
                id: event.Client.id,
                email: event.Client.email || "",
                mobileNumber: event.Client.mobileNumber || "",
                firstname: event.Client.firstname || "",
                lastname: event.Client.lastname || ""
            }
        })
        setIsModalModifyReservationOpen(true);
    }

    function appearModalCreate(start) {
        setDataModalCreateReservation({
            ...dataModalCreateReservation, date: moment(start).format("YYYY-MM-DDTHH:mm:ssZ")
        });
        setIsModalCreateReservationOpen(true);
    }

    function appearModalDelete(schedulerData, event) {
        setDataModalDeleteReservation({
            reservationId: event.Reservation.id,
            reservedId: event.id,
            tableName: event.Table.name,
            Client: {
                firstname: event.Client.firstname,
                lastname: event.Client.lastname,
                email: event.Client.email
            }
        })
        setIsModalDeleteReservationOpen(true);
    }

    function clearModalCreation() {
        setIsModalCreateReservationOpen(false);
        setDataModalCreateReservation({
            email: "", date: "", firstname: "", lastname: "", numberOfPersons: 1
        });
    }

    function clearModalModification() {
        setIsModalModifyReservationOpen(false);
        setDataModalModifyReservation({
                id: 0,
                numberOfPersons: 1,
                comment: "",
                tables: [],
                date: "",
                status: "",
                Client: {
                    id: 0,
                    email: "",
                    mobileNumber: "",
                    firstname: "",
                    lastname: ""
                }
            }
        );
    }

    function createReservation() {
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
                            id: response.data.Client.id,
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
                clearModalCreation();
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
            });
    }

    function modifyReservation() {
        const dataToSend = dataModalModifyReservation
        // put date in the correct format
        dataToSend.date = moment(dataToSend.date).format("YYYY-MM-DDTHH:mm:ssZ")
        dataToSend.tables = dataToSend.tables.map((tableId) => {
            return tableId
        })
        dataToSend.numberOfPersons = parseInt(dataToSend.numberOfPersons)
        let newEvents = [];

        Api.instance.put("/api/reservation/" + dataModalModifyReservation.id, dataToSend)
            .then((response) => {
                // delete old events with the same reservationId
                setEvents((events) => events.filter((e) => e.Reservation.id !== response.data.id));

                // set the new events
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
                            id: response.data.Client.id,
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
                clearModalModification();
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
            });
    }


    function deleteReservation(schedulerData, event) {
        console.log("delete event clicked");
    }

    function absent(schedulerData, event) {
        console.log("no-show event clicked")
    }

    function confirmEvent(schedulerData, event) {
        console.log("confirm event clicked")
    }

    return (
        <Nav Breadcrumbs={CustomBreadcrumbs}>

            <CreateReservationModal
                isOpen={isModalCreateReservationOpen}
                onClose={clearModalCreation}
                data={dataModalCreateReservation}
                setData={setDataModalCreateReservation}
                createReservation={createReservation}
            />

            <ModifyReservationModal
                isOpen={isModalModifyReservationOpen}
                onClose={clearModalModification}
                data={dataModalModifyReservation}
                setData={setDataModalModifyReservation}
                modifyReservation={() => modifyReservation()}
                allTables={resources}
            />

            <DeleteReservationModal
                isOpen={isModalDeleteReservationOpen}
                onClose={() => setIsModalDeleteReservationOpen(false)}
                data={dataModalDeleteReservation}
                setData={setDataModalDeleteReservation}
                deleteTable={() => {
                    console.log("delete table clicked")
                }}
                deleteFullReservation={() => {
                    console.log("delete full reservation clicked")
                }}
                noShow={() => {
                    console.log("no-show clicked")
                }}
            />


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

            <Button variant="contained" color="primary" onClick={() => console.log(events)}>
                Log le state events
            </Button>

        </Nav>);
}


export default DragDropContext(Reservation);
