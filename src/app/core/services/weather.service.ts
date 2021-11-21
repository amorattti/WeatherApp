import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class WeatherService {
    keyApi: string = '148ab12495a9f1a901fe6056090a7487';
    kepApi2: string = '769a9af271f24087b60e4b295e71df3e';

    constructor(private httpClient: HttpClient) { }

    private static _handleError(err: HttpErrorResponse | any) {
        return throwError(err.error.message);
    }

    sendGETRequestByGeoCoords(log:string, lat:string, url: string, matric: string) {
        let params = new HttpParams();
        params = params.append('lon', log);
        params = params.append('lat', lat);
        params = params.append('units', matric);
        params = params.append('appid', this.keyApi);

        return this.httpClient
            .get(url, { params: params })
            .pipe(catchError(WeatherService._handleError));
    }

    sendGETRequestByCityName(city: string, url: string, matric: string) {
        let params = new HttpParams();
        params = params.append('q', city);
        params = params.append('units', matric);
        params = params.append('appid', this.keyApi);

        return this.httpClient
            .get(url, { params: params })
            .pipe(catchError(WeatherService._handleError));
    }

    sendGETRequest16Days(city: string, url: string, matric: string) {
        let params = new HttpParams();
        params = params.append('city', city);
        params = params.append('days', '6');
        params = params.append('units', matric);
        params = params.append('key', this.kepApi2);

        return this.httpClient
            .get(url, { params: params })
            .pipe(catchError(WeatherService._handleError));
    }
}


