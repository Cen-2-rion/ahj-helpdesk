// основной класс приложения
class HelpDesk {
  constructor(container, ticketService, ticketView, ticketForm, ticketConfirm) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not an HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;
    this.tickets = [];
    this.ticketView = ticketView;
    this.ticketForm = ticketForm;
    this.TicketConfirm = ticketConfirm;
  }

  // инициализация приложения
  init() {
    this.render();
    this.loadTickets();
    this.addEventListeners();
  }

  // загрузка тикетов с сервера
  loadTickets() {
    this.ticketService.list((tickets) => {
      this.tickets = tickets;
      this.renderTickets();
    });
  }

  // отображение тикетов в интерфейсе
  renderTickets() {
    const ticketsContainer = this.container.querySelector(".tickets");
    ticketsContainer.innerHTML = "";
    this.tickets.forEach((ticket) => {
      const ticketElement = this.ticketView.render(ticket);
      ticketsContainer.appendChild(ticketElement);

      // обработчики для тикета
      this.addTicketEventListeners(ticketElement, ticket);
    });
  }

  // отображение интерфейса приложения
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

  // обработчик клика на кнопку добавления тикета
  addEventListeners() {
    const addTicketBtn = this.container.querySelector(".add-ticket-btn");
    addTicketBtn.addEventListener("click", () => {
      this.ticketForm.show(null, (data) => this.createTicket(data));
    });
  }

  // обработчики событий для кнопок тикета
  addTicketEventListeners(ticketElement, ticket) {
    const editBtn = ticketElement.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      this.ticketForm.show(ticket, (updatedData) =>
        this.updateTicket(ticket.id, updatedData),
      );
    });

    const deleteBtn = ticketElement.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      this.TicketConfirm.show(() => this.deleteTicket(ticket.id));
    });

    const doneBtn = ticketElement.querySelector(".done-btn");
    doneBtn.addEventListener("click", () => {
      this.updateTicket(ticket.id, { status: !ticket.status });
    });
  }

  // создание нового тикета
  createTicket(data) {
    this.ticketService.create(data, (newTicket) => {
      this.tickets.push(newTicket);
      this.loadTickets();
    });
  }

  // обновление тикета
  updateTicket(id, data) {
    this.ticketService.update(id, data, () => {
      this.loadTickets();
    });
  }

  // удаление тикета
  deleteTicket(id) {
    this.ticketService.delete(id, () => {
      this.loadTickets();
    });
  }
}

export default HelpDesk;
