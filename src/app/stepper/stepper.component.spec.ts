import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponent } from './stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StepperComponent', () => {
	let component: StepperComponent;
	let fixture: ComponentFixture<StepperComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				BrowserAnimationsModule,
				FormsModule,
				ReactiveFormsModule,
				CdkStepperModule,
				MatToolbarModule,
				MatRadioModule,
				MatCheckboxModule,
				MatStepperModule,
				MatButtonModule,
				MatIconModule,
				MatInputModule,
			],
			declarations: [StepperComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StepperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should price be undefined at init', () => {
		expect(component.getPrice()).toBeUndefined();
	});

	it('should price be defined when answer is false', () => {
		component.firstStepForm.get('answer').setValue(false);
		expect(component.getPrice()).toBeDefined();
		expect(component.getPrice()).toEqual(2000);
	});
});
