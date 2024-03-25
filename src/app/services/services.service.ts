import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private path = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllPokemon(): Observable<any> {
    return this.httpClient.get<any[]>(this.path + "/Pokemon/GetPokemon");
  }

  editPokemon(pokemmon: Pokemon): any {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put(this.path + "/Pokemon/Put", JSON.stringify(pokemmon), { headers: header });
  }

  createNewPokemon(pokemmon: Pokemon): any {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "/Pokemon/Post", JSON.stringify(pokemmon), { headers: header });
  }

  deletePokemon(pokemmon: Pokemon): any {
    return this.httpClient.delete(this.path + "Pokemon/Delete/" + pokemmon.id);
  }
}
