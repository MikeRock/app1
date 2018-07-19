import React, { Component, Fragment } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';

export const IN = '_scrollEnterViewport';
export const OUT = '_scrollLeftViewport';
export const M_ONEOFF = '_modeOneOff';
export const M_REPEAT = '_modeRepeat';

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
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    onScrolling: PropTypes.func
  };
  isOneOff() {
    return (
      (typeof this.props.mode == 'function' && this.this.props.mode() === M_ONEOFF) ||
      (typeof this.props.mode === 'string' && this.props.mode === M_ONEOFF)
    );
  }
  onScrollOrResize(e) {
    this.props.onScrolling && this.props.onScrolling(e);
    let { current: ref } = this.ref;
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
    }
  }
  componentDidMount() {
    setTimeout(this.onScrollOrResize, 100);
    document.addEventListener('scroll', this.onScrollOrResize);
    window.addEventListener('resize', this.onScrollOrResize);
  }
  render() {
    return <div ref={this.ref}>{this.props.children}</div>;
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
    let scroll = document.querySelector(this.props.to).getBoundingClientRect().top - document.documentElement.clientTop;
    let acc = 0;
    anime({
      targets: this.obj,
      scrollBy: scroll,
      duration: this.props.duration,
      update: anim => {
        if (acc == Math.floor(anim.progress)) return;
        window.scrollBy(0, (scroll / 100) * (Math.floor(anim.progress) - acc));
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
