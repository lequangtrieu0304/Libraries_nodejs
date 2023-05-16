import { StatusCodes } from "http-status-codes"
import { Exception } from "./Exception.js"

export class NOT_FOUND extends Exception {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}