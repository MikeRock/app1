import React, { Component, Fragment } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const IN = '_scrollEnterViewport';
const OUT = '_scrollLeftViewport';
const M_ONEOFF = '_modeOneOff';
const M_REPEAT = '_modeRepeat';

export const ScrollMode = { REPEAT: M_REPEAT, ONCE: M_ONEOFF };
export const ScrollState = { IN, OUT };
export class ScrollTrack extends Component {
  constructor(...args) {
    super(...args);
    this.ref = React.createRef();
    this.onScrollOrResize = this.onScrollOrResize.bind(this);
    this.isOneOff = this.isOneOff.bind(this);
    this.inView = false;
    this.outOfView = false;
    this.viewState = OUT;
    this.fired = false;
    this.initState = false;
  }
  static defaultProps = {
    mode: M_REPEAT,
    offset: 0,
    onEnter: _ => {},
    onLeave: _ => {}
  };
  static propTypes = {
    mode: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    offset: PropTypes.number,
    refs: PropTypes.object,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    onScroll: PropTypes.func
  };
  isOneOff() {
    let { mode } = this.props;
    return (typeof mode == 'function' && mode() === M_ONEOFF) || (typeof mode === 'string' && mode === M_ONEOFF);
  }
  onScrollOrResize(e) {
    this.props.onScroll && this.props.onScroll(e, this.viewState);
    let ref = this.props.refs ? this.props.refs.current : ReactDOM.findDOMNode(this.ref.current); //eslint-disable-line react/no-find-dom-node
    let targetTop = ref.getBoundingClientRect().top;
    let targetBottom = ref.getBoundingClientRect().bottom;
    if ((targetTop <= 0 && targetBottom <= 0) || targetTop > window.innerHeight - this.props.offset) {
      this.inView = !(this.outOfView = true);
    } else {
      this.inView = !(this.outOfView = false);
    }
    if (this.viewState == OUT && this.inView) {
      if ((this.isOneOff() && !this.fired) || !this.isOneOff()) this.props.onEnter(e);
      this.viewState = IN;
      this.fired = true;
    } else if (this.viewState == IN && this.outOfView) {
      this.props.onLeave(e);
      this.viewState = OUT;
    } else if (!this.initState) {
      this.initState = true;
      this.inView && this.props.onEnter && this.props.onEnter();
      this.outOfView && this.props.onLeave && this.props.onLeave();
    }
  }
  componentDidMount() {
    setTimeout(this.onScrollOrResize, 100);
    document.addEventListener('scroll', this.onScrollOrResize);
    window.addEventListener('resize', this.onScrollOrResize);
  }
  render() {
    return (
      <Fragment>
        {this.props.children &&
          React.Children.toArray(this.props.children).map((child, idx) => {
            if (child && idx == 0 && !this.props.refs) {
              return React.cloneElement(child, { ref: this.ref });
            } else return child;
          })}
      </Fragment>
    );
  }
}

export class ScrollLink extends Component {
  constructor(...args) {
    super(...args);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.obj = { scrollBy: 0 };
  }
  static defaultProps = {
    duration: 200,
    smooth: 'false',
    offset: 0
  };
  static propTypes = {
    duration: PropTypes.number,
    offset: PropTypes.number,
    smooth: PropTypes.string,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onFinish: PropTypes.func,
    onProgress: PropTypes.func
  };

  onClickHandler(e) {
    let scroll =
      this.props.to == '#' ? -document.body.scrollTop : document.querySelector(this.props.to).getBoundingClientRect().top;
    let acc = 0;
    anime({
      targets: this.obj,
      scrollBy: [0, 100],
      duration: this.props.duration,
      update: anim => {
        if (acc == Math.floor(anim.progress)) return;
        window.scrollBy(0, (scroll / 100) * (Math.floor(anim.progress + 0.3) - acc));
        acc = Math.floor(anim.progress);
        this.props.onProgress && this.props.onProgress(anim.progress);
      },
      complete: _ => {
        this.obj.scrollBy = 0;
        acc = 0;
        this.props.onFinish && this.props.onFinish();
      }
    });
    this.props.onClick && this.props.onClick(e);
  }
  render() {
    return (
      <Fragment>
        <a onClick={this.onClickHandler} {...this.props}>
          {this.props.children}
        </a>
      </Fragment>
    );
  }
}

export const smoothScrollTo = (to, duration = 400) => {
  let obj = { val: 0 };
  let scroll = to == '#' ? -document.body.scrollTop : document.querySelector(to).getBoundingClientRect().top;
  let acc = 0;
  anime({
    targets: obj,
    val: [0, 100],
    duration,
    update: anim => {
      console.log(anim.progress);
      if (acc == Math.floor(anim.progress)) return;
      window.scrollBy(0, (scroll / 100) * (Math.floor(anim.progress + 0.3) - acc));
      acc = Math.floor(anim.progress);
    },
    complete: _ => {
      obj.scrollBy = 0;
      acc = 0;
    }
  });
};

export const smoothScrollBy = (x, y, duration = 500) => {
  let acc = { x: 0, y: 0 };
  let obj = { x: 0, y: 0 };
  anime({
    targets: obj,
    y,
    x,
    duration: duration,
    easing: 'linear',
    elasticity: 0,
    update: anim => {
<<<<<<< HEAD
      if (acc == Math.floor(anim.progress)) return;
      window.scrollBy((x / 100) * (Math.floor(anim.progress + 0.3) - acc), (y / 100) * (Math.floor(anim.progress) - acc));
      acc = Math.floor(anim.progress);
=======
      window.scrollBy(Math.ceil(obj.x) - acc.x, Math.ceil(obj.y) - acc.y);
      acc.x = Math.ceil(obj.x);
      acc.y = Math.ceil(obj.y);
>>>>>>> 02413f202cbfbb8edfc479fb5720e0bcfb8c01fc
    },
    complete: _ => {
      obj.x = acc.x = obj.y = acc.y0 = 0;
    }
  });
};
// 1 - 0   1
// 8 - 1   7
// 15  8   7
