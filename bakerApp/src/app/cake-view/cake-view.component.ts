import { Component, OnInit } from '@angular/core';
import { Cake } from '../models/cake';
import { CakeService } from '../sevices/cake.service';
import { Data } from '@angular/router';
import { Cakes } from '../models/cakes';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cake-view',
  templateUrl: './cake-view.component.html',
  styleUrls: ['./cake-view.component.css']
})
export class CakeViewComponent implements OnInit {
  
  cakes:Array<Cake>=[];
  categories: string[] = ['Desert', 'bread', 'Cake', 'cookies', 'vegan', 'all'];
  selectedCategory: string | null = 'all';

  constructor(private _cakeService:CakeService){}

  filterItemsByCategory(category: string) {
    this.selectedCategory = category;
  }
 
  ngOnInit(): void {
   this._cakeService.getCakes().subscribe({
    next:data=>{
      this.cakes=data;
    },
    error:err=>{
      alert("error accored while fething the data")

    }} )
  }
  onSearch(searchText: string) {
    if (searchText) {
      //this.getNotes();
      this.cakes = this.cakes.filter(cake =>
        cake.image?.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.getCakes();
      this.cakes=Cakes;
      // Reset the notes array to the original data
      
      
    }
  }
  getCakes(){
   
      this._cakeService.getCakes().subscribe({
        next:data=>{
          this.cakes=data;
        },
        error:err=>{
          alert("error accored while fething the data")
    
        }} )
      
    
   
  }
  getFilteredItems() {
    if (this.selectedCategory === 'all') {
      return this.cakes;
    } else {
      return this.cakes.filter(item => item.categories === this.selectedCategory);
    }
  }


}
