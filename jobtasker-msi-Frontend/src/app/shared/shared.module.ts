import { TableFilterPipe } from './TableFilter.pipe';
import { NoDataFoundComponent } from './NoDataFound/NoDataFound.component';
import { LoaderComponent } from './Loader/Loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberToWordsPipe } from './numberToWords.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoaderComponent, NoDataFoundComponent, TableFilterPipe, NumberToWordsPipe],
  exports: [LoaderComponent, NoDataFoundComponent, TableFilterPipe, NumberToWordsPipe]
})
export class SharedModule { }
