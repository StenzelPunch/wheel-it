import React from "react";
import { SVG, PathArray } from "@svgdotjs/svg.js";
import { gsap } from "gsap";
import classNames from 'classnames';
import "./Wheel.scss";

const pi = Math.PI;
const sin = Math.sin;
const cos = Math.cos;
const svg = SVG();

class Wheel extends React.Component {
    constructor(props) {
        super(props);
        this.node = null;
        this.w = getWidth();
        this.h = this.w;
        this.r = this.w / 2;
        this.c = { x: this.w / 2, y: this.h / 2 };

        this.currAngle = 0
        this.spin = this.spin.bind(this);

        this.state = {
            btnDisable: false,
        }
        
    }

    render() {
        const btnClass = classNames({
            'wheel-btn': true,
            'wheel-btn__disable': this.state.btnDisable
        })

        return (
            <div className="wheel">
                <div className="wheel-arrow">
                    <div
                        className="wheel-svg"
                        id="wheel-svg"
                        ref={ref => {
                            this.node = ref;
                            this.draw();
                        }}
                    ></div>
                </div>
                <button onClick={this.spin} className={btnClass} disabled={this.state.btnDisable}>
                    roll
                </button>
            </div>
        );
    }

    componentDidMount() {
        svg.addTo(this.node) //mount node
            .size(this.w, this.h)
            .viewbox((this.w / 2) * -1, (this.h / 2) * -1, this.w, this.h);
    }

    spin() {
        const spinCount = 6;
        const spinAngle = 360 * spinCount + getRandDeg() + this.currAngle;

        this.currAngle = spinAngle % 360;

        this.disableButton();

        gsap.to(svg.node, {
            rotation: spinAngle,
            ease: "power2.inOut",
            duration: 10,
            onComplete: () => {
                gsap.to(svg.node, { rotation: this.currAngle, ease: "linear", duration: 0 });
                this.disableButton();
            }
        });
    }

    draw() {
        const segments = this.props.segments;
        const deg = 360 / segments.length; //segment "width"
        const r = this.r;
        const to = r * 0.9; //text offset

        segments.forEach((segment, i) => {
            const sx = r * cos(deg2rad(deg * i - 90)); //segment start x
            const sy = r * sin(deg2rad(deg * i - 90)); //segment start y
            const ex = r * cos(deg2rad(deg * (i + 1) - 90)); //segment end x
            const ey = r * sin(deg2rad(deg * (i + 1) - 90)); //segment end y
            const tx = to * cos(deg2rad(deg * (i + 0.5) - 90)); //text start x
            const ty = to * sin(deg2rad(deg * (i + 0.5) - 90)); //text start y

            const path = [
                ["M", 0, 0], //move to center
                ["L", sx, sy], //line from center to start point
                ["A", r, r, 0, 0, 1, ex, ey], //arc from start to end point
                ["L", 0, 0] //line from end point to center
            ];

            const textRatio = segment.label.length < 10 ? 7 : segment.label.length;

            svg.path(new PathArray(path)).fill(segment.color);

            svg.text(segment.label)
                .leading(0.3)
                .font({ size: this.w / (textRatio + 10) })
                .fill("#000")
                .path(`M ${tx} ${ty} L 0 0`);

            window.onresize = () => {
                this.resize();
            };
        });
    }

    disableButton() {
        this.setState({
            btnDisable: !this.state.btnDisable
        })
    }

    resize() {
        this.w = getWidth();
        this.h = this.w;
        svg.size(this.h, this.w);
    }
}

function deg2rad(deg) {
    return (deg * pi) / 180;
}

function getWidth() {
    const width = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
    return width * 0.93
}

function getRandDeg() {
    return Math.round(-0.5 + Math.random() * (360 + 1));
}


export default Wheel;
