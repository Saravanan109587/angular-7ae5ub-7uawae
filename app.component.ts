import { Component, OnInit } from "@angular/core";
import { DatePicker, DateTimePicker } from "@syncfusion/ej2-calendars";
import { data } from "./data";
import { DateTimePickerComponent } from "@syncfusion/ej2-angular-calendars";
import { loadCldr, L10n } from "@syncfusion/ej2-base";
import {
  Column,
  EditSettingsModel,
  ToolbarItems,
  IEditCell
} from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "app-root",
  template: `
    <ejs-grid
      [dataSource]="data"
      [editSettings]="editSettings"
      [toolbar]="toolbar"
      height="273px"
    >
      <e-columns>
        <e-column
          field="OrderID"
          headerText="Order ID"
          textAlign="Right"
          isPrimaryKey="true"
          width="100"
        ></e-column>
        <e-column
          field="CustomerID"
          headerText="Customer ID"
          width="120"
        ></e-column>

        <e-column
          field="OrderDate"
          headerText="Order Date with Edittemp "
          type="date"
          width="150"
        >
          <ng-template #editTemplate let-data>
            <ejs-datetimepicker
              [value]="data.OrderDate"
              id="OrderDate"
              name="OrderDate"
              locale="de"
            ></ejs-datetimepicker>
          </ng-template>
        </e-column>
        <e-column
          field="OrderDate"
          headerText="Order Date "
          type="date"
          format="yMd"
          editType="datetimepickeredit"
          locale="de"
          [edit]="dpParams"
          width="150"
        ></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class AppComponent implements OnInit {
  public data: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public elem: HTMLElement;
  public dateTimePickerObj: DateTimePicker;
  public dpParams: IEditCell;

  ngOnInit(): void {
    this.data = data;
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true
    };
    this.toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];
    L10n.load({
      de: {
        datetimepicker: {
          placeholder: "Wählen Sie ein Datum und eine Uhrzeit aus",
          today: "heute"
        }
      }
    });
    this.dpParams = {
      create: () => {
        this.elem = document.createElement("input");
        return this.elem;
      },
      read: () => {
        return this.dateTimePickerObj.value;
      },
      destroy: () => {
        this.dateTimePickerObj.destroy();
      },
      write: (args: { rowData: object; column: Column }) => {
        this.dateTimePickerObj = new DateTimePicker({
          value: new Date(args.rowData[args.column.field]),
          change: this.onchange.bind(this)
        });
        this.dateTimePickerObj.appendTo(this.elem);
      }
    };
  }

  onchange(args) {
    console.log("Change event triggered");
  }
}
