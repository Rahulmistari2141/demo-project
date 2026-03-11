import { Component, OnInit, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './report.html',
  styleUrls: ['./report.scss']
})
export class Report implements OnInit {
  reportsList: any[] = [];
  isEditMode: boolean = false;
  pageNumber: number = 1;
  itemsPerPage: number = 10;

  // Source signals
  // reportsList = signal<any[]>([]);
  // searchTerm = signal('');
  // reportObj = {
  //   id: 0,
  //   userId: 0,
  //   title: "",
  //   body: ""
  // }

  reportObj = {
    vendorId: 0,
    vendorName: "",
    contactNo: "",
    emailId: ""
  }

  // Filtered computed signal
  // filteredReports = computed(() => {
  //   const term = this.searchTerm().toLowerCase();

  //   return this.reportsList().filter((report:any) =>
  //     report.name.toLowerCase().includes(term)
  //   );
  // });

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.http.get('https://api.freeprojectapi.com/api/BusBooking/GetBusVendors').subscribe({
      next: (res: any) => {
        console.log(res);
        this.reportsList = res.sort((a:any, b:any) => b.vendorId - a.vendorId);
        // this.reportsList.set(res); // set signal value
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onSave() {
    this.http.post('https://api.freeprojectapi.com/api/BusBooking/PostBusVendor', this.reportObj).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.reportsList.unshift(res); // add new report to the top of the list
        this.reportObj = {
          vendorId: 0,
          vendorName: "",
          contactNo: "",
          emailId: ""
        }
        this.getReports();
        this.isEditMode = false; // change button text
        console.log("Report saved successfully!", this.reportObj);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onUpdate() {
    this.http.put('https://api.freeprojectapi.com/api/BusBooking/PutBusVendors?id=' + this.reportObj.vendorId, this.reportObj).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.getReports();
        this.isEditMode = false;
        this.reportObj = {
          vendorId: 0,
          vendorName: "",
          contactNo: "",
          emailId: ""
        }
      },
      error: (err: any) => {
        console.error("API Error:", err);
      }
    })
  }

  edit(vendorId: number) {
    this.http.get('https://api.freeprojectapi.com/api/BusBooking/GetBusVendorsById?id=' + vendorId).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.reportObj = res;
        this.isEditMode = true; // change button text
      },
      error: (err: any) => {
        console.error("API Error:", err);
      }
    })
  }

  delete(vendorId: number) {
    if (confirm("Delete this vendor?")) {
      this.http.delete('https://api.freeprojectapi.com/api/BusBooking/DeleteBusVendor?id=' + vendorId).subscribe({
        next: (res: any) => {
          // console.log(res);
          // alert("Report deleted successfully!");
          this.getReports();
        },
        error: (err: any) => {
          console.error("API Error:", err);
        }
      });
    }
  }
}

