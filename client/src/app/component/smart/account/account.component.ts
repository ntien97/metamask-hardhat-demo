import { Component } from '@angular/core';
import { from, switchMap } from 'rxjs';
import {
  firstAccount,
  formatBigNumber,
} from '../../../utils/common-operators.functions';
import { Web3Provider } from '../../../providers/web3-provider';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  public readonly accounts$ = from(this.provider.listAccounts()).pipe(
    firstAccount()
  );
  public readonly balance$ = this.accounts$.pipe(
    switchMap((accountNumber) => from(this.provider.getBalance(accountNumber))),
    formatBigNumber()
  );

  constructor(private readonly provider: Web3Provider) {}
}
