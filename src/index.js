import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Header, ScrollLink, ScrollTrack, smoothScrollBy } from './Components/index.js';
import './globals.scss';
import style from './styles.scss';
import anime from 'animejs';
import { debounce, skip, side } from './helpers';

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
    this.debounce = debounce.bind(this);
    this.skip = skip.bind(this);
    this.side = side.bind(this);
  }
  onTransitionEnter(e) {
    console.log(this.mainRef.current);
    anime({
      targets: `.${style.main__item}`,
      translateX: ['100vw', '0vw'],
      scale: [{ value: 0.5 }, { value: 1, duration: 1000, delay: 200 }],
      delay: (_, index) => index * 300,
      duration: 400
    });
  }
  componentDidMount() {
    let deltas = [];
    ['wheel', 'mousewheel', 'touchmove', 'keydown'].map(event => {
      window.addEventListener(
        event,
        this.side(
          this.debounce(e => {
            let max = Math.max(...deltas.map(Math.abs));
            let extr = deltas.find(delta => Math.abs(delta) === max);
            if (extr > 0) smoothScrollBy(0, window.innerHeight);
            else smoothScrollBy(0, -window.innerHeight);
            deltas = [];
          }, 200),
          (data, e) => {
            deltas.push(e.deltaY);
            e.preventDefault();
          }
        ),
        false
      );
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
      targets: `.${style.main__text2}`,
      translateX: ['-1000px', '0px'],
      duration: 1000,
      begin: _ => {
        requestAnimationFrame(() => {
          document.querySelector(`.${style.main__text2}`).classList.remove(`${style.show}`);
        });
        setTimeout(() => {
          document.querySelector(`.${style.main__text2}`).classList.add(`${style.show}`);
        }, 100);
      }
    });
    anime({
      targets: `.${style.main__img2}`,
      translateX: ['1000px', '0px'],
      rotate: [0, 720],
      scale: [{ value: 0.5 }, { value: 1, duration: 1000, delay: 200 }],
      delay: 300,
      duration: 2000
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <ScrollTrack
          onLeave={() => {
            console.log('LEAVE');
            this.headerRef.current.classList.toggle('g-detach');
          }}
          onScroll={this.skip(
            this.debounce((_, state) => {
              const downThreshold = -200;
              const upThreshold = 100;
              const newScroll = document.body.scrollTop;
              let diff;
              if (newScroll <= 0) return;
              diff = this.oldScroll - newScroll;
              if (diff === 0) return;
              if (diff >= upThreshold) anime({ targets: this.headerRef.current, opacity: 1 });
              else if (diff != 0 && diff <= downThreshold) this.headerRef.current.style.opacity = 0;
              this.oldScroll = newScroll;
            }, 50),
            2
          )}>
          <Header refs={this.headerRef} />
        </ScrollTrack>
        <div className={`${style.carousel}`}>
          <div className={`${style.sentance}`}>Sentance of the day</div>
        </div>
        <ScrollLink duration={200} to="#test2" className={`btn btn-primary`}>
          LINK
        </ScrollLink>
        <ScrollTrack refs={this.mainRef} onEnter={this.onTransitionEnter} />
        <div id="test" ref={this.mainRef} className={`${style.main}`}>
          <div ref={this.divRef} className={`${style.main__item}`}>
            ITEM
          </div>
          <div className={`${style.main__item}`}>ITEM</div>
          <div className={`${style.main__item}`}>ITEM</div>
        </div>
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
          <div id="test2" className={`${style.main} ${style.carousel2}`}>
            <div className={`${style.main__text2}`}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis tenetur tempora harum minima reprehenderit
              deserunt odit? Alias, numquam omnis ipsum possimus, dolorum recusandae ea aut excepturi ducimus architecto
              cupiditate voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis tenetur tempora harum
              minima reprehenderit deserunt odit? Alias, numquam omnis ipsum possimus, dolorum recusandae ea aut excepturi ducimus
              architecto cupiditate voluptatum.
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
