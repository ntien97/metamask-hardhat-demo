import { Component } from '@angular/core';
import { BehaviorSubject, from, switchMap } from 'rxjs';
import { Web3Provider } from '../../../providers/web3-provider';
import { ethers } from 'ethers';
import { greetingAbi } from './contracts.common';
import { formatBigNumber } from '../../../utils/common-operators.functions';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent {
  public readonly contractAddress =
    '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  private readonly contract = new ethers.Contract(
    this.contractAddress,
    greetingAbi,
    this.provider.getSigner()
  );

  private readonly changesSubject = new BehaviorSubject('');
  private readonly changes$ = this.changesSubject.asObservable();

  public readonly contractGreeting$ = this.changes$.pipe(
    switchMap(() => from(this.contract.functions['greet']()))
  );
  public readonly contractBalance$ = this.changes$.pipe(
    switchMap(() => from(this.provider.getBalance(this.contractAddress))),
    formatBigNumber()
  );

  constructor(private readonly provider: Web3Provider) {}

  async onGreetingSubmit(value: string, element: HTMLInputElement) {
    const setGreeting = await this.contract.functions['setGreeting'](value);
    await setGreeting.wait();

    this.changesSubject.next('onGreetingSubmit');
    element.value = '';
  }

  async onDepositSubmit(ether: string, element: HTMLInputElement) {
    const value = ethers.utils.parseEther(ether);

    const deposit = await this.contract.functions['deposit']({ value });
    await deposit.wait();

    this.changesSubject.next('onDepositSubmit');
    element.value = '';
  }
}
