import React from "react";
import { SVG, PathArray } from "@svgdotjs/svg.js";
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
    }

    componentDidMount() {
        svg.addTo(this.node) //mount node
            .size(this.w, this.h)
            .viewbox((this.w / 2) * -1, (this.h / 2) * -1, this.w, this.h);
    }

    resize() {
        this.w = getWidth();
        this.h = this.w;
        svg.size(this.h, this.w);
    }

    render() {
        return (
            <div className="wheel">
                <div className="wheel-arrow"></div>
                <div
                    className="wheel-svg"
                    ref={ref => {
                        this.node = ref;
                        this.draw(this.node);
                    }}
                ></div>
                <button className="wheel-btn">roll</button>
            </div>
        );
    }

    draw(e) {
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
}

function deg2rad(deg) {
    return (deg * pi) / 180;
}

function getWidth() {
    return window.innerWidth > window.innerHeight ? window.innerHeight * 0.93 : window.innerWidth * 0.93;
}
export default Wheel;
