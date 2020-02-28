import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CdkStepperModule, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { StepperComponent } from './stepper/stepper.component';

import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		AppComponent,
		StepperComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
        TranslateModule.forRoot({
			loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en',
        }),
		CdkStepperModule,
		MatToolbarModule,
		MatRadioModule,
		MatCheckboxModule,
		MatStepperModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
	],
	providers: [{
		provide: STEPPER_GLOBAL_OPTIONS,
		useValue: { showError: true }
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
