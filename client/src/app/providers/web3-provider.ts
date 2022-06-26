import { Inject, Injectable, InjectionToken } from '@angular/core';
import { providers } from 'ethers';

export const WEB3PROVIDER = new InjectionToken('Web3 Provider', {
  providedIn: 'root',
  factory: () => (window as any).ethereum,
});

@Injectable({ providedIn: 'root' })
export class Web3Provider extends providers.Web3Provider {
  constructor(@Inject(WEB3PROVIDER) web3Provider: any) {
    super(web3Provider);
  }
}

export function enableWeb3Provider(provider: providers.Web3Provider) {
  return async () => {
    await provider.send('eth_requestAccounts', []);
  };
}
