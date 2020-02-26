import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatStepper, MatStep } from '@angular/material/stepper';

import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';

const FURNITURES_EUROS_PRICE = {
	bathtub: 1000,
	sink: 100,
	cabinet: 250
};

const FLOOR_EUROS_PRICE = {
	basis: 2000,
	parquet: 25,
	tiles: 15,
	concrete: 40
};

// Set to true to display FormGroups states as json objects
const DEBUG = false;

export function furnituresValidator(control: FormGroup): ValidationErrors | null {
	const bathtub = control.get('bathtub').value;
	const cabinet = control.get('cabinet').value;
	const sink = control.get('sink').value;
	return (bathtub || cabinet || sink) ? null : { furnitures: true } ;
}

export function sizeValidator(control: FormGroup): ValidationErrors | null {
	const length = control.get('length').value;
	const width = control.get('width').value;
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
	floorStepForm: FormGroup;

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
			sink: [false, Validators.required],
		}, { validators: furnituresValidator });
		this.floorStepForm = this.formBuilder.group({
			floor: ['parquet', Validators.required],
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
			price += Number(this.sizeStepForm.get('length').value) * Number(this.sizeStepForm.get('width').value) * FLOOR_EUROS_PRICE[this.floorStepForm.get('floor').value] / (100 * 100);
		} else {
			price += FLOOR_EUROS_PRICE.basis; // Don't know size
		}
		return price;
	}

	get displayStates() {
		return DEBUG;
	}

	estimate() {
		this.validated = true;
	}

	get displayPrice() {
		return this.validated && (!this.firstStepForm.get('answer').value || this.sizeStepForm.valid);
	}
}
