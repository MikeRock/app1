import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Header, ScrollLink, ScrollTrack, M_ONEOFF } from './Components/index.js';
import './globals.scss';
import style from './styles.scss';
import anime from 'animejs';
import debounce from './helpers/debounce';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.divRef = React.createRef();
    this.mainRef = React.createRef();
    this.onTransitionEnter = this.onTransitionEnter.bind(this);
    this.onTransitionEnter2 = this.onTransitionEnter2.bind(this);
    this.onTransitionEnter3 = this.onTransitionEnter3.bind(this);
    this.headerRef = React.createRef();
    this.oldScroll = 0;
    this.debouncer = debounce.bind(this);
  }
  onTransitionEnter(e) {
    anime({
      targets: `.${style.main__item}`,
      translateX: ['100vw', '0vw'],
      scale: [{ value: 0.5 }, { value: 1, duration: 1000, delay: 200 }],
      delay: (_, index) => index * 300,
      duration: 400
    });
  }
  onTransitionEnter2(e) {
    anime({
      targets: `.${style.main__img}`,
      translateX: ['-1000px', '0px'],
      rotate: 720,
      scale: [{ value: 0.5 }, { value: 1, duration: 1000, delay: 200 }],
      delay: 300,
      duration: 2000
    });
    anime({
      targets: `.${style.main__text}`,
      opacity: [0, 1],
      delay: 500,
      duration: 6000
    });
  }
  onTransitionEnter3(e) {
    anime({
      targets: `.${style.main__img2}`,
      translateX: ['1000px', '0px'],
      rotate: [0, 720],
      scale: [{ value: 0.5 }, { value: 1, duration: 1000, delay: 200 }],
      delay: 300,
      duration: 2000
    });
    anime({
      targets: `.${style.main__text2}`,
      opacity: [0, 1],
      delay: 500,
      duration: 6000
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <ScrollTrack
          onLeave={() => {
            this.headerRef.current.classList.toggle('g-detach');
          }}
          onScrolling={this.debouncer(_ => {
            console.log('Test');
            let threshold = -50;
            let newScroll = document.body.scrollTop;
            if (newScroll < 0) return;
            let diff = this.oldScroll - newScroll;
            console.log(diff);
            if (diff > 0) anime({ targets: this.headerRef.current, opacity: 1 });
            else if (diff != 0 && diff < threshold) this.headerRef.current.style.opacity = 0;
            this.oldScroll = newScroll;
          }, 50)}>
          <Header refs={this.headerRef} />
        </ScrollTrack>
        <div className={`${style.carousel}`}>
          <div className={`${style.sentance}`}>Sentance of the day</div>
        </div>
        <ScrollTrack onEnter={this.onTransitionEnter}>
          <div id="test" ref={this.mainRef} className={`${style.main}`}>
            <div ref={this.divRef} className={`${style.main__item}`}>
              ITEM
            </div>
            <div className={`${style.main__item}`}>ITEM</div>
            <div className={`${style.main__item}`}>ITEM</div>
          </div>
        </ScrollTrack>
        <ScrollTrack onEnter={this.onTransitionEnter2}>
          <div className={`${style.main} ${style.carousel}`}>
            <div className={`${style.main__img}`}>
              <div className={`${style.main__shape}`} />
            </div>
            <div className={`${style.main__text}`}>
              <span className="h2">L</span> orem ipsum dolor sit amet, consectetur adipisicing elit. Officiis tenetur tempora
              harum minima reprehenderit deserunt odit? Alias, numquam omnis ipsum possimus, dolorum recusandae ea aut excepturi
              ducimus architecto cupiditate voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis tenetur
              tempora harum minima reprehenderit deserunt odit? Alias, numquam omnis ipsum possimus, dolorum recusandae ea aut
              excepturi ducimus architecto cupiditate voluptatum.
            </div>
          </div>
        </ScrollTrack>
        <ScrollTrack onEnter={this.onTransitionEnter3}>
          <div className={`${style.main} ${style.carousel2}`}>
            <div className={`${style.main__text2}`}>
              <span className="h2">L</span> orem ipsum dolor sit amet, consectetur adipisicing elit. Officiis tenetur tempora
              harum minima reprehenderit deserunt odit? Alias, numquam omnis ipsum possimus, dolorum recusandae ea aut excepturi
              ducimus architecto cupiditate voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis tenetur
              tempora harum minima reprehenderit deserunt odit? Alias, numquam omnis ipsum possimus, dolorum recusandae ea aut
              excepturi ducimus architecto cupiditate voluptatum.
            </div>
            <div className={`${style.main__img2}`}>
              <div className={`${style.main__shape2}`} />
            </div>
          </div>
        </ScrollTrack>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
