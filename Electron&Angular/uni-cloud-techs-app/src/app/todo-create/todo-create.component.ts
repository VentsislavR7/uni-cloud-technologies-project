import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from 'src/services/todos.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit {
  form!: FormGroup;

  @Output() todoCreated = new EventEmitter();

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onCreateTodoClick() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }
    this.form.controls['completed'].setValue(false);
    this.todoService.create(this.form.value).then(
      () => {
        this.todoCreated.emit();

        this.form.reset();
      },
      () => {
        alert('Error creating todo!');
      }
    );
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      completed: new FormControl(false),
    });
  }
}
