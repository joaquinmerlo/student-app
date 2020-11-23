import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service.ts.service';
import { AuthService } from 'src/app/services/auth.service.ts.service';
import { SnakBarService } from 'src/app/services/shared/snak-bar.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  alumnos: Alumno[] = [];
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'direccion',
    'codigo_postal',
    'poblacion',
    'curso',
    'actions',
  ];

  constructor(
    private alumnoService: AlumnoService,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnakBarService
  ) {}

  ngOnInit(): void {
    this.alumnoService.getAll().subscribe(
      (data) => {
        this.alumnos = data;
      },
      ({ error }) => {
        this.snackBarService.openSnackBar(error);
      }
    );
  }

  goToEdit(id: string) {
    this.router.navigate(['/edit/' + id]);
  }

  goToAdd(): void {
    this.router.navigate(['/add/']);
  }

  deleteAlumno(id: string) {
    if (!localStorage.getItem('token')) {
      this.snackBarService.openSnackBar(
        'Debe iniciar sesión para eliminar un alumno'
      );
      return;
    } else {
      this.alumnoService
        .delete(id)
        .toPromise()
        .then(() => {
          this.alumnos = this.alumnos.filter((a) => a.id === id);
        })
        .catch(({ error }) => {
          this.snackBarService.openSnackBar(error);
        });
    }
  }
}
