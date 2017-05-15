import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderConfig } from '@ericsson/oden/components/loader/loader.config';
import { TAB_VIEW } from '@ericsson/oden/modules';
import { TabsInterface } from '@ericsson/oden/core/interfaces/tabs.interface';
import { BreadcrumbItem } from '@ericsson/oden/core';
import { EventBusService } from './shared/services/event-bus.service';

@Component({
    selector: 'matrix',
    templateUrl: 'matrix.component.html',
    styleUrls: ['matrix.component.scss'],
    animations: [TAB_VIEW.ANIMATION]
})
export class MatrixComponent implements OnInit, OnDestroy {
    @HostBinding('@routeAnimation') animationDirection: string;
    tabLoader: LoaderConfig;
    breadcrumb: Array<BreadcrumbItem>;
    app_title: string;
    tabs: TabsInterface;

    constructor(
        private router: Router,
        private eventBusService: EventBusService) {

        this.tabLoader = new LoaderConfig({
            text: 'Loading...',
            visible: false,
            isTabLoader: true
        });
    }

    ngOnInit() {
        this.eventBusService.subscribe('HeaderConfiguration', (configuration) => {
            this.app_title = configuration.title ? configuration.title : 'RM Quality Metrics';
            this.tabs = ( configuration.tabs === undefined || configuration.tabs.length === 0 ) ?  [] : configuration.tabs;
            this.breadcrumb = (configuration.breadCrumbData) ? configuration.breadCrumbData : []
        });
    }

    onClose(e) {
        this.router.navigate(['']);
    }

    ngOnDestroy() {
        this.eventBusService.unsubscribe('HeaderConfiguration');
    }
}
