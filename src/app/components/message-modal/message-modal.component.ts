import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {
  @Input() body: string = 'No message';
  @Output() closeModalEvent = new EventEmitter<void>(); 

  closeModal() {
    this.closeModalEvent.emit();
  }
}
