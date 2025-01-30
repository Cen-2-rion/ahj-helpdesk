// класс для связи с сервером, содержит методы для отправки запросов на сервер и получения ответов
import createRequest from "./api/createRequest";

class TicketService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // получает список всех тикетов
  list(callback) {
    const url = `${this.baseUrl}?method=allTickets`;
    createRequest({ url, method: "GET" }).then(callback);
  }

  // получает тикет по ID
  get(id, callback) {
    const url = `${this.baseUrl}?method=ticketById&id=${id}`;
    createRequest({ url, method: "GET" }).then(callback);
  }

  // создаёт новый тикет
  create(data, callback) {
    const url = `${this.baseUrl}?method=createTicket`;
    createRequest({ url, method: "POST", data }).then(callback);
  }

  // обновляет тикет по ID
  update(id, data, callback) {
    const url = `${this.baseUrl}?method=updateById&id=${id}`;
    createRequest({ url, method: "PUT", data }).then(callback);
  }

  // удаляет тикет по ID
  delete(id, callback) {
    const url = `${this.baseUrl}?method=deleteById&id=${id}`;
    createRequest({ url, method: "DELETE" }).then(() => callback());
  }
}

export default TicketService;
