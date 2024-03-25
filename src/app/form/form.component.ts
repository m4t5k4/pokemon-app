import { Component, Inject, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListComponent } from '../list/list.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  newPokemon: Pokemon | undefined;
  isEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private services: ServicesService
    ) { }
  

  newPokemonForm = new FormGroup({
    name: new FormControl('')
  });

  ngOnInit(): void {
    if (this.data != null) {
      console.log(this.data.pokemon);
      this.newPokemonForm = new FormGroup({
        name: new FormControl(this.data.pokemon.name)
      });
      this.isEdit = true;
    }
  }

  onReject(): void {
    this.dialogRef.close(0);
  }

  onSubmit(): void {
    if (!this.isEdit) {
      this.newPokemon = new Pokemon(0, this.newPokemonForm.value.name!);
      this.services.createNewPokemon(this.newPokemon).subscribe((res: any) => {
        this.dialogRef.close(1);
      });
    } else {
      this.newPokemon = new Pokemon(this.data.pokemon.id, this.newPokemonForm.value.name!);
      this.services.editPokemon(this.newPokemon).subscribe((res: any) => {
        this.dialogRef.close(1);
      })
    }
  }
}
