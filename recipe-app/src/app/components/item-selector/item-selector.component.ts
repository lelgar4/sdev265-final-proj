import { Component, Input, OnChanges, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.css']
})
export class ItemSelectorComponent implements OnInit, OnChanges {

  @Input() currentType = '';

  measurement = ['cups', 'liters', 'ounces'];
  ingredients = ['beef', 'carrots', 'blueberries'];
  prepared = ['sliced', 'diced', 'broiled'];
  currentArray?: string[];
  currentItem = '';
  @Output() itemCompleteEvent = new EventEmitter<any>();
  @Output() itemSubmit = new EventEmitter<String[]>();

  constructor(public dialog: MatDialog) {

  }
  ngOnChanges() {
    switch (this.currentType) {
      case 'measurement':
        this.currentArray = this.measurement;
        break;
      case 'ingredients':
        this.currentArray = this.ingredients
        break;
      case 'prepared':
        this.currentArray = this.prepared
        break;
    }
  }
  itemSelected(item: string) {
    this.currentItem = item;
    if (this.currentType === 'measurement') {
      let dialogRef = this.dialog.open(DialogMeasurement, {
        width: '250px',
        data: { item: this.currentItem, size: '' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          console.log(result)
          this.currentItem = result + ' ' + this.currentItem;
          this.itemCompleteEvent.emit({ section: this.currentType, value: this.currentItem });
        }
      });
    } else {
      this.itemCompleteEvent.emit({ section: this.currentType, value: this.currentItem });
    }
  }
  ngOnInit(): void {
  }
}
@Component({
  selector: 'dialog-measurement-dialog',
  template: `<input matInput [(ngModel)]="data.size" name="size"><p>{{data.item}}</p>
  <mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No</button>
  <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
  <button mat-button [mat-dialog-close]="data.size">Yes</button>
</mat-dialog-actions>
  `,
})
export class DialogMeasurement {

  constructor(
    public dialogRef: MatDialogRef<DialogMeasurement>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}