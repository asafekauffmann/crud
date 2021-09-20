import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
    ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
  });
  }

  create(product: Product): Observable<Product> {  
    return this.http.post<Product>(this.baseUrl , product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  // Method post retorna sempre um observable de um tipo.
  // Methodo recebera um produto de parametro e responderá com um observable do tipo produto (detectando quando a resposta acontece).
  // Observer é padrão baseado em eventos, quando acontece um evento, um codigo será chamado de forma reativa.
  // Evento nesse é quando a requisição retornar (resposta chegar).
  // chamará a função que vamos passar.

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  } // Method get ler info backend e retornar observablo da lista de produtos do backend


  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj), 
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id?: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e:any): Observable<any> {
    console.log(e)
    this.showMessage("Ocorreu algum erro!", true);
    return EMPTY;
  }

}
