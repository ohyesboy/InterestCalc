export class MonthlyPayment {
  principal: number;
  interest:number;
  index:number;
  additional: number;
  restPrincipal: number;
}

export class EqualPricipalInterestPayments {
  payments:MonthlyPayment[] = [];
  cyclePayments: number = 0;
  totalPrincipal: number = 0;
  totalInterest:number = 0;
}

