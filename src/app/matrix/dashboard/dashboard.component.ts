import { Component, ViewEncapsulation, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
import { TAB_VIEW, TabViewService } from '@ericsson/oden/modules';
import { EventBusService } from '../shared/services/event-bus.service';
import { Config } from '../shared/constants/index';
import { DashboardDataService } from '../shared/services/dashboard.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [TAB_VIEW.ANIMATION]
})
export class DashboardComponent implements OnInit {
    @HostBinding('@routeAnimation') animationDirection: string;
    focusTRs = 0;
    breached = 0;
    aboutToBreach = 0;
    unassigned = 0;
    timer:any = null;
    constructor(
        public eventBusService: EventBusService,
        public dataService: DashboardDataService,) {
    }

    setHeaderConfiguration() {
        this.eventBusService.publish('HeaderConfiguration', {
            title: 'RM Quality Metrics dashboard'
        });
    }

    ngOnInit() {
        this.setHeaderConfiguration();
        this.fetchCounters();
    }

    reload() {
        console.log('reload dashboard');
        this.timer = setTimeout(() => {
            this.fetchCounters();
        }, Config.intervalTime);
    }

    fetchCounters() {
        this.dataService
        .getCounters(Config.TPG)
        .then(resCounters => {
            if(resCounters.counter) {
                this.reload();
                if(resCounters.counter[2].countValue)
                this.focusTRs = resCounters.counter[2].countValue;
                if(resCounters.counter[0].countValue)
                this.breached = resCounters.counter[0].countValue;
                if(resCounters.counter[1].countValue)
                this.aboutToBreach = resCounters.counter[1].countValue;
                if(resCounters.counter[3].countValue)
                this.unassigned = resCounters.counter[3].countValue;
            }
        })
        .catch(error => {
            this.reload();
        });
    }

    ngOnDestroy() {
        clearTimeout(this.timer);
    }
}

