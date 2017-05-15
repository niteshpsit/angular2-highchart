import { Input, Component, ViewEncapsulation, HostBinding, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TAB_VIEW, TabViewService} from '@ericsson/oden/modules';
import { ModalHelperService } from '@ericsson/oden/components/modal/modal-helper.service';
import { ORDER, ALIGNMENT } from '@ericsson/oden/constants';
import { EventBusService } from '../../shared/services/event-bus.service';
import { Table } from '../../shared/classes/table';
import { PaginationData } from '@ericsson/oden/components/pagination/pagination.model';

@Component({
    selector: 'list-tr',
    templateUrl: 'list-mhweb.component.html',
    styleUrls: ['list-mhweb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [TAB_VIEW.ANIMATION]
})
export class ListMhWebComponent implements OnInit, OnDestroy {
    @HostBinding('@routeAnimation') animationDirection: string;
    @HostBinding('class') tabViewClass: string = '';
    @Input() finalData:any;
    @Input() title:string;

    paginationData :PaginationData;
    table: Table;
    count: number = 0;
    errorCount: number = 0;
    selectedRows: any;
    list = {
        tableHeaders: [
            { label: 'TR', order: ORDER.DESCENDING, field: 'trName',filter: true, type: 'string'},
            { label: 'OWNER', order: ORDER.NONE, field: 'owner', filter: true, type: 'string', align: ALIGNMENT.RIGHT},
            { label: 'PRIORITY', order: ORDER.NONE, field: 'priority', filter: true, type: 'string', align: ALIGNMENT.RIGHT},
            { label: 'DAYS AT MHO', order: ORDER.NONE, field: 'daysAtMHO', filter: true, type: 'string', align: ALIGNMENT.RIGHT}
        ]
    };

    public tableDataSet = {
        tableData: [],
        displayTableData: [],
        paginationData: this.paginationData
    };

    constructor(private tabViewService: TabViewService){
        this.table = new Table(this.list);
    }

    ngOnInit() {
        this.showLoader();
        this.afterInit(this.finalData);
    }

    private afterInit(finalData: Array < any > ) {
        this.setTableData(finalData);
        this.hideLoader();
    }

    setTableData(finalData: Array < any > ) {
        this.tableDataSet = this.table.initializeTableData(finalData);
    }

    tableOrderChanged(event: any) {
        this.table.sort(event);
    }

    onFilterTable(filter: string): void {
        this.tableDataSet = this.table.filter(filter);
    }

    onBatchChange(row): void {
    }

    showLoader() {
        if(this.tabViewService.loader) {
            this.tabViewService.loader.show();
        } 
    }

    hideLoader() {
        setTimeout(() => {
            if(this.tabViewService.loader) {
                this.tabViewService.loader.hide();
            }
        }, 1000);
    }
    
    ngOnDestroy(): void {
        if (this.tabViewService.loader) {
            this.tabViewService.loader.hide();
        }
    }
}