import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { Roles } from "../storage/administration/administration.state";
import { IStore } from "../storage/store";


@Injectable({
    providedIn: "root",
})
export class RoleService {

    constructor(
        private store: Store<IStore>,
    ) {}

    can$(role: Roles | Roles[]) {

        if (!role) return of(false);

        if (Array.isArray(role)) {

            return this.store.pipe(
                map(i => true),
            );
        }

        return this.store.pipe(
            map(i => true),
        );
    }

}