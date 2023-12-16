import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagramBuilderComponent } from './infraestructure/views/diagram/diagram-builder/diagram-builder.component';

const routes: Routes = [
  {
    path: "",
    component: DiagramBuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
