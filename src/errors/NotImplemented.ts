import BaseError from "./BaseError";
export default class NotImplemented extends BaseError{
    constructor()
    {
        super("This service is not Implemented yet",501,"NotImplemented");
    }
}