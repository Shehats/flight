import { Base } from './base'

export class FlightModel extends Base {
    // @ts-ignore
    private _departureTime: Date;
    // @ts-ignore
    private _arriveTime: Date;
    // @ts-ignore
    private _from: string;
    // @ts-ignore
    private _to: string;
    // @ts-ignore
    private _totalPrice: number;
    // @ts-ignore
    private _numberOfBags: number;
    // @ts-ignore
    private _baggagePrice: number;

    public get DepartureTime (): Date {
      return this._departureTime
    }

    public set DepartureTime (value: Date) {
      this._departureTime = value
    }

    public get ArriveTime () : Date {
      return this._arriveTime
    }

    public set ArriveTime (value: Date) {
      this._arriveTime = value
    }

    public get From (): string {
      return this._from
    }

    public set From (value : string) {
      this._from = value
    }

    public get To (): string {
      return this._to
    }

    public set To (value : string) {
      this._to = value
    }

    public get TotalPrice (): number {
      return this._totalPrice
    }

    public set TotalPrice (value : number) {
      this._totalPrice = value
    }

    public set NumberOfBags (value: number) {
      this._numberOfBags = value
    }

    public get NumberOfBags (): number {
      return this._numberOfBags
    }

    public set BaggagePrice (value: number) {
      this._baggagePrice = value
    }

    public get BaggagePrice () : number {
      return this._baggagePrice
    }
}
