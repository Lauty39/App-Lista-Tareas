import { Component, OnInit } from '@angular/core';
import { Todo } from './interfaces/todos.interfaces';
import { TodosService } from './services/todos.service';
import { Subscription } from 'rxjs';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todos?: Todo[];
  private todosService: TodosService;
  private todosSubscription: Subscription;
  public weatherData: any;

  constructor(private weatherService: WeatherService, todosService: TodosService) {
    this.todosService = todosService;
    this.todosSubscription = this.todosService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  ngOnInit() {
    this.loadWeatherData();
  }

  ngOnDestroy() {
    this.todosSubscription.unsubscribe();
  }

  private loadWeatherData() {
    this.weatherService.getWeather().subscribe((weatherData) => {
      this.weatherData = weatherData;
    });
  }
}

