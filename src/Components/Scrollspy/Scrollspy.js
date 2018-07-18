import React, { Component } from "react";
import anime from "animejs";
import PropTypes from "prop-types";

const IN = "_in";
const OUT = "_out";

export const trackScroll = Target =>
  class _ extends Component {
    constructor(...args) {
      super(...args);
      this.ref = React.createRef();
      this.onScrollOrResize = this.onScrollOrResize.bind(this);
      this.inView = false;
      this.outOfView = false;
      this.viewState = OUT;
    }
    static defaultProps = {
      offset: 0,
      onEnter: _ => {},
      onLeave: _ => {}
    };
    static propTypes = {
      offset: PropTypes.number,
      onEnter: PropTypes.func,
      onLeave: PropTypes.func
    };

    onScrollOrResize(e) {
      let { current: ref } = this.ref;
      let targetTop = ref.getBoundingClientRect().top;
      let targetBottom = ref.getBoundingClientRect().bottom;
      if ((targetTop <= 0 && targetBottom <= 0) || targetTop + this.props.offset > window.innerHeight) {
        this.inView = !(this.outOfView = true);
      } else {
        this.inView = !(this.outOfView = false);
      }
      if (this.viewState == OUT && this.inView) {
        this.props.onEnter(e);
        this.viewState == IN;
      } else if (this.viewState == IN && this.outOfView) {
        this.props.onLeave(e);
        this.viewState == OUT;
      }
    }
    componentDidMount() {
      this.onScrollOrResize();
      document.addEventListener("scroll", this.onScrollOrResize);
      window.addEventListener("resize", this.onScrollOrResize);
    }
    render() {
      return (
        <div ref={this.ref}>
          <Target {...this.props} />
        </div>
      );
    }
  };

export const smoothScroll = to => Target =>
  class _ extends Component {
    constructor(...args) {
      super(...args);
      this.onClick - this.onClick.bind(this);
      this.obj = { scrollBy: 0 };
    }
    static defaultProps = {
      duration: 1000,
      offset: 0,
      onFinish: _ => {},
      onProgress: _ => {}
    };
    static propTypes = {
      duration: PropTypes.number,
      offset: PropTypes.number,
      onFinish: PropTypes.func,
      onProgress: PropTypes.func
    };

    onClick(e) {
      let scroll = document.querySelector(to.replace("#", "")).getBoundingClientRect().top;
      let acc = 0;
      if (window.pageYOffset > 0)
        anime({
          targets: this.obj,
          scrollBy: scroll,
          delay: this.props.duration,
          update(anim) {
            if (window.pageYOffset > 0) window.scrollBy(0, (-scroll / 100) * (anim.progress - acc));
            acc = anim.progress;
            this.props.onProgress(anim.progress);
          },
          complete() {
            this.obj.scrollBy = 0;
            acc = 0;
            this.props.onFinish();
          }
        });
    }
    render() {
      return (
        <div onClick={this.onClick}>
          <Target {...this.props} />
        </div>
      );
    }
  };
