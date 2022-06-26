import { Component } from '@angular/core';
import { from } from 'rxjs';
import { Web3Provider } from '../../../providers/web3-provider';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent {
  public readonly contract = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
  public readonly contractBalance$ = from(
    this.provider.getBalance(this.contract)
  );

  constructor(private readonly provider: Web3Provider) {}
}
