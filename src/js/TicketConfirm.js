// класс для создания окна подтверждения удаления тикета
class TicketConfirm {
  constructor() {
    this.modal = null;
    this.onConfirm = null;
  }

  show(onConfirm) {
    this.onConfirm = onConfirm;
    this.render();
  }

  render() {
    this.close();

    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>Удалить тикет</h3>
        </div>
        <div class="modal-body">
          <p>Вы уверены, что хотите удалить этот тикет? Это действие необратимо.</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn">Отмена</button>
          <button class="ok-btn">Ok</button>
        </div>
      </div>
    `;

    this.modal = modal;
    document.querySelector(".helpdesk").appendChild(modal);

    this.addModalEventListeners();
  }

  // обработчики событий для модального окна
  addModalEventListeners() {
    this.modal.querySelector(".cancel-btn").addEventListener("click", () => this.close());
    this.modal.querySelector(".ok-btn").addEventListener("click", () => {
      this.onConfirm();
      this.onConfirm = null;
      this.close();
    });
  }

  // закрытие модального окна
  close() {
    document.querySelector(".modal-overlay")?.remove();
    this.modal = null;
  }
}

export default TicketConfirm;
