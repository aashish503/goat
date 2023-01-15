import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.css']
})
export class ProductcrudComponent {
  ProductArray : any[] = [];
  currentProductID = "";





  name: string ="";
  categary: string ="";

  constructor(private http: HttpClient )
  {
    this.getAllProduct();
  }
  getAllProduct() {

    this.http.get("http://localhost:4000/user/getAll")
    .subscribe((resultData: any)=>
    {

        console.log(resultData);
        this.ProductArray = resultData.data;
    });


  }

  setUpdate(data: any)
  {
   this.name = data.name;
   this.categary = data.categary;


   this.currentProductID = data._id;

  }

  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "categary" : this.categary,


    };

    this.http.patch("http://localhost:4000/user/update"+ "/"+this.currentProductID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Updateddd")
        this.getAllProduct();

    });
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:4000/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Deletedddd")
        this.getAllProduct();

    });
    }

  save()
  {
    if(this.currentProductID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }

  }

register()
  {

    let bodyData = {
      "name" : this.name,
      "categary" : this.categary,

  };
    this.http.post("http://localhost:4000/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Registered Successfully")
         //this.getAllProduct();
        this.name = '';
        this.categary = '';

        this.getAllProduct();
    });

  }
}
