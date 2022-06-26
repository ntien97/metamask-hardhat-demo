import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { enableWeb3Provider, WEB3PROVIDER } from './providers/web3-provider';
import { HeaderComponent } from './component/dumb/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './component/smart/account/account.component';
import { ContractsComponent } from './component/smart/contracts/contracts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    ContractsComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: enableWeb3Provider,
      deps: [WEB3PROVIDER],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
