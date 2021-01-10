import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Toast } from "./toast";

@Injectable({ providedIn: "root" })
export class ToastsService {

    private currentToastsSubject = new BehaviorSubject<Toast[]>([]);

    get currentToasts$() { return this.currentToastsSubject.asObservable(); }
    get currentToasts() { return this.currentToastsSubject.getValue(); }

    showToast(toast: Toast) {

        const updatedToasts = [toast, ...this.currentToasts];
        this.currentToastsSubject.next(updatedToasts);
    }

    hideToast(toast: Toast) {

        const updatedToasts = this.currentToasts.filter(i => i != toast);
        this.currentToastsSubject.next(updatedToasts);
    }
}
