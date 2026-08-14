import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    MatStepperModule,
    CdkStepperModule,
  ],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css',
})
export class Stepper extends CdkStepper {
  @Input() linearModeSelected: boolean = false;

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  onClick(index: number){
    this.selectedIndex = index;
  }


}
