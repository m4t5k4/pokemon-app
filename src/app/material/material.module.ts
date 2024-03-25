import { NgModule } from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [],
    imports: [
        
    ],
    exports: [
        MatTableModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class MaterialModule { }