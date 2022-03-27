import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import { TodosService } from 'src/services/todos.service';

@Component({
  selector: 'app-todo-row',
  templateUrl: './todo-row.component.html',
  styleUrls: ['./todo-row.component.css'],
})
export class TodoRowComponent implements OnInit {
  @Input() todo!: Todo;

  @Output() todoUpdated = new EventEmitter();
  @Output() todoDeleted = new EventEmitter();

  isEditing = false;
  form!: FormGroup;

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.initForm();
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.enableFormEditableFields();
    } else {
      this.disableFormEditableFields();
    }
  }

  saveTodo() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const newValues = this.form.value;

      this.toggleEditing();

      this.todoService.update(newValues).then(
        () => {
          this.todoUpdated.emit();
        },
        () => {
          alert('Error updating todo!');
        }
      );
    }
  }

  deleteTodo() {
    if (!confirm(`Delete todo: ${this.todo.title}?`)) {
      return;
    }

    this.todoService.delete(this.todo.id).then(
      () => {
        this.todoDeleted.emit();
      },
      () => {
        alert('Error deleting todo!');
      }
    );
  }

  private initForm() {
    this.form = new FormGroup({
      id: new FormControl(this.todo.id),
      title: new FormControl({ value: this.todo.title, disabled: true }, [
        Validators.required,
      ]),
      completed: new FormControl({
        value: this.todo.completed,
        disabled: true,
      }),
    });
  }

  private enableFormEditableFields() {
    this.form.controls['title'].enable();
    this.form.controls['completed'].enable();
  }

  private disableFormEditableFields() {
    this.form.controls['title'].disable();
    this.form.controls['completed'].disable();
  }
}
