import React from "react";
import "../style.scss";

class BoardSoccer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
        };
        this.width = 650
        this.height = 750
    }

    componentDidMount() {
        this.fillCanvas();
    }

    fillCanvas() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext('2d');
        const offsetX = canvas.offsetLeft;
        const offsetY = canvas.offsetTop;
        ctx.fillStyle = "#474799";
        ctx.fillRect(0, 0, this.width, this.height);
        const r = 5;
        const rowsNumber = 12
        const colsNumber = 10
        const heightDiff = (canvas.height - 100) / rowsNumber
        const widthDiff = (canvas.width - 100) / colsNumber
        for (let i = 0; i <= rowsNumber; i++) {
            for (let j = 0; j <= colsNumber; j++) {
                const cy = 50 + i * heightDiff;
                const cx = 50 + j * widthDiff;
                ctx.beginPath()
                ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);
                ctx.closePath()
                ctx.stroke();
                if (i === 6 && j === 5) {
                    ctx.fillStyle = "#FFFFFF";
                } else {
                    ctx.fillStyle = "#b0a8a8";
                }
                ctx.fill();
                canvas.addEventListener("click", (e) => {
                    handleEvent(e, cx, cy, i, j)
                });
            }
        }

        ctx.strokeStyle = "#d6cfcf";
        ctx.lineWidth = 3;
        ctx.beginPath()
        ctx.moveTo(50 + widthDiff, 50 + heightDiff)
        ctx.lineTo(50 + 4 * widthDiff, 50 + heightDiff)
        ctx.lineTo(50 + 4 * widthDiff, 50)
        ctx.lineTo(50 + 6 * widthDiff, 50)
        ctx.lineTo(50 + 6 * widthDiff, 50 + heightDiff)
        ctx.lineTo(50 + 9 * widthDiff, 50 + heightDiff)
        ctx.lineTo(50 + 9 * widthDiff, 50 + 11 * heightDiff)
        ctx.lineTo(50 + 6 * widthDiff, 50 + 11 * heightDiff)
        ctx.lineTo(50 + 6 * widthDiff, 50 + 12 * heightDiff)
        ctx.lineTo(50 + 4 * widthDiff, 50 + 12 * heightDiff)
        ctx.lineTo(50 + 4 * widthDiff, 50 + 11 * heightDiff)
        ctx.lineTo(50 + widthDiff, 50 + 11 * heightDiff)
        ctx.lineTo(50 + widthDiff, 50 + heightDiff)
        ctx.closePath()
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(50 + 5 * widthDiff, 50 + 6 * heightDiff)

        let previousRowIndex = 6
        let previousColIndex = 5

        function handleEvent(e, cx, cy, rowIndex, colIndex) {
            const evt = e ? e : window.event;
            const clickX = evt.clientX - offsetX;
            const clickY = evt.clientY - offsetY;
            const dx = cx - clickX;
            const dy = cy - clickY;
            if (dx * dx + dy * dy <= r * r) {
                const absDiffRows = Math.abs(rowIndex - previousRowIndex)
                const absDiffCols = Math.abs(colIndex - previousColIndex)
                if (absDiffRows <= 1 && absDiffCols <= 1 && absDiffRows + absDiffCols !== 0) {
                    // alert(`you are inside the circle: ${rowIndex}, ${colIndex}`);
                    ctx.lineTo(cx, cy);
                    ctx.stroke();
                    previousRowIndex = rowIndex
                    previousColIndex = colIndex
                    this.props.chooseField(rowIndex, colIndex)
                }
            }
            return false;
        }
    }

    render() {
        return (
            <canvas ref="canvas" width={this.width} height={this.height}/>
        );
    }
}

export default BoardSoccer;
