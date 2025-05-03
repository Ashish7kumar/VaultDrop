import BaseError from "./BaseError";
export default class extends BaseError{
    constructor(message:string)
    {
       super(message,400,"Bad Request");
    }
}