export class ColumnOption {
    EditableRowList: EditableRow[] = [];
}

export class EditableRow {
    idPropertyName: string;
    tooltipText: string;
    public constructor (idPropertyName: string, tooltipText: string = null) {
        this.idPropertyName = idPropertyName;
        this.tooltipText = tooltipText;
    }
}
