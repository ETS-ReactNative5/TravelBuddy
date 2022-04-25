import { PersistanceHandler } from "../PersistanceHandler/Store";
import { User } from "./User";

export class TravelMate extends User{
    #PHandler;
    constructor(){
        super();
        this.#PHandler=new PersistanceHandler();
    }
}