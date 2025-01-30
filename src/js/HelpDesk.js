// основной класс приложения
import TicketView from "./TicketView";
import TicketForm from "./TicketForm";
import TicketConfirm from "./TicketConfirm";

class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not an HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;
    this.tickets = [];
    this.ticketView = new TicketView();
    this.ticketForm = new TicketForm();
    this.TicketConfirm = new TicketConfirm();
  }

  // Инициализация приложения
  init() {
    this.render();
    this.loadTickets();
    this.addEventListeners();
  }

  // Загрузка тикетов с сервера
  loadTickets() {
    this.ticketService.list((tickets) => {
      this.tickets = tickets;
      this.renderTickets();
    });
  }

  // Отображение тикетов в интерфейсе
  renderTickets() {
    const ticketsContainer = this.container.querySelector(".tickets");
    ticketsContainer.innerHTML = "";
    this.tickets.forEach((ticket) => {
      const ticketElement = this.ticketView.render(ticket);
      ticketsContainer.appendChild(ticketElement);

      // Обработчики для тикета
      this.addTicketEventListeners(ticketElement, ticket);
    });
  }

  // Отображение интерфейса приложения
  render() {
    this.container.innerHTML = `
      <div class="helpdesk">
        <div class="header-bar">
          <div class="dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
        <button class="add-ticket-btn">Добавить тикет</button>
        <div class="tickets"></div>
      </div>
    `;
  }

  // Обработчик клика на кнопку добавления тикета
  addEventListeners() {
    const addTicketBtn = this.container.querySelector(".add-ticket-btn");
    addTicketBtn.addEventListener("click", () => {
      this.ticketForm.show(null, (data) => this.createTicket(data));
    });
  }

  // Обработчики событий для кнопок тикета
  addTicketEventListeners(ticketElement, ticket) {
    const editBtn = ticketElement.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      this.ticketForm.show(ticket, (updatedData) =>
        this.updateTicket(ticket.id, updatedData),
      );
    });

    const deleteBtn = ticketElement.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      this.deleteTicket(ticket.id);
    });

    const doneBtn = ticketElement.querySelector(".done-btn");
    doneBtn.addEventListener("click", () => {
      this.updateTicket(ticket.id, { status: !ticket.status });
    });
  }

  // Создание нового тикета
  createTicket(data) {
    this.ticketService.create(data, (newTicket) => {
      this.tickets.push(newTicket);
      this.loadTickets();
    });
  }

  // Обновление тикета
  updateTicket(id, data) {
    this.ticketService.update(id, data, () => {
      this.loadTickets();
    });
  }

  // Удаление тикета
  deleteTicket(id) {
    this.TicketConfirm.show(() => {
      this.ticketService.delete(id, () => {
        this.loadTickets();
      });
    });
  }
}

export default HelpDesk;
