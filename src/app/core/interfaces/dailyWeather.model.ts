
 interface Weather {
	icon: string;
	code: number;
}

 export interface Daily {
	weather: Weather;
	max_temp: number; 
	temp: number;  
	min_temp: number; 
}

export interface RootDailyWeather {
	data: Daily[];
}

