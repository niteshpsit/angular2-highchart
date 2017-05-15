/* tslint:disable:component-selector-prefix */
/* tslint:disable:component-selector-name */
/* tslint:disable:component-selector-type */
import { Component, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ProfileModel, ActionItem } from '@ericsson/oden/core';
import { OverlayService, MainMenuRoute, MainMenuService, SystembarActionGroup, SystembarActionItem } from '@ericsson/oden/modules';
import { ProfileMockService } from './matrix/shared/services/profile.service.mock';
import { RouteLoaderServiceMock } from './matrix/shared/services/route-loader.service.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements AfterViewInit {
    @ViewChild('overlay', { read: ViewContainerRef }) viewContainerRef;
    @ViewChild('appOverlay', { read: ViewContainerRef }) viewAppContainerRef;
    appTitle:string = "RM QUALITY METRICS DASHBOARD";
    profile: ProfileModel;
    systemActions: Array<SystembarActionGroup>;
    profileActions: Array<ActionItem>;

    // Sets the current version of the Oden library into main menu
    odenVersion = require('../../package.json').version;
    constructor(private overlayService: OverlayService,
        private _routeLoaderServiceMock: RouteLoaderServiceMock,
        private _mainMenuService: MainMenuService) {
        this.profile = ProfileMockService.getProfileData();
        // An example of how to use the SystemBarActionGroup / SystemBarActionItem
        this.systemActions = [
            [
                new SystembarActionItem({ label: 'Switch app', action: 'action', icon: 'appswitcher' }),
                new SystembarActionItem({ label: 'Full screen', action: 'action2', icon: 'fullscreen' }),
            ],
            [
                new SystembarActionItem({ label: 'Help', action: 'action2', icon: 'help' }),
            ],
            [
                new SystembarActionItem({ label: 'Projects', action: 'action3', icon: 'briefcase' }),
                new SystembarActionItem({ label: 'Notifications', action: 'action4', icon: 'notification' }),
            ]
        ];
        this.profileActions = [
            new ActionItem({ label: 'Settings', action: 'profile_settings' }),
            new ActionItem({ label: 'Sign out', action: 'sign_out' }),
        ];
        this._routeLoaderServiceMock.getRoutes().subscribe(
            (routes: Array<MainMenuRoute>) => this._mainMenuService.setRoutes(routes));
    }

    /**
     * Initialize the overlayService and set the app to loaded after a short timeout (to make the app-loader
     * animation work smoothly)
     */
    ngAfterViewInit(): void {
        this.overlayService.containerRef = this.viewContainerRef;
        this.overlayService.appContainerRef = this.viewAppContainerRef;
        setTimeout(() => {
            document.body.classList.add('loaded');
            document.querySelector('#app-loader').classList.add('hidden');
        }, 300);
    }

    onSystemAction(action: SystembarActionItem): void {
        console.log(action);
    }

    onProfileAction(action: ActionItem): void {
        console.log(action);
    }

    toggleMenu(): void {
        this._mainMenuService.toggleMenu();
    }

    onClose(): void {
        alert('App closed!');
    }
}
