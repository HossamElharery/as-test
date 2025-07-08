export interface TableActions {
    actionType: TableActionsTypes | any,
    payload: any;
    data?: any;
}

export enum TableActionsTypes {
    edit,
    delete,
    assign,
    view_dialog,
    bulkAction
}
