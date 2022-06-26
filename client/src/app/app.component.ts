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
  public readonly accounts$ = from(this.provider.listAccounts()).pipe(
    firstAccount()
  );
  public readonly balance$ = this.accounts$.pipe(
    switchMap((accountNumber) => from(this.provider.getBalance(accountNumber))),
    formatBigNumber()
  );
  // private readonly signer = this.provider.getSigner();

  public readonly contract = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
  public readonly contractBalance$ = from(
    this.provider.getBalance(this.contract)
  );

  constructor(private readonly provider: Web3Provider) {}
}
