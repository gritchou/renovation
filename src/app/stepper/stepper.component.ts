import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


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
const DEBUG = true;

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

	price: Observable<number>;
	knownSize: Observable<boolean>;
	width: Observable<number>;
	length: Observable<number>;
	area: Observable<number>;
	unitFloorPrice: Observable<number>;
	floorPrice: Observable<number>;
	furnituresPrice: Observable<number>;

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

		// Declare source observables
		this.knownSize = this.firstStepForm.get('answer').valueChanges.pipe(
			startWith(true)
		);
		
		this.width = this.sizeStepForm.get('width').valueChanges;
		this.length = this.sizeStepForm.get('length').valueChanges;

		this.area = combineLatest(this.width, this.length).pipe(
			startWith([0, 0]),
			map(([w, l]) => w * l / 100 / 100)
		);

		this.unitFloorPrice = this.floorStepForm.get('floor').valueChanges.pipe(
			startWith('parquet'),
			map(type => FLOOR_EUROS_PRICE[type])
		);

		this.floorPrice = combineLatest(this.knownSize, this.unitFloorPrice, this.area).pipe(
			map(([k, u, a]) => k ? u * a : 2000)
		);

		this.furnituresPrice = this.furnitureStepForm.valueChanges.pipe(
			startWith({}),
			map(checkboxes => Object.keys(checkboxes)
				.filter(c => checkboxes[c])
				.map(c => FURNITURES_EUROS_PRICE[c])
				.reduce((a, b) => a + b, 0)
			)
		);

		// Combine observables
		this.price = combineLatest(this.floorPrice, this.furnituresPrice).pipe(
			map(([floor, furnitures]) => floor + furnitures)
		);
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
