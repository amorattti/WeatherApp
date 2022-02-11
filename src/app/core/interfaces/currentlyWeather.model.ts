
 interface Coord {
	lon: number;
	lat: number;
}

 interface Weather {
	main: string;
	description: string;
	icon: string;
}

 interface Main {
	temp: number;
	temp_min: number;
	temp_max: number;
	humidity: number;
}

interface Wind {
	speed: number;
	deg: number;
}

interface Sys {
	country: string;
	sunrise: number;
	sunset: number;
}

export interface CurrentWeather {
	coord: Coord;
	weather: Weather[];
	main: Main;
	wind: Wind;
	dt: number;
	sys: Sys;
	timezone: number;
	name: string;
}


