import { Title } from '@angular/platform-browser/platform-browser';
import { ChangeDetectorRef, AfterViewInit, Input, Component, ViewEncapsulation, HostBinding, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TAB_VIEW, TabViewService } from '@ericsson/oden/modules';
import { ChartData } from '@ericsson/oden/core';
import { COLOR, ALIGNMENT, BAR_CHART_TYPE } from '@ericsson/oden/constants';

import { DashboardDataService } from '../shared/services/dashboard.service';
import { Config } from '../shared/constants/index';
import { KEY_CONSTANTS } from './mhwebkeys.constant';

@Component({
    selector: 'mhweb',
    templateUrl: 'mhweb.component.html',
    styleUrls: ['mhweb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [TAB_VIEW.ANIMATION]
})
export class MhWebComponent implements OnInit, OnDestroy {
    public timer: any;
    private trTurnAroundMinThreshold = 5;
    private trTurnAroundMaxThreshold = 30;
    private trTurnAroundMidThreshold = 12;
    public mhwebKeys: Array<string> = [
        KEY_CONSTANTS.OPEN_TR_STATUS,
        KEY_CONSTANTS.GAUGE,
        KEY_CONSTANTS.LIST_BREACHED_TRS,
        KEY_CONSTANTS.TRS_SLA,
        KEY_CONSTANTS.FOCUS_LIST_TR,
        KEY_CONSTANTS.OPEN_TRS
    ];
    // For openTrsStatus
    public openTrsStatus = {
        title: {
            text: 'TR STATUS'
        },
        xAxis: {
            categories: [],
            title: {
                text: "PRIORITY"
            }
        },
        yAxis: {
            title: {
                text: "TR`s"
            }
        },
        series: [{
            type: 'column',
            colorByPoint: true,
            data: [],
            showInLegend: false
            
        }],
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: false
        },
    };

    // For trsSLA
    public trTurnAround = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'CATEGORY WISE TR SLA'
        },
        xAxis: {
            reversed: true,
            categories: [],
            title: {
                text: "PRIORITY"
            }
        },
        yAxis: {
            labels: {
                overflow: 'justify'
            },
            title: {
                text: null
            },
            tickInterval: 5,
            min: this.trTurnAroundMinThreshold - 5,
            max: this.trTurnAroundMaxThreshold + 30,
            /*plotLines: [{
                id: 'limit-min',
                color: '#FF0000',
                dashStyle: 'Solid',
                width: 2,
                value: this.trTurnAroundMinThreshold,
                zIndex: 0,
                label: {
                    text: "5"
                }
            }, {
                id: 'limit-mid',
                color: '#0070C0',
                dashStyle: 'Solid',
                width: 2,
                value: this.trTurnAroundMidThreshold,
                zIndex: 0,
                label: {
                    text: "12"
                }
            }, {
                id: 'limit-max',
                color: '#00AC46',
                dashStyle: 'Solid',
                width: 2,
                value: this.trTurnAroundMaxThreshold,
                zIndex: 0,
                label: {
                    text: "30"
                }
            }]*/
        },
        tooltip: {
            valueSuffix: ' TR`s'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }, spline: {
                marker: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: "Breached",
            color: '#E74C3C',
            data: []
        }, {
            name: "About To Breach",
            color: '#3498DB',
            data: []
        }, {
            name: "Safe",
            color: '#1ABC9C',
            data: []
        }]
    };
    // For focusListTr
    public focusListTr: Array<any> = [0];
    // For listBreachedTRs
    public listBreachedTRs: Array<any> = [0];
    // For openTrs
    public openTrs = {
        title: {
            text: 'TRs PER CATEGORY'
        },
        xAxis: {
            categories: [],
            title: {
                text: "PRIORITY"
            }
        },
        yAxis: {
            title: {
                text: "TR`s"
            }
        },
        series: [{
            type: 'column',
            colorByPoint: true,
            data: [],
            showInLegend: false
        }]
    };

    public averageTRCounter = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: ''
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0.15, '#333'],
                        [0.3, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 10, // healty
                color: '#1ABC9C' // green
            }, {
                from: 11,
                to: 30, // anondonLimit
                color: '#F1C40F' // yellow
            }, {
                from: 31,
                to: 100,
                color: '#E74C3C' // red
            }]
        },

        series: [{
            name: 'Count',
            data: [],
            tooltip: {
                valueSuffix: ' TRs'
            }
        }]
    };


    constructor(
        public dataService: DashboardDataService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.openTrs.xAxis.categories = ['A'];
        this.openTrs.series[0].data = [0];

        this.openTrsStatus.xAxis.categories = ['AS'];
        this.openTrsStatus.series[0].data = [0];

        this.averageTRCounter.series[0].data = [0];

        this.trTurnAround.xAxis.categories = ['A'];
        this.trTurnAround.series[0].data = [0];
        this.trTurnAround.series[1].data = [0];
        this.trTurnAround.series[2].data = [0];

        this.fetchRecords();
    }

    reload() {
        this.timer = setTimeout(() => {
            this.fetchRecords();
        }, Config.intervalTime);
    }

    fetchRecords() {
        let count = 0;
        this.mhwebKeys.forEach((key, index) => {
            setTimeout(() => {
               this.dataService
                    .get(Config.TPG, key)
                    .then(res => {
                        count++;
                        this.updateGraphs(res);
                        if (this.mhwebKeys.length === count) {
                            this.reload();
                        }
                    })
                    .catch(error => {
                        count++;
                        if (this.mhwebKeys.length === count) {
                            this.reload();
                        }
                    });             
            }, Config.callIntervalTime*(index+1));
        });
    }

    private updateGraphs(response: Object) {
        let key = response['graphName'];
        if (key === KEY_CONSTANTS.OPEN_TR_STATUS) {
            this.updateOpenTrsStatusGraphData(response);
        } else if (key === KEY_CONSTANTS.GAUGE) {
            this.updateAverageTRCounter(response);
        } else if (key === KEY_CONSTANTS.LIST_BREACHED_TRS) {
            this.updateListBreachedTRs(response);
        } else if (key === KEY_CONSTANTS.TRS_SLA) {
            this.updateTrTurnAround(response);
        } else if (key === KEY_CONSTANTS.FOCUS_LIST_TR) {
            this.updateFocusTrList(response);
        } else if (key === KEY_CONSTANTS.OPEN_TRS) {
            this.updateOpenTrData(response);
        }
        this.cdr.detectChanges();
    }

    private updateOpenTrData(trOptions: any) {
        if (trOptions['trinfo'] && trOptions['trinfo'].length > 0) {
            this.openTrs.xAxis.categories = [];
            this.openTrs.series[0].data = [];
            setTimeout(() => {
                trOptions['trinfo'].map((tr, index) => {
                    this.openTrs.xAxis.categories.push(tr.priority);
                    this.openTrs.series[0].data.push(tr.noOfTrs);
                });
            }, 0);
        }
    }

    private updateOpenTrsStatusGraphData(options: any) {
        if (options['trinfo'] && options['trinfo'].length > 0) {
            this.openTrsStatus.xAxis.categories = [];
            this.openTrsStatus.series[0].data = [];
            setTimeout(() => {
                options['trinfo'].map((tr, index) => {
                    this.openTrsStatus.xAxis.categories.push(tr.status);
                    this.openTrsStatus.series[0].data.push(tr.noOfTrs);
                });
            }, 0);
        }
    }

    /*private updateTrsBreachingSLAData(trsBreachingSLA: any) {
        if (trsBreachingSLA['weeks'] && trsBreachingSLA['weeks'].length > 0) {
            setTimeout(() => {
                trsBreachingSLA['weeks'].map((week) => {
                    this.trBreachingSLA.series[0].data.push(week.noOfBreachingTRs);
                });
            }, 0);
        }
    }*/

    private updateFocusTrList(list: any) {
        if (list['data'] && list['data'].length > 0) {
            this.focusListTr = [];
            setTimeout(() => {
                this.focusListTr = list['data'];
            }, 0);
        }
    }

    private updateListBreachedTRs(list: any) {
        if (list['data'] && list['data'].length > 0) {
            this.listBreachedTRs = [];
            setTimeout(() => {
                this.listBreachedTRs = list['data'];
            }, 0);
        }

        console.log('this.listBreachedTRs', this.listBreachedTRs);
    }

    private updateTrTurnAround(trTurnAround: any) {
        if (trTurnAround['trinfo'] && trTurnAround['trinfo'].length > 0) {
            this.trTurnAround.xAxis.categories = [];
            this.trTurnAround.series[0].data = [];
            this.trTurnAround.series[1].data = [];
            this.trTurnAround.series[2].data = [];
            setTimeout(() => {
                trTurnAround['trinfo'].map((tr, index) => {
                    // set categories for TrTurnAround
                    this.trTurnAround.xAxis.categories.push(tr.priority);
                    this.trTurnAround.series[0].data[index] = tr.breached;
                    this.trTurnAround.series[1].data[index] = tr.aboutToBreach;
                    this.trTurnAround.series[2].data[index] = tr.safe;
                });
            }, 0);
        }
    }

    private updateAverageTRCounter(data: any) {
        if (data['noOpenTrs']) {
             this.averageTRCounter.series[0].data = [];
            setTimeout(() => {
                this.averageTRCounter.series[0].data.push(data['noOpenTrs']);
            }, 0);
        }
    }

    ngOnDestroy() {
        clearTimeout(this.timer);
    }
}