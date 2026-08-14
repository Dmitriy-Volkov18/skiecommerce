import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../_services/account-service';
import { IAddress } from '../../_models/address';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextInput } from '../../components/text-input/text-input';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TextInput
  ],
  templateUrl: './checkout-address.html',
  styleUrl: './checkout-address.css',
})
export class CheckoutAddress {
  @Input() checkoutForm!: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm?.get('addressForm')?.value).subscribe((address:IAddress) => {
      this.toastr.success('Address saved');
      this.checkoutForm.get("addressForm")?.reset(address);
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    })
  }
}
