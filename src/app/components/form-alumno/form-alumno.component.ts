import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service.ts.service';
import { SnakBarService } from 'src/app/services/shared/snak-bar.service';

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.scss'],
})
export class FormAlumnoComponent implements OnInit {
  studentForm: FormGroup;
  isAddMode: boolean;
  id: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alumnoService: AlumnoService,
    private snackBarService: SnakBarService
  ) {
    this.studentForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(40)]],
      apellido: ['', [Validators.required, Validators.maxLength(40)]],
      direccion: ['', [Validators.required, Validators.maxLength(90)]],
      codigo_postal: ['', [Validators.required, Validators.maxLength(7)]],
      poblacion: ['', [Validators.required, Validators.maxLength(40)]],
      curso: ['', [Validators.required, Validators.maxLength(40)]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.alumnoService.getById(this.id).subscribe(
        (data) => {
          this.studentForm.patchValue(data);
        },
        (err) => {
          this.snackBarService.openSnackBar(err);
        }
      );
    }
  }
  onSubmit() {
    if (this.studentForm.invalid) {
      console.log('invalid');

      return;
    }
    if (this.isAddMode) {
      this.create();
    } else {
      this.update();
    }
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  create(): void {
    this.alumnoService.create(this.studentForm.value).subscribe(
      (data) => {
        this.router.navigate(['']);
        this.snackBarService.openSnackBar('Creado!');
      },
      ({ error }) => {
        this.snackBarService.openSnackBar(error);
      }
    );
  }
  update(): void {
    this.alumnoService.update(this.id, this.studentForm.value).subscribe(
      (data) => {
        this.snackBarService.openSnackBar('Se modificó correctamente :D');
        this.router.navigate(['']);
      },
      ({ error }) => {
        this.snackBarService.openSnackBar(error);
      }
    );
  }
}
