import { Component } from '@angular/core';
import { from } from 'rxjs';
import { Web3Provider } from '../../../providers/web3-provider';
import { ethers } from 'ethers';
import { greetingAbi } from './contracts.common';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent {
  public readonly contractAddress =
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
  public readonly contractBalance$ = from(
    this.provider.getBalance(this.contractAddress)
  );
  private readonly contract = new ethers.Contract(
    this.contractAddress,
    greetingAbi,
    this.provider.getSigner()
  );
  public readonly contractGreeting$ = from(this.contract.functions['greet']());

  constructor(private readonly provider: Web3Provider) {}

  async onGreetingSubmit(value: string) {
    const setGreeting = await this.contract.functions['setGreeting'](value);
    await setGreeting.wait();
  }

  async onDepositSubmit(ether: string) {
    const value = ethers.utils.parseEther(ether);

    await this.contract.functions['deposit']({ value });
  }
}
