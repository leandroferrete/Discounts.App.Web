import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStoresByLetter'
})
export class FilterStoresByLetterPipe implements PipeTransform {

  transform(stores: any[], letter: string): any[] {
    return stores.filter((store) => store.name.toUpperCase().startsWith(letter.toUpperCase()));
  }

}

