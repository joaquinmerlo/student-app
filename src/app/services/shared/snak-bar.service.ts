import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnakBarService {
  constructor(private snackBar: MatSnackBar) {}
  openSnackBar(message: string, action = 'Cerrar'): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
    });
  }
}
