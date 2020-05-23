import { Component, OnInit } from '@angular/core';
import { MonthlyPayment, EqualPricipalInterestPayments } from '../monthly-payment';

@Component({
  selector: 'app-equal-principal-interest',
  templateUrl: './equal-principal-interest.component.html',
  styleUrls: ['./equal-principal-interest.component.scss']
})
export class EqualPrincipalInterestComponent implements OnInit {
  totalBorrowed: number = 510000;
  apr: number = 3.125;
  months: number = 360;
  additionalPrincipal: number = 0;
  result:EqualPricipalInterestPayments;
  useAdditionalFromTable: boolean;
  constructor() { }

  ngOnInit(): void {

  }

  calculate() {
    var additionalEachMonth = Array.from({length: this.months}, (value, key) => this.additionalPrincipal);

    if(this.useAdditionalFromTable && this.result){
      additionalEachMonth = Array.from({length: this.months}, (value, key) => this.result.payments[key].additional);

    }
    this.result = this.calculateInternal(

      this.totalBorrowed, this.apr / 100 / 12, this.months,
      additionalEachMonth);
  }

  calculateInternal(totalBorrowed: number, cycleInterest: number, cycles: number, additionalPrincipal: number[]): EqualPricipalInterestPayments {
    var payments = new EqualPricipalInterestPayments();

    payments.cyclePayments = totalBorrowed * cycleInterest * Math.pow(1.0 + cycleInterest, cycles) / (Math.pow(1.0 + cycleInterest, cycles) - 1.0);
    var rest = totalBorrowed;
    for (let index = 0; index < cycles; index++) {
      var pay = new MonthlyPayment();
      pay.index = index;
      pay.interest = rest*cycleInterest;

      if(additionalPrincipal && additionalPrincipal.length>index)
        pay.additional = additionalPrincipal[index];
      else
        pay.additional =0;

      //normall you pay full principal
      pay.principal = payments.cyclePayments - pay.interest;

      //unless rest < princiap, then pay rest
      if(rest<pay.principal){
        pay.principal = rest;
        pay.additional = 0;
      }
      else if(rest< pay.additional){
        //> princiap , < additional, pay rest with part of additional
        pay.additional = rest - pay.principal;
      }
      else if(rest< pay.principal + pay.additional){
        pay.additional = pay.principal + pay.additional - rest;
      }



      payments.payments.push(pay);

      rest-=pay.principal + pay.additional;
      pay.restPrincipal = rest;
      payments.totalInterest += pay.interest;
      payments.totalPrincipal += pay.principal + pay.additional;



    }

    return payments;
  }


}
