import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategoriesByLetter'
})
export class FilterCategoriesByLetterPipe implements PipeTransform {

  transform(categories: any[], letter: string): any[] {
    return categories.filter((category) => category.name.toUpperCase().startsWith(letter.toUpperCase()));
  }

}
