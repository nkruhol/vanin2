import * as sendpulse from "sendpulse-api";
import { sendPulseConfig } from "../config";

function sendPulseInit(method: Function, ...data: any): Promise<any> {

    return new Promise((resolve, reject) => {

        sendpulse.init(sendPulseConfig.userId, sendPulseConfig.secret, "/tmp/", (initRes: any) => {

            if (initRes.is_error) reject(initRes);

            method((res: any) => {

                if (!res.result) reject(res);

                resolve(res)
            }, ...data);
        });
    })
}

class EmailWithTemplate {

    constructor(name: string, email: string) {

        this.template.variables.name = name;
        this.to = [{
            name,
            email,
        }]
    }

    subject = "Підтвердження реєстації на МДОЗМФ-2021";
    template = {
        id: "45969",
        variables: {
            name: "",
        }
    };
    from = {
        email: "symposium@dsmmph.org.ua",
        name: "МДОЗМФ-2021",
    }
    to: any[] = [];
}

export function sendRegistrationEmail(user: any) {

    return sendPulseInit(
        sendpulse.smtpSendMail,
        new EmailWithTemplate(
            `${user.firstName} ${user.lastName}`,
            user.email,
        ),
    );
}