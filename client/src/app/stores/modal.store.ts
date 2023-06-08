import { makeAutoObservable } from "mobx";
import { IModal } from "../interfaces/modal";

export default class ModalStore {
  public modal: IModal = {
    open: false,
    body: null
  };

  constructor() {
    makeAutoObservable(this);
  }

  public openModal(content: JSX.Element): void {
    this.modal.open = true;
    this.modal.body = content;
  }

  public closeModal(): void {
    this.modal.open = false;
    this.modal.body = null;
  }
}