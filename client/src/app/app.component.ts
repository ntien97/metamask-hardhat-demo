import { Component } from '@angular/core';
import { Web3Provider } from './providers/web3-provider';
import { from, switchMap, tap } from 'rxjs';
import {
  firstAccount,
  formatBigNumber,
} from './utils/common-operators.functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  signer = this.provider.getSigner();

  accounts$ = from(this.provider.listAccounts()).pipe(firstAccount());

  balance$ = this.accounts$.pipe(
    switchMap((accountNumber) => from(this.provider.getBalance(accountNumber))),
    formatBigNumber()
  );

  constructor(private readonly provider: Web3Provider) {}
}
