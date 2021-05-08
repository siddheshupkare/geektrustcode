import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from "@angular/common/http"
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
 {
          displayedColumns: string[] = ['select','id', 'name', 'email', 'role','option'];
          
          EMP_DATA: AdminData[] = [];   

          dataSource = new MatTableDataSource<AdminData>(this.EMP_DATA);

          totaldata=46;        
          dataPerPage=10;

        
          constructor(private http: HttpClient) { }

          ngOnInit(): void 
          { 
              this.getData(0,10)
          }

          getData(start,end)  //function to get data from API
          {
                  this.http.get<any>("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").subscribe(
                  (data)=>{
                          console.log(data)
                          this.EMP_DATA=data.slice(start,end)

                          this.dataSource=new MatTableDataSource(this.EMP_DATA);
                        }
                       )
           }
          


           //Function to change the page
          onChangedPage(pageData: PageEvent)
          {
                var val=pageData.pageIndex
                // var val2=pageData.previousPageIndex
                if(pageData.pageIndex)
                {
                this.getData(val*10,(val+1)*10)
                }
          }

          //Function to delete the single row
          deleteData(index)
          {
              this.EMP_DATA.splice(index,1)
              this.dataSource._updateChangeSubscription();
          }

          //function for filtering data
          applyFilter(event: Event)
          {
            const filterValue = (event.target as HTMLInputElement).value;
            console.log(filterValue)
            this.dataSource.filter=filterValue.trim().toLowerCase();
            
          }

     
}

        //model
  export interface AdminData
 {
          id: number;
          name: string;
          email: string;
          role: string;
  }
