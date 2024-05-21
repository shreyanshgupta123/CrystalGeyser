import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.css'
})
export class UserSettingComponent {
  activeComponent: string = '';
  constructor(private route:Router
    ) { }


    setActiveComponent(componentName: string) {
      this.activeComponent = componentName;
    }
}
