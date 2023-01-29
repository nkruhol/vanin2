import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Roles } from "../storage/administration/administration.state";
import { selectUser } from "../storage/app/app.selectors";
import { IStore } from "../storage/store";


@Injectable({
    providedIn: "root",
})
export class RoleService {

    constructor(
        private store: Store<IStore>,
    ) {}

    can$(value: Roles | Roles[]) {

        if (!value) return of(false);

        if (Array.isArray(value)) {

            return this.store.pipe(
                select(selectUser),
                filter(i => !!i),
                map(user => {

                    return value.some(role => (user.role & role) == role);
                })
            );
        }

        return this.store.pipe(
            select(selectUser),
            filter(i => !!i),
            map(user => (user.role & value) == value)
        );
    }

}