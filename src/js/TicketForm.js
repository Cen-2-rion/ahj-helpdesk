// класс для создания формы создания нового тикета
class TicketForm {
  constructor() {
    this.modal = null;
    this.onSubmit = null;
  }

  // отображение модального окна с формой создания/редактирования тикета
  show(ticket = null, onSubmit) {
    this.ticket = ticket; // если ticket === null, форма создаёт новый тикет
    this.onSubmit = onSubmit;
    this.render();
  }

  render() {
    this.close();

    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>${this.ticket ? "Изменить тикет" : "Добавить тикет"}</h3>
        </div>
        <div class="modal-body">
          <label>
            Краткое описание
            <input type="text" class="short-description" value="${this.ticket ? this.ticket.name : ""}" required>
          </label>
          <label>
            Подробное описание
            <textarea class="full-description">${this.ticket ? this.ticket.description : ""}</textarea>
          </label>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn">Отмена</button>
          <button class="save-btn">Ок</button>
        </div>
      </div>
    `;

    this.modal = modal;
    document.querySelector(".helpdesk").appendChild(modal);

    this.addModalEventListeners();
  }

  // обработчик событий для модального окна
  addModalEventListeners() {
    this.modal
      .querySelector(".cancel-btn")
      .addEventListener("click", () => this.close());
    this.modal
      .querySelector(".save-btn")
      .addEventListener("click", () => this.handleSubmit());
  }

  // обработка нажатия на кнопку "Сохранить" и отправка формы
  handleSubmit() {
    const shortDescription = this.modal
      .querySelector(".short-description")
      .value.trim();
    const fullDescription = this.modal
      .querySelector(".full-description")
      .value.trim();

    if (!shortDescription) {
      alert("Краткое описание обязательно!");
      return;
    }

    this.onSubmit({ name: shortDescription, description: fullDescription });
    this.onSubmit = null;
    this.close();
  }

  // закрытие модального окна
  close() {
    document.querySelector(".modal-overlay")?.remove();
    this.modal = null;
  }
}

export default TicketForm;
