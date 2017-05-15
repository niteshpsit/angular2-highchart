import { BaseModel } from './base.model';
export class TrBackLogModel extends BaseModel {
    state: string;
    constructor(
        public tpgName: string = '',
        public weeks: Array<any> = [],
        public graphName: string = ''
    ){
        super();
    }

    fromJSON(value: any) {
        for (var prop in value) {
            this[prop] = value[prop];
        }
        return this;
    }
}