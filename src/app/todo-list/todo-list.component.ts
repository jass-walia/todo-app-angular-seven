import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoList } from '../todo-list';
import { MatTable } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todoForm: FormGroup;
  submitted = false;
  submitAction = 'add';
  todoList = [];
  editItemIndex = 0;
  showForm = false;

  columnsToDisplay = ['todo', 'due', 'notes', 'done', 'action'];
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      todo: ['', [Validators.required, this.trimWhiteSpaceValidator]],
      due: [''],
      notes: [''],
      done: ['']    
    });
  }

  get field() {
    return this.todoForm.controls;
  }

  addTodo() {
    this.resetForm();
    this.showForm = true;
  }

  editTodo(index) {
    this.resetForm();
    this.todoForm.setValue(this.todoList[index]);
    this.submitAction = 'update';
    this.editItemIndex = index;
    this.showForm = true;
  }

  deleteTodo(index) {
    this.todoList.splice(index, 1);
    this.table.renderRows();
    this.cancelForm();
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.invalid) {
      return;
    }

    if (this.submitAction == 'update') {
        this.todoList[this.editItemIndex] = this.todoForm.value;
    } else {
      this.todoList.push(this.todoForm.value);
    }

    console.log(this.todoList);
    this.table.renderRows();

    this.cancelForm();
  }

  trimWhiteSpaceValidator(control: FormControl) {
    return !((control.value || '').trim().length === 0) ? null : { 'whitespace': true };
  }

  resetForm() {
    this.todoForm.reset();
    this.submitAction = 'add';
    this.editItemIndex = 0;
  }

  cancelForm() {
    this.resetForm();
    this.showForm = false;
  }
}
