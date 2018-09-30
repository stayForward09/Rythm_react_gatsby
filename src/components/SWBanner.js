import React, { PureComponent } from 'react';

import './SWBanner.css';

const windowGlobal = typeof window !== 'undefined' && window;

export class SWBanner extends PureComponent {
  constructor() {
    super();

    this.state = {
      show: false,
    };

    if (windowGlobal['navigator'] && 'serviceWorker' in windowGlobal['navigator']) {
      this.activate();
    }

    this.showUpdateBar = this.showUpdateBar.bind(this);
    this.reload = this.reload.bind(this);
  }

  activate() {
    windowGlobal.navigator.serviceWorker.ready.then(reg => {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;

        newWorker.addEventListener('statechange', () => {
          switch (newWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // new update available
                this.showUpdateBar();
              }

              // No update available
              break;

            default:
              break;
          }
        });
      });
    });
  }

  reload() {
    windowGlobal.location.reload();
  }

  showUpdateBar() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div className={`SWBanner ${this.state.show ? ' show' : ''}`}>
        {this.state.show && (
          <div className="container">
            A new version of RhythmicExcellence is available. Click{' '}
            <span className="click-here" onClick={this.reload}>
              here
            </span>{' '}
            to update.
          </div>
        )}
      </div>
    );
  }
}
