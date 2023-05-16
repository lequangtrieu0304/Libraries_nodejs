import { StatusCodes } from "http-status-codes"
import { Exception } from "./Exception.js"

export class BAD_REQUEST extends Exception {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}