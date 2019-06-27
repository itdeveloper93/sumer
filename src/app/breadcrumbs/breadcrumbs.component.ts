import { BreadCrumb } from './breadcrumb.interface';
import { Component, OnInit } from '@angular/core';
import {
    Router,
    Event,
    ActivationEnd,
    NavigationEnd,
    ActivatedRoute
} from '@angular/router';
import {
    filter,
    map,
    buffer,
    pluck,
    distinctUntilChanged
} from 'rxjs/operators';

@Component({
    selector: 'breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.sass']
})
export class BreadcrumbsComponent implements OnInit {
    public breadcrumbs: BreadCrumb[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    }

    ngOnInit() {
        this.router.events
            .pipe(
                filter((event: Event) => event instanceof NavigationEnd),
                distinctUntilChanged()
            )
            .subscribe(() => {
                this.breadcrumbs = this.buildBreadCrumb(
                    this.activatedRoute.root
                );
            });
    }

    /**
     * Recursively build breadcrumb according to activated route.
     * @param route
     * @param url
     * @param breadcrumbs
     */
    buildBreadCrumb(
        route: ActivatedRoute,
        url: string = '',
        breadcrumbs: BreadCrumb[] = []
    ): BreadCrumb[] {
        //If no routeConfig is avalailable we are on the root path
        let label =
            route.routeConfig && route.routeConfig.data
                ? route.routeConfig.data.breadcrumb
                : '';
        let path =
            route.routeConfig && route.routeConfig.data
                ? route.routeConfig.path
                : '';

        // If the route is dynamic route such as ':id', remove it
        const lastRoutePart = path.split('/').pop();
        const isDynamicRoute = lastRoutePart.startsWith(':');
        if (isDynamicRoute && !!route.snapshot) {
            const paramName = lastRoutePart.split(':')[1];
            path = path.replace(
                lastRoutePart,
                route.snapshot.params[paramName]
            );
            label = route.snapshot.params[paramName];
        }

        //In the routeConfig the complete path is not available,
        //so we rebuild it each time
        const nextUrl = path ? `${url}/${path}` : url;

        const currentRoute = this.router.url.split('/')[1];

        const breadcrumb: BreadCrumb = {
            label: label,
            url: nextUrl,
            active: path === currentRoute ? true : false
        };

        // Only adding route with non-empty label
        const newBreadcrumbs = breadcrumb.label
            ? [...breadcrumbs, breadcrumb]
            : [...breadcrumbs];
        if (route.firstChild) {
            //If we are not on our current path yet,
            //there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb(
                route.firstChild,
                nextUrl,
                newBreadcrumbs
            );
        }

        console.log(newBreadcrumbs);

        return newBreadcrumbs;
    }
}
