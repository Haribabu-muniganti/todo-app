import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    if (!searchText) {
      return items;
    }

    if (!items.length) {
      return [];
    }
    let serachTextInLowercase = searchText.toLowerCase();
    return items.filter(item=>item.title.toLowerCase().includes(serachTextInLowercase));
  }

}
