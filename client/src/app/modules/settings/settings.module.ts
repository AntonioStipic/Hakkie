import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './settings.component';

const routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

const COMPONENTS = [
  SettingsComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatListModule
  ]
})
export class SettingsModule {
}
