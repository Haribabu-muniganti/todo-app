import { Component } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'interview-app';

	mediaSubscription : Subscription = new Subscription();

	isMobile : boolean = false;

	constructor(private mediaObserver: MediaObserver ) {

	}

	ngOnInit(): void {

		this.mediaSubscription = this.mediaObserver.media$.subscribe((result:MediaChange)=>{

			this.isMobile = (result.mqAlias === 'xs') ? true : false;
		})

	}

	ngOnDestroy(): void {
		this.mediaSubscription.unsubscribe();
	}
}
