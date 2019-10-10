import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatStepper, MatStep } from '@angular/material/stepper';

import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';

const FURNITURES_EUROS_PRICE = {
	bathtub: 1000,
	synk: 100,
	cabinet: 250
};

const GROUND_EUROS_PRICE = {
	basis: 2000,
	parquet: 25,
	carrelage: 15,
	beton: 40
};

// Set to true to display FormGroups states as json objects
const DEBUG = false;

export function furnituresValidator(control: FormGroup): ValidationErrors | null {
	const bathtub = control.get('bathtub').value;
	const cabinet = control.get('cabinet').value;
	const synk = control.get('synk').value;
	return (bathtub || cabinet || synk) ? null : { furnitures: true } ;
}

export function sizeValidator(control: FormGroup): ValidationErrors | null {
	const length = control.get('length').value;
	const width = control.get('width').value;
	console.log({ length });
	console.log({ width });
	return (length && width) ? null : { size: true };
}

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

	firstStepForm: FormGroup;
	sizeStepForm: FormGroup;
	furnitureStepForm: FormGroup;
	groundStepForm: FormGroup;

	displayError = false;
	validated = false;

	constructor(
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.firstStepForm = this.formBuilder.group({
			answer: [true, Validators.required],
		});
		this.sizeStepForm = this.formBuilder.group({
			length: ['', Validators.pattern('[0-9]*')],
			width: ['', Validators.pattern('[0-9]*')],
		}, { validators: sizeValidator });
		this.furnitureStepForm = this.formBuilder.group({
			bathtub: [false, Validators.required],
			cabinet: [false, Validators.required],
			synk: [false, Validators.required],
		}, { validators: furnituresValidator });
		this.groundStepForm = this.formBuilder.group({
			ground: ['parquet', Validators.required],
		});
	}

	// See algorythm in README.md
	getPrice(): number | undefined {
		// Furnitures
		let price = Object.keys(FURNITURES_EUROS_PRICE).reduce((acc, curr) => {
			return this.furnitureStepForm.get(curr).value ? acc + FURNITURES_EUROS_PRICE[curr] : acc;
		}, 0);

		// Know size
		if (this.firstStepForm.get('answer').value) {
			if (!this.sizeStepForm.valid || !this.sizeStepForm.get('length').value || !this.sizeStepForm.get('width').value) {
				return undefined;
			}
			// tslint:disable-next-line:max-line-length
			price += Number(this.sizeStepForm.get('length').value) * Number(this.sizeStepForm.get('width').value) * GROUND_EUROS_PRICE[this.groundStepForm.get('ground').value] / (100 * 100);
		} else {
			price += 2000; // Don't know size
		}

		return price;
	}

	get displayStates() {
		return DEBUG;
	}

	get priceFound(): boolean {
		const firstStep = this.firstStepForm.get('answer').value;
		const sizeStep = this.sizeStepForm.valid && !!this.sizeStepForm.get('length').value && !!this.sizeStepForm.get('width').value;
		const furnituresStep = this.furnitureStepForm.valid;
		const groundStep = this.groundStepForm.valid;
		// console.log({ firstStep });
		// console.log({ sizeStep });
		// console.log({ furnituresStep });
		// console.log({ groundStep });
		// console.log('priceFound()', (firstStep && sizeStep || !firstStep) && furnituresStep && groundStep);
		const priceFound = (firstStep && sizeStep || !firstStep) && furnituresStep && groundStep;
		if (!priceFound) {
			this.displayError = true;
			return;
		}
		this.displayError = false;
		return priceFound;
	}

	estimate() {
		this.validated = true;
	}
}
