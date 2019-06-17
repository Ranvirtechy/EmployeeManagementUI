export class ResponseBaseWithoutData {
    HttpStatusCode: number;
    TfrStatusCode: number;
    IsSuccess: boolean;
    Messages: Message[];
}

export class ResponseBase<T> extends ResponseBaseWithoutData {
    Data: T;
}

export class Message {
    Title: string;
    Details: string;
    MessageType: MessageType;
}

export enum MessageType {
    Info = 1,
    Warning = 2,
    Error = 3,
}
