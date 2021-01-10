export enum ToastSeverity {
    DANGER = "DANGER",
    SUCCESS = "SUCCESS",
    DEFAULT = "DEFAULT",
}

export class Toast {
    severity: ToastSeverity;
    text: string;
    delay?: number;
}
