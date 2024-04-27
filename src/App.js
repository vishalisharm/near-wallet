import React from 'react';
import NewsComponent from './main_apps';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import '@near-wallet-selector/modal-ui/styles.css';

class App extends React.Component {
  state = { selector: null, modal: null };

  async componentDidMount() {
    const selector = await setupWalletSelector({
      network: "testnet",
      modules: [
        setupNearWallet(),
        setupMyNearWallet(),
        setupMeteorWallet(),
        setupSender()
      ],
    });

    const modal = setupModal(selector, {
      contractId: "test.testnet",
    });

    this.setState({ selector, modal });
  }

  handleConnect = () => {
    const { modal } = this.state;
    modal.show();
  }

  handleLogout = async () => {
    const { selector } = this.state;
    if (selector) {
      const wallet = await selector.wallet(); // Retrieves the active wallet
      if (wallet) {
        await wallet.signOut(); // Signs out from the active wallet
        alert('Logged out successfully');
      }
    }
  }

  toggleNewsComponent = () => {
    this.setState(prevState => ({
      showNewsComponent: !prevState.showNewsComponent
    }));
  }


  render() {
    return (
      <div>
        <h1>NEAR Wallet Selector Demo</h1>
        <button onClick={this.handleConnect}>Connect Wallet</button>
        <button onClick={this.handleLogout}>Logout</button>
        <button onClick={this.toggleNewsComponent}>
          {this.state.showNewsComponent ? "Hide News" : "Show News"}
        </button>
        {this.state.showNewsComponent && <NewsComponent />}
      </div>
    );
  }
}

export default App;
