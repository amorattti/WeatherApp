import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../core/services/weather.service';
import { CurrentWeather } from '../core/interfaces/currentlyWeather.model';
import { RootDailyWeather, Daily } from '../core/interfaces/dailyWeather.model';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
    private currentWeather: string = 'https://api.openweathermap.org/data/2.5/weather';
    private dailyWeather: string = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    weather: CurrentWeather;
    currentCityGeo: string; 
    currentCity: string = '';
    weeklyWeather: Daily[];
    weeklyWeatherToday: Daily;
    formatTemp: string;
    tempFormatWeekly: string;
    flagLocation: boolean = true;
    locationDeined: boolean = true;
    notFoundMessage: string = '';

    constructor(private api: WeatherService) { }

    ngOnInit() {
        this.formatTemp = 'metric';      
    }

    getLocation() {
        if (!navigator.geolocation) {
            console.log('No support for geolocation')
            alert('Geolocation is blocked in this browser.')
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            this.api.sendGETRequestByGeoCoords(longitude, latitude, this.currentWeather, this.formatTemp).subscribe((data: CurrentWeather) => {
                this.weather = data;
                this.currentCity = data.name;
                this.getDailyWeatherByName(data.name);
                this.flagLocation = true;
                this.currentCityGeo = data.name;
                this.notFoundMessage = ''
            });
        }, error => {
            if (error.message === "User denied Geolocation") {
                console.log('User denied Geolocation');
                alert('Geolocation is blocked in this browser.')
                this.locationDeined = false;
            }
        });
    }

    getByCityName(city:string) {
        if (city === '') {
            this.notFoundMessage = '';
        } else {
            this.api.sendGETRequestByCityName(city, this.currentWeather, this.formatTemp).subscribe((data: CurrentWeather) => {
                this.weather = data;
            }, error => {
                console.log('error', error);
                this.notFoundMessage = `City not found`;
            });
            this.currentCity = city;
            this.getDailyWeatherByName(city);
            this.flagLocation = false;
            this.notFoundMessage = '';
        }
    }

    getDailyWeatherByName(city:string) {
        if (this.formatTemp === 'metric') {
            this.tempFormatWeekly = 'M';
        } else {
            this.tempFormatWeekly = 'I';
        }
        this.api.sendGETRequest16Days(city, this.dailyWeather, this.tempFormatWeekly).subscribe((data: RootDailyWeather) => {
            this.weeklyWeather = data.data.slice(1);     
            this.weeklyWeatherToday = data.data[0];
        }, error => {
            console.log(error);
        });
    }

    changeFormat(format:string) {
        this.formatTemp = format;
        this.api.sendGETRequestByCityName(this.currentCity, this.currentWeather, this.formatTemp).subscribe((data: CurrentWeather) => {
            this.weather = data;
        }, error => {
            console.log(error);
        });
        this.getDailyWeatherByName(this.currentCity);
    }
}


