import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'category',
    standalone: true
})
export class CategoryPipe implements PipeTransform {

  transform( value: string ): string {
    switch(value){
      case 'Front-End': return 'code';
      case 'Back-End': return 'computer';
    }
    return 'terminal';
  }

}
