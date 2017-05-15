/*
* Class Table
* Functionlity: use common pagination, filtering, table, sorting, back actions
*/

import { TableOrderEvent } from '@ericsson/oden/modules';
import { PaginationData } from '@ericsson/oden/components/pagination/pagination.model';
import { ORDER } from '@ericsson/oden/constants';

export class Table {
    paginationData: PaginationData;
    public tableDataSet = {
        tableData: [],
        displayTableData: [],
        paginationData: this.paginationData
    };

    public currentEntity: any;

    constructor(currentEntity) {
        this.paginationData = new PaginationData();
        this.currentEntity = currentEntity;
    }

    initializeTableData(finalData: Array<any>) {
        this.tableDataSet.tableData = finalData;
        this.tableDataSet.displayTableData = this.tableDataSet.tableData;
        let sorttableHeader;
        this.currentEntity.tableHeaders.forEach((res) => {
            sorttableHeader = this.currentEntity.tableHeaders.filter(res => res.order !== 2);
        })
        this.sort({
            order: sorttableHeader[0]['order'],
            field: sorttableHeader[0]['field']
        });
        this.setPaginationProperties(this.tableDataSet.displayTableData);
        this.tableDataSet.paginationData = this.paginationData;
        return this.tableDataSet;
    }

    setPaginationProperties(items: Array<any>): void {
        this.paginationData.totalItems = items.length;
        this.paginationData.itemsPerPageAlternatives = [5, 10, 20];
        this.paginationData.itemsPerPage = 5;
    }

    sort(item: TableOrderEvent): any {
        if (item.order === ORDER.NONE) return;
        this.currentEntity.tableHeaders.forEach((i) => {
            i.order = i.field === item.field ? item.order : ORDER.NONE;
            if (i.field === item.field) {
                if (i.type === 'string') {
                    this.tableDataSet.displayTableData = this.tableDataSet.displayTableData.sort((a, b) => {
                        if (item.order === ORDER.DESCENDING) {
                            [a, b] = [b, a]; // Reverse order
                        }
                        return a[item.field].toString().localeCompare(b[item.field].toString());
                    });
                }

                if (i.type === 'number') {
                    let sortOrder = 1;
                    if (item.order === ORDER.DESCENDING) {
                        sortOrder = -1;
                    }
                    this.tableDataSet.displayTableData = this.tableDataSet.displayTableData.sort((a, b) => (a[i.field] - b[i.field]) * sortOrder);
                }

                if (i.type === 'date') {
                    let sortOrder = -1;
                    if (item.order === ORDER.DESCENDING) {
                        sortOrder = 1;
                    }
                    this.tableDataSet.displayTableData = this.tableDataSet.displayTableData.sort((a, b) => {
                        return (new Date(b[i.field]).getTime() - new Date(a[i.field]).getTime()) * sortOrder;
                    });
                }
            }
        });
        return this.tableDataSet;
    }

    filter(filter: string): any {
        let filterdata = filter.trim();
        let regex = new RegExp(filterdata.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), 'i');
        this.tableDataSet.displayTableData = JSON.parse(JSON.stringify(this.tableDataSet.tableData.filter((data) => {
            let ok = false;
            this.currentEntity.tableHeaders.forEach((value, key) => {
                if (value.filter) {
                    if (data[value.field].toString().match(regex) !== null) {
                        ok = true;
                    }
                }
            });
            return ok;
        })));
        this.setPaginationProperties(this.tableDataSet.displayTableData);
        this.paginationData.currentPage = 0;
        return this.tableDataSet;
    }

    delete(item) {
        this.tableDataSet.tableData = this.tableDataSet.tableData.filter(h => h.versionNumber !== item.versionNumber);
        this.tableDataSet.displayTableData = this.tableDataSet.displayTableData.filter(h => h.versionNumber !== item.versionNumber);
        this.setPaginationProperties(this.tableDataSet.displayTableData);
        return this.tableDataSet;
    }
}