import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip-filter',
  templateUrl: './chip-filter.component.html',
  styleUrls: ['./chip-filter.component.css']
})
export class ChipFilterComponent {
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }

}
