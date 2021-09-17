import { HttpResponse } from '@angular/common/http';
import { TodoService } from './../../services/todo.service';
import { TodoItem } from './../../services/todoItem';
import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	animations: [
		trigger('openClose', [
		  state('open', style({
			transform: 'translateX(-35px)'
		  })),
		  state('closed', style({
			transform: 'translateX(0)'
		  })),
		  transition('open => closed', [
			animate('300ms ease-in-out')
		  ]),
		  transition('closed => open', [
			animate('300ms ease-in-out')
		  ]),
		]),
	],
})
export class TodoListComponent implements OnInit {

	//Array to hold all the items which are not done
	todoList: TodoItem[] = [];

	// Array to hold completed todo list
	completedList: TodoItem[] = [];

	//Flag to displays input field to edit title of item
	editMode: boolean = false;

	// Holds the index which is selected/clicked
	selectedItem : number = -1;

	// Input property which holds whether the window size is of mobile or bigger
	@Input() isMobile = false;

	//Property to hold search text
	searchText : string = '';

	constructor(
		private _todoService: TodoService,
		private _snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.getTodoList();
	}

	//Gets list of todo item from server
	getTodoList() {
		this._todoService.sendRequest('GET', '/todos','', {}).subscribe((res:HttpResponse<any>)=>{

			if (res.status === 200) {
				let list :Array<TodoItem> = res.body;

				this.todoList = list.filter(x => !x.completed);
				this.completedList = list.filter(x => x.completed);
				if (this.isMobile) {
					this.todoList.push(...this.completedList)
				}
			} else {
				this._snackBar.open("Somenthing went wrong");
			}
			//Not recommended but used for user experience
			setTimeout(() => {
				this._snackBar.dismiss();
			}, 1000);
		});
	}

	showActions(index:number){
		this.editMode = false;
		this._snackBar.dismiss();
		this.selectedItem = (this.selectedItem == index) ? -1 : index;
	}

	deleteItem(item: TodoItem){
		this._todoService.sendRequest('DELETE', '/todos/'+item.id,'', {}).subscribe((res:HttpResponse<any>)=>{

			if (res.status === 200) {
				this.todoList = this.todoList.filter(x=> x.id !== item.id);
				this._snackBar.open("Successfully deleted an item");
				this.selectedItem = - 1;
			} else {
				this._snackBar.open("Somenthing went wrong");
			}
			//Not recommended but used for user experience
			setTimeout(() => {
				this._snackBar.dismiss();
			}, 1000);

		});
	}

	activateEditMode(flag:boolean){

		this.editMode = flag;
		if(flag)
			this._snackBar.open("Press ENTER to update title");
		else
			this._snackBar.dismiss();
	}

	//Updates todo item
	editItem(item:TodoItem){

		this._todoService.sendRequest('PUT', '/todos/'+item.id,'', item).subscribe((res:HttpResponse<any>)=>{

			if (res.status === 200) {
				this._snackBar.open("Successfully edited an item");
			} else {
				this._snackBar.open("Somenthing went wrong");
			}

			this.selectedItem = -1;
			this.editMode = false;
			//Not recommended but used for user experience
			setTimeout(() => {
				this._snackBar.dismiss();
			}, 1000);

		});
	}

	addItem(){

		let item = {
			id:201,
			title:'Item added by me',
			completed:false,
			userId:20
		}

		this._todoService.sendRequest('POST', '/todos','', item).subscribe((res:HttpResponse<any>)=>{

			if (res.status === 201) {
				this.todoList.unshift(item);
				this._snackBar.open("Successfully added an item");

			}  else {
				this._snackBar.open("Somenthing went wrong");
			}
			//Not recommended but used for user experience
			setTimeout(() => {
				this._snackBar.dismiss();
			}, 1000);

		});
	}

	markAsComplete(item:TodoItem){

		item.completed = true;

		this._todoService.sendRequest('PUT', '/todos/'+item.id,'', item).subscribe((res:HttpResponse<any>)=>{

			if (res.status === 200) {

				this.todoList = this.todoList.filter(x=> x.id !== item.id);
				if (this.isMobile) {
					this.todoList.push(item);
				} else {

					this.completedList.unshift(item);
				}
				this._snackBar.open("Successfully updated an item");

			} else {
				this._snackBar.open("Somenthing went wrong");
			}

			//Not recommended but used for user experience
			setTimeout(() => {
				this._snackBar.dismiss();
			}, 1000);

		});
	}
}
