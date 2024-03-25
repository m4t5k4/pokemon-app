import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pokemon } from '../models/pokemon.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServicesService } from '../services/services.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource!: MatTableDataSource<Pokemon>;
  displayedColumns: string[] = ['name', 'Actions'];

  constructor(public dialog: MatDialog, private services: ServicesService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this.services.getAllPokemon().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    })
  }

  addPokemon() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';

    let dialogRef = this.dialog.open(FormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res != 0) {
        console.log('pokemon created');
        this.getPokemon();
      } else {
        console.log('dialog was closed');
      }
    });
  }

  editPokemon(pokemmon: Pokemon) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      pokemon: pokemmon
    }

    let dialogRef = this.dialog.open(FormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res != 0) {
        console.log('pokemon created');
        this.getPokemon();
      } else {
        console.log('dialog was closed');
      }
    })
  }

  deletePokemon(pokemmon: Pokemon) {
    this.services.deletePokemon(pokemmon).subscribe((res: any) => {
      console.log(res);
    })
  }
}
