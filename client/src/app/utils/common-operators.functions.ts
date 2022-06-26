import { map, Observable } from 'rxjs';
import { BigNumber, ethers } from 'ethers';

export const firstAccount =
  () =>
  (accountList$: Observable<string[]>): Observable<string> =>
    accountList$.pipe(
      map((accounts) => (accounts.length > 0 ? accounts[0] : ''))
    );

export const formatBigNumber = () => (bigNumber$: Observable<BigNumber>) =>
  bigNumber$.pipe(map((bigNumber) => ethers.utils.formatEther(bigNumber)));
