import { Component, HostBinding } from "@angular/core";
import { Toast, ToastSeverity } from "./toast";
import { ToastsService } from "./toasts.service";

@Component({
    selector: "app-toasts",
    templateUrl: "./toasts-container.component.html",
})
export class ToastsContainerComponent {

    constructor(
        public toastsService: ToastsService,
    ) {}

    @HostBinding("class.ngb-toasts") appendToastClass = true;

    toasts = this.toastsService.currentToasts$;

    getToastClass(toast: Toast) {

        const map = {
            [ToastSeverity.DANGER]: "bg-danger text-light",
            [ToastSeverity.SUCCESS]: "bg-success text-light",
            [ToastSeverity.DEFAULT]: null,
        };

        return map[toast.severity];
    }

    closeToast(toast: Toast) {

        this.toastsService.hideToast(toast);
    }
}
