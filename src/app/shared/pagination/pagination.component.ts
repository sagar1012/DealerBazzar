import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit,OnChanges {

  @Input() itemscount: number = 0;
  @Output() changePage = new EventEmitter<any>();
  @Input() initialPage = 1;
  @Input() itemsPerPage = 5;
  @Input() maxPages = 10;

  pager: any = {};

  constructor() { }

  ngOnInit(): void {
    // console.log(this.items);
    
    // if (this.items && this.items.length) {
    //   this.setPage(this.initialPage);
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    console.log('changes');
    
    // console.log(changes['items'].currentValue);
    // console.log(changes['items'].previousValue);
    
      this.setPage(this.initialPage);
      // console.log(this.pager);
    
  }

  setPage(page: number) {
    // get new pager object for specified page
    
    this.pager = this.paginate(this.itemscount, page, this.itemsPerPage, this.maxPages);
    // console.log(this.pager);
    
    // get new page of items from items array
    // var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // console.log(pageOfItems,'page pf Index here')
    // call change page function in parent component
    let item = {
      'startIndex' : this.pager.startIndex,
      'endIndex' : this.pager.endIndex
    }
    this.changePage.emit(item);
  }

  paginate(totalItems: number, currentPage: number, itemsPerPage: number, maxPages: number) {
    //if user set to zeros
    if (currentPage === 0) { currentPage = 1; }
    if (itemsPerPage === 0) { itemsPerPage = 10; }
    if (maxPages === 0) { maxPages = 10; }

    // calculate total pages
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    }
    else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
    }
    else {
      // total pages more than max so calculate start and end pages
      var maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      var maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages;
      }
      else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      }
      else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    // console.log(Array.from(Array((endPage + 1) - startPage).keys()));
    
    var pages = Array.from(Array((endPage + 1) - startPage).keys()).map(function (i) { return  i + 1; });
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
