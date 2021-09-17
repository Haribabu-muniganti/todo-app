import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter } from 'rxjs/operators'


type HTTPRequestMethods = 'GET' | 'PUT' | 'DELETE' | 'POST' | 'OPTIONS' | 'DELETE' | 'HEAD' | 'JSONP' | 'get' | 'put' | 'delete' | 'post' | 'options' | 'delete' | 'head' | 'jsonp';
export const SERVER_URL: string = "https://jsonplaceholder.typicode.com";

@Injectable({
	providedIn: 'root'
})
export class TodoService {

	constructor(private http: HttpClient) { }

	sendRequest(method : HTTPRequestMethods, url:string, params:string, body:any){

		let httpParams = new HttpParams();
		if (params !== "") {

			let paramlist = params.split('&');
			paramlist.forEach(ele=>{
				let keyVal = ele.split('=');
				httpParams.append(keyVal[0],keyVal[1]);
			});

		}

		return  this.http.request(new HttpRequest(
            method,
            SERVER_URL + url,
            body,
			{params:httpParams}
           )
		).pipe(filter((event)=>{

			switch (event.type) {
				case HttpEventType.Sent:
					return false;

				case HttpEventType.ResponseHeader:
					return false;

				case HttpEventType.UploadProgress:
					return false;

				case HttpEventType.DownloadProgress:
					return false;

				case HttpEventType.Response:

					return true;

				default:
					return true;
			}
		}),catchError((err)=>{
			return [err]
		}))
	}
}
