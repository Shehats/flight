export class Base {
    private _url: string;
    // @ts-ignore
    private _getUrl: string;
    // @ts-ignore
    private _getOneUrl: string;
    // @ts-ignore
    private _createUrl: string;
    // @ts-ignore
    private _updateUrl: string;
    // @ts-ignore
    private _deleteUrl: string;

    constructor (url: string) {
      this._url = url
    }

    public get baseUrl (): string {
      return this._url
    }

    public set baseUrl (value: string) {
      this._url = value
    }

    public get getUrl (): string {
      return `${this._url}/${this.getUrl}`
    }

    public set getUrl (value: string) {
      this._getUrl = value
    }

    public get getOneUrl (): string {
      return `${this._url}/${this._getOneUrl}`
    }

    public set getOneUrl (value : string) {
      this._getOneUrl = value
    }

    public get createUrl (): string {
      return this._createUrl
    }

    public set createUrl (value : string) {
      this._createUrl = value
    }

    public get updateUrl (): string {
      return this._updateUrl
    }

    public set updateUrl (value: string) {
      this._updateUrl = value
    }

    public get deleteUrl (): string {
      return this._deleteUrl
    }

    public set deleteUrl (value : string) {
      this._deleteUrl = value
    }
}
