import { Component, OnInit } from '@angular/core';
import { Items } from './items.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from 'primeng/components/common/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Kitchen Display System';
  itemList;
  products=[];
  quantity=[];
  msgs: Message[] = [];
  items = new Items();
  isTableVisible:Boolean = false;
  isButtonDisabled:Boolean;
  isReportVisible:Boolean;

  constructor(private http: HttpClient){
    this.products = [
      {name: 'Jumbo Chicken Wrap'},
      {name: 'Vegetarian Lasagne'},
      {name: 'Jumbo Paneer Wrap'}
    ];
    this.quantity = [
      {count: 1},
      {count: 2},
      {count: 3},
      {count: 4},
      {count: 5},
      {count: 6},
      {count: 7},
      {count: 8}
    ];
  }

  ngOnInit(){
    this.getItemsList();
  }

  getItemsList(){
    this.http
    .get("http://localhost:4000/api/items",{headers:new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(
      result=>{
        this.itemList=result;
      },
      error=>{
        alert("API not available"+error);
      });
  }

  selectedItem(event){
    this.items.name=event.value.name;
  }

  selectedQuantity(event){
    this.items.quantity=event.value.count;
  }

  insertItems(){
    if(this.items.name!=null){
    this.items.predicted = Math.floor(Math.random()*100);
    this.http
    .post("http://localhost:4000/api/insertItems",JSON.stringify(this.items),{headers:new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(
      result=>{
        this.msgs =[];
        this.msgs.push({severity:'success', summary:'Order Submitted', detail:'Wait till your order is being prepared'})
        this.isTableVisible = true;
        this.getItemsList();
      },
      error=>{
        alert("API not available"+error);
      });
    }
  }

  updateItems(item){
    this.items._id = item._id;
    this.items.name = item.name;
    this.items.quantity = 0;
    this.items.createdTillNow = item.createdTillNow + item.quantity;
    this.items.predicted = item.predicted;
    this.http
    .post("http://localhost:4000/api/updateItem",JSON.stringify(this.items),{headers:new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(
      result=>{
        this.ngOnInit();
        this.msgs =[];
        this.msgs.push({severity:'info', summary:'Order Ready', detail:'Lets fill your hunger'})
      },
      error=>{
        alert("API not available"+error);
      });
  }

  reset(){
    this.isTableVisible = false;
  }

  viewReport(){
    this.isReportVisible = true;
  }

  hide(){
    this.isReportVisible = false;
  }

}
