import HelpDesk from "./HelpDesk";
import TicketService from "./TicketService";
import TicketView from "./TicketView";
import TicketForm from "./TicketForm";
import TicketConfirm from "./TicketConfirm";

const root = document.getElementById("root");

const ticketService = new TicketService("http://localhost:7070");
const ticketView = new TicketView();
const ticketForm = new TicketForm();
const ticketConfirm = new TicketConfirm();

const app = new HelpDesk(root, ticketService, ticketView, ticketForm, ticketConfirm);

app.init();
