// класс для отображения тикетов на странице, содержит методы для генерации разметки тикета
import done from "../img/done.png";
import edit from "../img/edit.png";
import del from "../img/delete.png";

class TicketView {
  // метод для рендеринга DOM-элемента тикета, содержит логику создания кнопок и скрытия описания при нажатии на тело тикета
  render(ticket) {
    const ticketElement = document.createElement("div");
    ticketElement.className = "ticket";
    ticketElement.dataset.id = ticket.id;

    ticketElement.innerHTML = `
      <div class="ticket-content">
        <div class="ticket-header">
          <div class="ticket-status">
            ${this.createButton("done-btn", ticket.status ? done : "")}
          </div>
          <span class="ticket-title">${ticket.name}</span>
          <span class="ticket-date">${this.formatDate(ticket.created)}</span>
          <div class="ticket-actions">
            ${this.createButton("edit-btn", edit)}
            ${this.createButton("delete-btn", del)}
          </div>
        </div>
        <div class="ticket-description hidden">${ticket.description}</div>
      </div>
    `;

    this.addClickEvent(ticketElement);

    return ticketElement;
  }

  // универсальный метод для создания кнопки с изображением
  createButton(className, image) {
    return `
      <div class="ticket-btn ${className}">
        ${image ? `<img src="${image}" />` : ""}
      </div>
    `;
  }

  // метод для форматирования даты в нужном формате
  formatDate(ticket) {
    const date = new Date(ticket);
    const formatter = new Intl.DateTimeFormat("ru-RU", {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatter.format(date).replace(",", "");
  }

  // обработчик события клика на тело тикета, скрывает или показывает описание в зависимости от текущего состояния
  addClickEvent(ticketElement) {
    ticketElement.addEventListener("click", (event) => {
      if (!event.target.closest(".ticket-btn")) {
        const description = ticketElement.querySelector(".ticket-description");
        description.classList.toggle("hidden");
      }
    });
  }
}

export default TicketView;
